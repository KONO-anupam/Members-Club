async function currentUserMiddleware(req, res, next) {
  res.locals.currentUser = await req.user;
  next();
}

module.exports = currentUserMiddleware;