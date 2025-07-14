const userRouter = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUserById, updateUserPassword, deleteUserById, updateUserRoleById, updateUserStatusById } = require('../controllers/userController');

/* 
*   @method GET
*   @route  /users 
*   @desc   Get all users
*/
userRouter.get('/', getAllUsers);

/* 
*   @method PUT
*   @route  /users/:id/update-role 
*   @desc   Update user role by ID
*/
userRouter.put('/:id/update-role', updateUserRoleById);

/* 
*   @method PUT
*   @route  /users/:id/toggle-active 
*   @desc   Update user status by ID
*/
userRouter.put('/:id/toggle-active', updateUserStatusById);



module.exports = userRouter;