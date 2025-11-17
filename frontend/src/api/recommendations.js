import axios from './axios';

export const getRecommendations = async (preferences) => {
  const response = await axios.post('/recommendations', preferences);
  return response.data;
};
