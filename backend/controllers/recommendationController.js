const { getRecommendations } = require('../services/recommendationEngine');
const logger = require('../utils/logger');

// @desc    Get destination recommendations
// @route   POST /api/recommendations
// @access  Private
const getDestinationRecommendations = async (req, res) => {
  try {
    const { season, mood, riskTolerance, budgetLevel, priorities } = req.body;

    const preferences = {
      season,
      mood,
      riskTolerance,
      budgetLevel,
      priorities
    };

    const recommendations = await getRecommendations(preferences, 10);

    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });

  } catch (error) {
    logger.error('Error getting recommendations', error);
    res.status(500).json({ 
      success: false,
      message: 'Error generating recommendations' 
    });
  }
};

module.exports = { getDestinationRecommendations };
