const adminRouter = require('express').Router();
const userRouter = require('./userRouters');

adminRouter.use('/users', userRouter);

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
adminRouter.get('/users', userRouter);


module.exports = adminRouter;