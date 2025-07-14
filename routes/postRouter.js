const postRouter = require('express').Router();
const { redirectHomePage, getPostPage, postPostForm, getSinglePostPage, deleteSinglePost } = require('../controllers/postController');

/* 
*   @method GET
*   @route  /posts 
*   @desc   Redirect to home page and display users post
*/
postRouter.get('/', redirectHomePage);

/* 
*   @method GET
*   @route  /posts/new 
*   @desc   Get new post page/form
*/
postRouter.get('/new', getPostPage);

/* 
*   @method GET
*   @route  /posts/:id
*   @desc   Get user post page
*/
postRouter.get('/:id', getSinglePostPage);


/* 
*   @method POST
*   @route  /posts/new 
*   @desc   Create a new post
*/
postRouter.post('/new', postPostForm);

/* 
*   @method DELETE
*   @route  /posts/:id?_method=DELETE 
*   @desc   Delete a post
*/
postRouter.post('/:id', deleteSinglePost);

module.exports = postRouter;