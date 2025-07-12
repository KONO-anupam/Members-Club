const User = require('../models/userModel');

const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findByEmail(email);
  if (user) req.emailUsed = true; 
  next();
}

module.exports = checkEmailExists;