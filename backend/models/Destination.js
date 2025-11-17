const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  destinationId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  itinerary: {
    type: String,
    required: true
  },
  costLevel: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high']
  },
  imageUrl: {
    type: String,
    default: '/images/placeholder.jpg'
  },
  tags: {
    season: [String],
    mood: [String],
    riskTolerance: [String],
    budgetLevel: [String],
    category: String
  }
});

module.exports = mongoose.model('Destination', destinationSchema);
