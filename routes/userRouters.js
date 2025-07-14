const userRouter = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUserById, updateUserPassword, deleteUserById } = require('../controllers/userController');

/* 
*   @method GET
*   @route  /users 
*   @desc   Get all users
*/
userRouter.get('/', getAllUsers);

/* TODO    |
          ||
          V
*/

/* 
*   @method PUT
*   @route  /users/:id/update-role 
*   @desc   Update user role by ID
*/

/* 
*   @method DELETE
*   @route  /users/:id/delete 
*   @desc   Get user by ID
*/

module.exports = userRouter;