const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { nanoid } = require('nanoid');
const { validationResult } = require('express-validator')
const { validateUserSignup, validateUserLogin } = require('../utils/validation');
const checkEmailExists = require('../middlewares/CheckEmailExistsMiddleware');
const isGuest = require('../middlewares/isGuestMiddleware');

const getSignupPage = [
  isGuest,
  (req, res, next) => {
    res.render('index', {
      windowTitle: 'Sign Up | Members Club',
      documentTitle: 'Sign Up',
      content: {
        location: '/signup',
        data: '',
        validationError: []
      }
    });
  }
]

const postSignupForm = [
  checkEmailExists,  /* Check if email is already exist or user already exist using the email [middleware] */
  validateUserSignup, /* Then validate and sanitate the input [middleware] */
  async (req, res, next) => {
    try {
      // console.log(req.emailUsed);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('index', {
          windowTitle: 'Sign Up | Members Club',
          documentTitle: 'Sign Up',
          content: {
            location: '/signup',
            data: {},
            validationError: errors.array()
          }
        });
      }
      const user = { firstName, lastName, username, email, password, confirmPassword } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = {
        id: nanoid(),
        role_id: 4, /* 1 = superadmin, 2 = admin, 3 = member, 4 = guest */
        ...user,
        hashedPassword,
        deactivated: false
      };
      await User.create(newUser);
      res.redirect('/')
    } catch (error) {
      next(error);
    }
  }
];

const getLoginPage = [
  isGuest,
  (req, res, next) => {
    res.render('index', {
      windowTitle: 'Login | Members Club',
      documentTitle: 'Login',
      content: {
        location: '/login',
        data: {},
        validationError: []
      }
    });
  }
];

const postLoginForm = [
  validateUserLogin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('index', {
        windowTitle: 'Login | Members Club',
        documentTitle: 'Login',
        content: {
          location: '/login',
          data: {},
          validationError: errors.array()
        }
      })
    }
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
];

const getLogoutCurrentUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = {
  getSignupPage,
  postSignupForm,
  getLoginPage,
  postLoginForm,
  getLogoutCurrentUser
};