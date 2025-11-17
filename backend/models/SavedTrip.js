const mongoose = require('mongoose');

const savedTripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinationId: {
    type: String,
    required: true
  },
  destinationName: {
    type: String,
    required: true
  },
  preferences: {
    season: {
      type: String,
      required: true,
      enum: ['summer', 'winter', 'spring', 'fall']
    },
    mood: {
      type: String,
      required: true,
      enum: ['relax', 'adventure', 'cultural']
    },
    riskTolerance: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high']
    },
    budgetLevel: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high']
    }
  },
  summary: String,
  itinerary: String,
  costLevel: String,
  imageUrl: String,
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
savedTripSchema.index({ userId: 1, savedAt: -1 });

module.exports = mongoose.model('SavedTrip', savedTripSchema);
