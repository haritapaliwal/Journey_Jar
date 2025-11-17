const express = require('express');
const { getDestinationRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middleware/auth');
const { validatePreferences } = require('../middleware/validation');

const router = express.Router();

router.post('/', protect, validatePreferences, getDestinationRecommendations);

module.exports = router;
