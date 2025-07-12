const User = require('../models/userModel');
const Post = require('../models/postModel');
const isAuthenticated = require('../middlewares/isAuthenticatedMiddleware');
const { validatePostForm } = require('../utils/validation');
const { validationResult } = require('express-validator');
const { nanoid } = require('nanoid');

const getHomePage = async (req, res, next) => {
  try {
    const posts = await Post.findAll();
    res.render('index', {
      windowTitle: "Home | Members Club",
      documentTitle: "Members Club",
      content: {
        location: '/',
        data: {
          posts
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log('hello error');
        return res.render('index', {
          windowTitle: 'New Post | Membership Club',
          documentTitle: 'New Post',
          content: {
            location: '/posts/new',
            data: {},
            validationError: errors.array()
          }
        });
      }
      const post = { title, message } = req.body;
      const { id } = await req.user;
      await Post.create({ id: nanoid(), user_id: id, ...post });
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
  postPostForm
};