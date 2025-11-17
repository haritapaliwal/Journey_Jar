const { body, validationResult } = require('express-validator');

const PRIORITY_LEVELS = ['low', 'medium', 'high'];

const validatePreferences = [
  body('season').isIn(['summer', 'winter', 'spring', 'fall']).withMessage('Invalid season'),
  body('mood').isIn(['relax', 'adventure', 'cultural']).withMessage('Invalid mood'),
  body('riskTolerance').isIn(['low', 'medium', 'high']).withMessage('Invalid risk tolerance'),
  body('budgetLevel').isIn(['low', 'medium', 'high']).withMessage('Invalid budget level'),
  body('priorities')
    .isObject()
    .withMessage('Priorities are required')
    .custom((priorities) => {
      const requiredKeys = ['season', 'mood', 'riskTolerance', 'budgetLevel'];
      return requiredKeys.every((key) => PRIORITY_LEVELS.includes(priorities[key]));
    })
    .withMessage('Invalid priority configuration'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateAuth = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validatePreferences, validateAuth };
