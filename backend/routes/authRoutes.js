const express = require('express');
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateAuth } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);
router.get('/me', protect, getMe);

module.exports = router;
