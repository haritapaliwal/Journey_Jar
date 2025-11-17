import React, { useState, useEffect } from 'react';
import { getSavedTrips, deleteSavedTrip } from '../api/savedTrips';
import DestinationCard from '../components/DestinationCard';

const SavedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const data = await getSavedTrips();
      setTrips(data.data);
    } catch (err) {
      setMessage('Failed to load saved trips');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSavedTrip(id);
      setTrips(trips.filter(trip => trip._id !== id));
      setMessage('Trip deleted successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to delete trip');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">My Saved Trips</h2>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
            {message}
          </div>
        )}
        
        {trips.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl mb-4">No saved trips yet</p>
            <a href="/preferences" className="text-primary hover:underline">
              Find your perfect destination
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div key={trip._id} className="relative">
                <DestinationCard
                  destination={{
                    destinationId: trip.destinationId,
                    name: trip.destinationName,
                    summary: trip.summary,
                    itinerary: trip.itinerary,
                    costLevel: trip.costLevel,
                    imageUrl: trip.imageUrl
                  }}
                  showSaveButton={false}
                />
                <button
                  onClick={() => handleDelete(trip._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTrips;
