const adminRouter = require('express').Router();
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const userRouter = require('./userRouters');

adminRouter.use('/users', isAdminMiddleware, userRouter);

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
adminRouter.get('/users', isAdminMiddleware, userRouter);


module.exports = adminRouter;