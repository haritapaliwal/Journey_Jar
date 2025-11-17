import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DestinationCard from '../components/DestinationCard';
import { saveTrip } from '../api/savedTrips';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recommendations, preferences } = location.state || { recommendations: [], preferences: {} };
  const [message, setMessage] = useState('');

  const handleSave = async (destination) => {
    try {
      await saveTrip(destination.destinationId, preferences);
      setMessage(`${destination.name} saved successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save trip');
    }
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No recommendations found</h2>
          <button
            onClick={() => navigate('/preferences')}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Your Personalized Recommendations
        </h2>
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center">
            {message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {recommendations.map((destination) => (
            <DestinationCard
              key={destination.destinationId}
              destination={destination}
              onSave={handleSave}
            />
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/preferences')}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 mr-4"
          >
            New Search
          </button>
          <button
            onClick={() => navigate('/saved-trips')}
            className="bg-secondary text-white px-6 py-2 rounded hover:bg-green-600"
          >
            View Saved Trips
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
