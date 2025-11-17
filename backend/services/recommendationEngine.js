const Destination = require('../models/Destination');
const logger = require('../utils/logger');

const RULES = [
  {
    id: 'rule_1',
    conditions: {
      season: ['summer', 'spring'],
      mood: ['relax'],
      riskTolerance: ['low'],
      budgetLevel: ['high']
    },
    category: 'luxury_beach',
    weight: 10
  },
  {
    id: 'rule_2',
    conditions: {
      season: ['summer', 'fall'],
      mood: ['adventure'],
      riskTolerance: ['high'],
      budgetLevel: ['medium']
    },
    category: 'trekking',
    weight: 10
  },
  {
    id: 'rule_3',
    conditions: {
      season: ['spring', 'fall'],
      mood: ['cultural'],
      riskTolerance: ['medium'],
      budgetLevel: ['low']
    },
    category: 'budget_city',
    weight: 10
  },
  {
    id: 'rule_4',
    conditions: {
      season: ['winter'],
      mood: ['relax'],
      riskTolerance: ['low'],
      budgetLevel: ['high']
    },
    category: 'cozy',
    weight: 10
  },
  {
    id: 'rule_5',
    conditions: {
      season: ['winter'],
      mood: ['adventure'],
      riskTolerance: ['high'],
      budgetLevel: ['medium']
    },
    category: 'extreme',
    weight: 10
  },
  {
    id: 'rule_6',
    conditions: {
      season: ['winter'],
      mood: ['cultural'],
      riskTolerance: ['medium'],
      budgetLevel: ['low']
    },
    category: 'local_culture',
    weight: 10
  }
];

const PRIORITY_VALUES = {
  high: 3,
  medium: 2,
  low: 1
};

const DEFAULT_PRIORITIES = {
  season: 'medium',
  mood: 'medium',
  riskTolerance: 'medium',
  budgetLevel: 'medium'
};

const RULE_BONUS = 5;

const buildPriorityWeights = (priorities = {}) => {
  const merged = { ...DEFAULT_PRIORITIES, ...priorities };
  const rawWeights = {};
  let total = 0;

  Object.entries(merged).forEach(([key, value]) => {
    const normalizedValue = PRIORITY_VALUES[value] || PRIORITY_VALUES.medium;
    rawWeights[key] = normalizedValue;
    total += normalizedValue;
  });

  if (total === 0) {
    return {
      season: 0.25,
      mood: 0.25,
      riskTolerance: 0.25,
      budgetLevel: 0.25
    };
  }

  return Object.keys(rawWeights).reduce((weights, key) => {
    weights[key] = rawWeights[key] / total;
    return weights;
  }, {});
};

const calculateScore = (destination, preferences, priorityWeights) => {
  let score = 0;
  const { season, mood, riskTolerance, budgetLevel } = preferences;
  const tags = destination.tags;

  if (tags.season && tags.season.includes(season)) {
    score += (priorityWeights.season || 0) * 100;
  }

  if (tags.mood && tags.mood.includes(mood)) {
    score += (priorityWeights.mood || 0) * 100;
  }

  if (tags.riskTolerance && tags.riskTolerance.includes(riskTolerance)) {
    score += (priorityWeights.riskTolerance || 0) * 100;
  }

  if (tags.budgetLevel && tags.budgetLevel.includes(budgetLevel)) {
    score += (priorityWeights.budgetLevel || 0) * 100;
  }

  for (const rule of RULES) {
    const conditionsMet = 
      rule.conditions.season.includes(season) &&
      rule.conditions.mood.includes(mood) &&
      rule.conditions.riskTolerance.includes(riskTolerance) &&
      rule.conditions.budgetLevel.includes(budgetLevel);

    if (conditionsMet && tags.category === rule.category) {
      score += RULE_BONUS;
    }
  }

  return Math.min(100, Math.round(score));
};

const DEFAULT_TOP_N = 10;

const getRecommendations = async (preferences, topN = DEFAULT_TOP_N) => {
  try {
    logger.info('Getting recommendations', { preferences });

    const destinations = await Destination.find();

    if (destinations.length === 0) {
      logger.warn('No destinations found in database');
      return [];
    }

    const priorityWeights = buildPriorityWeights(preferences.priorities);

    const scoredDestinations = destinations.map(dest => ({
      destination: dest,
      score: calculateScore(dest, preferences, priorityWeights)
    }));

    scoredDestinations.sort((a, b) => b.score - a.score);

    const recommendations = scoredDestinations
      .slice(0, topN)
      .map(item => ({
        destinationId: item.destination.destinationId,
        name: item.destination.name,
        summary: item.destination.summary,
        itinerary: item.destination.itinerary,
        costLevel: item.destination.costLevel,
        imageUrl: item.destination.imageUrl,
        score: item.score
      }));

    logger.info(`Returning ${recommendations.length} recommendations`);
    return recommendations;

  } catch (error) {
    logger.error('Error in recommendation engine', error);
    throw error;
  }
};

module.exports = { getRecommendations };
