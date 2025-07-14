const User = require('../models/userModel');
const Post = require('../models/postModel');
const isAuthenticated = require('../middlewares/isAuthenticatedMiddleware');
const { validatePostForm } = require('../utils/validation');
const { validationResult } = require('express-validator');
// const { nanoid } = require('nanoid');
const isAdmin = require('../middlewares/isAdminMiddleware');

const getHomePage = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.render('index', {
      windowTitle: "Home | Members Club",
      documentTitle: "Members Club",
      content: {
        location: '/',
        data: {
          posts: posts.sort((a, b) => b.created_at - a.created_at)
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

const redirectHomePage = (req, res, next) => {
  res.redirect('/');
};

const getPostPage = [
  isAuthenticated,
  (req, res, next) => {
    try {
      res.render('index', {
        windowTitle: 'New Post | Membership Club',
        documentTitle: 'New Post',
        content: {
          location: '/posts/new',
          data: {},
          validationError: []
        }
      });
    } catch (error) {
      next(error);
    }
  }
];

const postPostForm = [
  validatePostForm,
  async (req, res, next) => {
    try {
      const { nanoid } = await import('nanoid');
      const post ={ title, message } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.render('index', {
          windowTitle: 'New Post | Membership Club',
          documentTitle: 'New Post',
          content: {
            location: '/posts/new',
            data: {
              title,
              message,
            },
            validationError: errors.array()
          }
        });
      }
      const { id } = await req.user;
      await Post.create({ id: nanoid(), user_id: id, ...post });
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
];

const getSinglePostPage = [
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);

      if (!post) throw new Error(`Post with an id of "${id}" not found.`);

      res.render('index', {
        windowTitle: `${post.title} | Members Club'`,
        documentTitle: `${post.title}`,
        content: {
          location: '/posts/id',
          data: {
            post
          },
        }
      });
    } catch (error) {
      next(error);
    }
  }
];

const deleteSinglePost = [
  isAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.body;
      await Post.deleteById(id);
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  }
];
module.exports = {
  getHomePage,
  redirectHomePage,
  getPostPage,
  postPostForm,
  getSinglePostPage,
  deleteSinglePost
};