import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../api/recommendations';

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    season: '',
    mood: '',
    riskTolerance: '',
    budgetLevel: '',
    priorities: {
      season: 'medium',
      mood: 'medium',
      riskTolerance: 'medium',
      budgetLevel: 'medium'
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await getRecommendations(preferences);
      navigate('/results', { state: { recommendations: data.data, preferences } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handlePriorityChange = (field, value) => {
    setPreferences((prev) => ({
      ...prev,
      priorities: {
        ...prev.priorities,
        [field]: value
      }
    }));
  };

  const priorityOptions = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Tell us your travel preferences
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Season of Travel
            </label>
            <select
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={preferences.season}
              onChange={(e) => setPreferences({ ...preferences, season: e.target.value })}
            >
              <option value="">Select season</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
              <option value="spring">Spring</option>
              <option value="fall">Fall</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mood of Travelling
            </label>
            <select
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={preferences.mood}
              onChange={(e) => setPreferences({ ...preferences, mood: e.target.value })}
            >
              <option value="">Select mood</option>
              <option value="relax">Relax</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Risk Tolerance
            </label>
            <select
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={preferences.riskTolerance}
              onChange={(e) => setPreferences({ ...preferences, riskTolerance: e.target.value })}
            >
              <option value="">Select risk level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Budget Level
            </label>
            <select
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              value={preferences.budgetLevel}
              onChange={(e) => setPreferences({ ...preferences, budgetLevel: e.target.value })}
            >
              <option value="">Select budget</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="bg-white p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Set Preference Priority</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['season', 'mood', 'riskTolerance', 'budgetLevel'].map((field) => (
                <div key={field}>
                  <label className="block text-gray-700 font-semibold mb-2 capitalize">
                    {field.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <select
                    required
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    value={preferences.priorities[field]}
                    onChange={(e) => handlePriorityChange(field, e.target.value)}
                  >
                    {priorityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Higher priority preferences have a greater impact on your match percentage.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 font-semibold"
          >
            {loading ? 'Finding destinations...' : 'Get Recommendations'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
