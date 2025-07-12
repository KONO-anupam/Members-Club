const postRouter = require('express').Router();
const { redirectHomePage, getPostPage, postPostForm } = require('../controllers/postController');

/* 
*   @method GET
*   @route  /posts 
*   @desc   Redirect to home page and display users post
*/
postRouter.get('/', redirectHomePage);

/* 
*   @method GET
*   @route  /posts/new 
*   @desc   Create a new post
*/
postRouter.get('/new', getPostPage);

/* 
*   @method POST
*   @route  /posts/new 
*   @desc   Create a new post
*/
postRouter.post('/new', postPostForm);

module.exports = postRouter;