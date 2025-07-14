const User = require('../models/userModel');

const checkEmailExists = async (req, res, next) => {
  const { email } = req.body;
  console.log(req.body);
  const user = await User.findByEmail(email);
  req.isEmailUsed = user ? true : false;
  return next(); 
}

module.exports = checkEmailExists;