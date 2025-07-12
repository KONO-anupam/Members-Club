const { getHomePage } = require('../controllers/postController');
const indexRouter = require('express').Router();

/* 
*   @method GET
*   @route  / 
*   @desc   Get home page and display users post
*/
indexRouter.get('/', getHomePage);

module.exports = indexRouter;