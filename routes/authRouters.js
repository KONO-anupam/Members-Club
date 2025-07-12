const authRouter = require('express').Router();
const { getSignupPage, postSignupForm, getLoginPage, postLoginForm, getLogoutCurrentUser } = require('../controllers/authController');

/* 
*   @method GET
*   @route  /login 
*   @desc   Get login page
*/
authRouter.get('/signup', getSignupPage);

/* 
*   @method POST
*   @route  /login 
*   @desc   Submit a user login request 
*/
authRouter.post('/signup', postSignupForm);

/* 
*   @method GET
*   @route  /login 
*   @desc   Get login page
*/
authRouter.get('/login', getLoginPage);

/* 
*   @method POST
*   @route  /login 
*   @desc   Login a registered user
*/
authRouter.post('/login', postLoginForm);

/* 
*   @method GET
*   @route  /logout 
*   @desc   Simulatating a logout page to end user session
*/
authRouter.get('/logout', getLogoutCurrentUser);

module.exports = authRouter;