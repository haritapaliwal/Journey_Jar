const SavedTrip = require('../models/SavedTrip');
const Destination = require('../models/Destination');
const logger = require('../utils/logger');

// @desc    Save a trip
// @route   POST /api/saved-trips
// @access  Private
const saveTrip = async (req, res) => {
  try {
    const { destinationId, preferences } = req.body;

    // Get destination details
    const destination = await Destination.findOne({ destinationId });
    
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    // Check if already saved
    const existingTrip = await SavedTrip.findOne({
      userId: req.user._id,
      destinationId
    });

    if (existingTrip) {
      return res.status(400).json({ message: 'Trip already saved' });
    }

    const savedTrip = await SavedTrip.create({
      userId: req.user._id,
      destinationId: destination.destinationId,
      destinationName: destination.name,
      preferences,
      summary: destination.summary,
      itinerary: destination.itinerary,
      costLevel: destination.costLevel,
      imageUrl: destination.imageUrl
    });

    logger.info('Trip saved', { userId: req.user._id, tripId: savedTrip._id });

    res.status(201).json({
      success: true,
      data: savedTrip
    });

  } catch (error) {
    logger.error('Error saving trip', error);
    res.status(500).json({ message: 'Error saving trip' });
  }
};

// @desc    Get all saved trips for user
// @route   GET /api/saved-trips
// @access  Private
const getSavedTrips = async (req, res) => {
  try {
    const savedTrips = await SavedTrip.find({ userId: req.user._id })
      .sort({ savedAt: -1 });

    res.json({
      success: true,
      count: savedTrips.length,
      data: savedTrips
    });

  } catch (error) {
    logger.error('Error fetching saved trips', error);
    res.status(500).json({ message: 'Error fetching saved trips' });
  }
};

// @desc    Delete a saved trip
// @route   DELETE /api/saved-trips/:id
// @access  Private
const deleteSavedTrip = async (req, res) => {
  try {
    const savedTrip = await SavedTrip.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!savedTrip) {
      return res.status(404).json({ message: 'Saved trip not found' });
    }

    await savedTrip.deleteOne();

    logger.info('Trip deleted', { userId: req.user._id, tripId: req.params.id });

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting trip', error);
    res.status(500).json({ message: 'Error deleting trip' });
  }
};

module.exports = { saveTrip, getSavedTrips, deleteSavedTrip };
