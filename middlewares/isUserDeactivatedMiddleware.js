const isUserDeactivated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const { deactivated } = res.locals.currentUser;
    if (res.locals.currentUser && deactivated) return res.status(401).render('index', {
      windowTitle: 'Deactivated | Members Club',
      documentTitle: 'Deactivated',
      content: {
        location: '/deactivated'
      }
    });
  }
  next();
};

module.exports = isUserDeactivated;