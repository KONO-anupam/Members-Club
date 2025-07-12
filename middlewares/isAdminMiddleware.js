const isAdminMiddleware = async (req, res, next) => {
  if (req.isUnauthenticated()) return res.redirect('/');
  const { role_id } = await req.user;
  if ([1, 2].includes(role_id)) return next();
  return res.redirect('/');
};

module.exports = isAdminMiddleware;