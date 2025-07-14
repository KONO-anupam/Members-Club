const { body } = require('express-validator');

const alphaErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 10 characters.';
const emailFormatErr = 'must be formatted properly';
const passwordErr = {
  minLength: 'must be at least 8 characters long. ',
  minUppercase: 'must be have at least one upper case character. ',
  minNumbers: 'must be have at least one number. ',
  minSymbols: 'must be have at least one special characters. [e.g, !,@,#,$,%] ',
};

const validateUserSignup = [
  body('firstName').trim().escape()
    .isAlpha('en-US', { ignore: ' ' }).withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr} `),
  body('lastName').trim().escape()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body('username').trim().escape()
    .isAlpha().withMessage(`username ${alphaErr}`)
    .isLength({ min: 3, max: 20 }).withMessage(`Last name ${lengthErr}`),
  body('email').trim().escape()
    .isEmail().withMessage(`Email ${emailFormatErr}`),
  body('password').trim().escape()
    .isStrongPassword({ minLength: 8 }).withMessage(`Password ${passwordErr.minLength}`)
    .isStrongPassword({ minUppercase: 1 }).withMessage(`Password ${passwordErr.minUppercase}`)
    .isStrongPassword({ minNumbers: 1 }).withMessage(`Password ${passwordErr.minNumbers}`)
    .isStrongPassword({ minSymbols: 1 }).withMessage(`Password ${passwordErr.minSymbols}`),
  body('confirmPassword').trim().escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
];

const validateUserLogin = [
  body('nameOrEmail').trim().escape()
    .notEmpty().withMessage('Username or Email Field cannot be empty.')
];

const validateMembershipEntrance = [
  body('passcode').trim().escape()
    .notEmpty().withMessage('Passcode cannot be empty.')
];

const validatePostForm = [
  body('title').trim().escape()
    .notEmpty().withMessage('Title cannot be empty.'),
  body('message').trim().escape()
    .notEmpty().withMessage('Message cannot be empty.')
    .isLength({max: 200}).withMessage('Message cannot be more than 200 characters. ')
];
module.exports = {
  validateUserSignup,
  validateUserLogin,
  validateMembershipEntrance,
  validatePostForm
}