const userRouter = require('express').Router();
const { getAllUsers, getUserById, createUser, updateUserById, updateUserPassword, deleteUserById } = require('../controllers/userControllers');

/* 
*   @method GET
*   @route  /users 
*   @desc   Get all users
*/

/* 
*   @method GET
*   @route  /users/:id 
*   @desc   Get user by ID
*/

/* 
*   @method POST
*   @route  /users/create 
*   @desc   Create a new user
*/

/* 
*   @method POST
*   @route  /users/:id/update 
*   @desc   Update user by ID
*/

/* 
*   @method DELETE
*   @route  /users/:id/delete 
*   @desc   Get user by ID
*/

module.exports = userRouter;