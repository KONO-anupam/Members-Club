const membershipRouter = require('express').Router();
const { getMembershipPage, postMembershipForm } = require('../controllers/membershipController');
/* 
*   @method GET
*   @route  /membership
*   @desc   Get membership page
*/
membershipRouter.get('/', getMembershipPage);

/* 
*   @method POST
*   @route  /membership
*   @desc   Submit a membership form
*/
membershipRouter.post('/', postMembershipForm);


module.exports = membershipRouter;