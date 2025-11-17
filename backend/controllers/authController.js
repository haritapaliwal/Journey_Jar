const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const logger = require('../utils/logger');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({ email, password, name });

    if (user) {
      logger.info('User registered', { userId: user._id });
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    logger.error('Registration error', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.comparePassword(password))) {
      logger.info('User logged in', { userId: user._id });
      res.json({
        _id: user._id,
        email: user.email,
        name: user.name,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    logger.error('Login error', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name
  });
};

module.exports = { register, login, getMe }