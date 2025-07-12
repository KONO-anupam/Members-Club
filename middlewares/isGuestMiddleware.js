const isGuest = (req, res, next) => {
  if (req.isUnauthenticated()) return next();
  res.redirect('/');
};

module.exports = isGuest;