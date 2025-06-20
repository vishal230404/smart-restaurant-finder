import React, { useState } from 'react';
import { Search, MapPin, Star, Utensils, ChefHat, TrendingUp, Sparkles, Navigation } from 'lucide-react';
import { getRecommendations } from '../api/analyzer';

function Explore() {
  const [restaurantName, setRestaurantName] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const data = await getRecommendations(restaurantName);
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      } else {
        setError(data.error || 'No recommendations found');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 4.5) return 'text-green-600 bg-green-100';
    if (numRating >= 4.0) return 'text-blue-600 bg-blue-100';
    if (numRating >= 3.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getStarRating = (rating) => {
    const numRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'text-yellow-400 fill-current'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">
          {numRating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mb-6">
            <ChefHat className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Discover Amazing Restaurants
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Find the perfect dining experience with AI-powered recommendations tailored to your taste
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="space-y-6">
            <div className="relative">
              <label className="block text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-500" />
                What restaurant are you looking for?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  placeholder="Enter restaurant name or cuisine type..."
                  className="w-full p-6 pl-14 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-gray-700 placeholder-gray-400 bg-white/70 backdrop-blur-sm text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                />
                <Utensils className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="group relative px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 text-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Finding Recommendations...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    Get Recommendations
                    <Navigation className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-2xl mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">!</span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="animate-in slide-in-from-bottom duration-500">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-8 h-8 text-orange-500" />
                <h3 className="text-3xl font-bold text-gray-800">
                  Top Recommendations for You
                </h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100"
                  >
                    {/* Restaurant Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {rec.name}
                        </h4>
                        <div className="mt-2">
                          {getStarRating(rec.rate)}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRatingColor(rec.rate)}`}>
                        {rec.rate}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm line-clamp-2">{rec.location}</span>
                    </div>

                    {/* Cuisines */}
                    <div className="flex items-start gap-2 mb-4">
                      <Utensils className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {rec.cuisines?.split(',').slice(0, 3).map((cuisine, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium"
                          >
                            {cuisine.trim()}
                          </span>
                        ))}
                        {rec.cuisines?.split(',').length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                            +{rec.cuisines.split(',').length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 group-hover:from-orange-600 group-hover:to-red-700">
                      View Details
                    </button>
                  </div>
                ))}
              </div>

              {/* Results Summary */}
              <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-gray-800">Recommendation Summary</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Found {recommendations.length} excellent restaurant{recommendations.length !== 1 ? 's' : ''} matching your search. 
                  These recommendations are curated based on ratings, reviews, and popularity to give you the best dining experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by intelligent recommendation algorithms • Discover your next favorite restaurant
          </p>
        </div>
      </div>
    </div>
  );
}

export default Explore;