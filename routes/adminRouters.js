const adminRouter = require('express').Router();
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const userRouter = require('./userRouters');
const isUserDeactivated = require('../middlewares/isUserDeactivatedMiddleware');

adminRouter.use('/users', isUserDeactivated, isAdminMiddleware, userRouter);

/* 
*   @method GET
*   @route  /admin 
*   @desc   Get admin page
*/

/* 
*   @method GET
*   @route  /admin/users 
*   @desc   Get users page
*/
adminRouter.get('/users', isUserDeactivated, isAdminMiddleware, userRouter);


module.exports = adminRouter;