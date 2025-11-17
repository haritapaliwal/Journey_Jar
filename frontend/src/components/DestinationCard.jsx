import React from 'react';

const DestinationCard = ({ destination, onSave, showSaveButton = true }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
        <span className="text-white text-6xl">🏖️</span>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
        
        <p className="text-gray-600 mb-4">{destination.summary}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Itinerary:</h4>
          <p className="text-sm text-gray-700">{destination.itinerary}</p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-gray-700">
            Cost Level: <span className="text-primary capitalize">{destination.costLevel}</span>
          </span>
          {typeof destination.score === 'number' && (
            <span className="text-sm text-gray-500">
              Match: {destination.score}%
            </span>
          )}
        </div>
        
        {showSaveButton && onSave && (
          <button
            onClick={() => onSave(destination)}
            className="w-full bg-secondary text-white py-2 rounded hover:bg-green-600 transition-colors"
          >
            💾 Save Trip
          </button>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
