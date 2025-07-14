const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const User = require('../models/userModel');


const getAllUsers = [
  isAdminMiddleware,
  async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.render('index', {
      windowTitle: 'Manage User | Members Club',
      documentTitle: 'Manage User',
      content: {
        location: '/admin/users',
        data: {
          users
        }
      }
    });
    // res.send(users);
  } catch (error) {
    next(error);
  }
}
]

const getUserById = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
}

const createUser = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
}

const updateUserById = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
}

const updateUserPassword = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
}

const deleteUserById = async (req, res, next) => {
  try {

  } catch (error) {
    next(error);
  }
}


module.exports = { getAllUsers, getUserById, createUser, updateUserById, updateUserPassword, deleteUserById };