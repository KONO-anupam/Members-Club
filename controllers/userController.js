const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const User = require('../models/userModel');


const getAllUsers = async (req, res, next) => {
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
};

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

const updateUserRoleById = [
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role_id } = req.body;
      // console.log(req.body);
      await User.updateRoleById(id, role_id);
      res.redirect('/admin/users');
    } catch (error) {
      next(error);
    }
  }
];

const updateUserStatusById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeactivated  = JSON.parse(req.body.isDeactivated);
    isDeactivated ?  await User.deactivateById(id) : await User.activateById(id);
    res.redirect('/admin/users');
  } catch (error) {
    next(error);
  }
};

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


module.exports = {
  getAllUsers,
  getUserById,
  updateUserRoleById,
  updateUserStatusById,
  createUser,
  updateUserById,
  updateUserPassword,
  deleteUserById
};