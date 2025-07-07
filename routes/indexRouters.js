const indexRouter = require('express').Router();

indexRouter.get('/', (req, res) => {
  res.send('meow');
});


module.exports = indexRouter;