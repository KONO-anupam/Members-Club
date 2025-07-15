const { validationResult } = require('express-validator');
const User = require('../models/userModel');
const { validateMembershipEntrance } = require('../utils/validation');
const isAuthenticated = require('../middlewares/isAuthenticatedMiddleware');
const isUserDeactivated = require('../middlewares/isUserDeactivatedMiddleware');
require('dotenv').config();


const getMembershipPage = [
  isAuthenticated,
  isUserDeactivated,
  (req, res) => {
    return res.render('index', {
      windowTitle: 'Membership | Members Club',
      documentTitle: 'Membership',
      content: {
        location: '/membership',
        data: {},
        validationError: []
      }
    });
  }
];
const postMembershipForm = [
  validateMembershipEntrance,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('index', {
        windowTitle: 'Membership | Members Club',
        documentTitle: 'Membership',
        content: {
          location: '/membership',
          data: {},
          validationError: errors.array()
        }
      });
    }
    const { passcode } = req.body;
    if (passcode !== process.env.PASSCODE) {
      return res.status(401).render('index', {
        windowTitle: 'Membership | Members Club',
        documentTitle: 'Membership',
        content: {
          location: '/membership',
          data: {},
        },
        error_msg: 'Incorrect passcode'
      });
    }
    const updatedUser = await req.user;
    updatedUser.role_id = 3;
    const { id, role_id } = updatedUser;
    await User.updateRoleById(id, role_id);
    res.status(200).redirect('/');
  }
]

module.exports = {
  getMembershipPage,
  postMembershipForm
};