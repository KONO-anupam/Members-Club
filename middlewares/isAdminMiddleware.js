const isAdminMiddleware = async (req, res, next) => {
  if (req.isUnauthenticated()) return res.redirect('/');
  const { admin } = await req.user;
  if (admin) return next();
  return res.redirect('/');
};

module.exports = isAdminMiddleware;