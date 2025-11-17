import axios from './axios';

export const saveTrip = async (destinationId, preferences) => {
  const response = await axios.post('/saved-trips', { destinationId, preferences });
  return response.data;
};

export const getSavedTrips = async () => {
  const response = await axios.get('/saved-trips');
  return response.data;
};

export const deleteSavedTrip = async (id) => {
  const response = await axios.delete(`/saved-trips/${id}`);
  return response.data;
};
