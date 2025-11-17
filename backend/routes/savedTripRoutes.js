const express = require('express');
const { saveTrip, getSavedTrips, deleteSavedTrip } = require('../controllers/savedTripController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getSavedTrips)
  .post(protect, saveTrip);

router.delete('/:id', protect, deleteSavedTrip);

module.exports = router;
