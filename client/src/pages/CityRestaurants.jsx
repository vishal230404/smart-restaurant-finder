import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Loader2, AlertCircle, Star, Clock, Heart } from 'lucide-react';
import { fetchCityRestaurants } from '../api/cities';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantDetailModal from '../components/RestaurantDetailModal';
import headerImage from '../assets/headerImage.jpg'
const CityRestaurantsPage = () => {
  const { cityName, countryName } = useParams();
  const navigate = useNavigate();
  
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadCityRestaurants = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchCityRestaurants(cityName, 50);
      setRestaurants(data);
    } catch (err) {
      console.error('Failed to load restaurants:', err);
      setError('Failed to load restaurants for this city.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRestaurant(null);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (cityName) {
      loadCityRestaurants();
    }
  }, [cityName]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Header */}
      {/* Header Section with Background Image */}
<div className="relative overflow-hidden text-white">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(${headerImage})`,
      height: 'clamp(400px, 50vh, 600px)',
      width: '100%'
    }}
  ></div>
  
  {/* Dark Overlay for better text readability */}
  <div className="absolute inset-0 bg-black/50"></div>
  
  {/* Content Container */}
  <div className="relative h-[clamp(400px,50vh,600px)] flex items-center">
    <div className="max-w-7xl mx-auto px-4 py-8 z-10 w-full">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-lg rounded-xl px-4 py-2 transition-all duration-200"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
          Restaurants in
          <span className="block text-yellow-300">{cityName}</span>
        </h1>
        {countryName && (
          <p className="text-xl text-white drop-shadow-md">
            {countryName}
          </p>
        )}
      </div>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
    <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-2xl"></div>
  </div>
</div>

<div className="max-w-7xl mx-auto px-4 py-8">
  {/* Loading State */}
  {loading && (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <MapPin className="w-10 h-10 text-white animate-pulse" />
            </div>
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin absolute -top-2 -right-2" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Finding Restaurants in {cityName}
            </h3>
            <p className="text-gray-600 text-lg">
              Discovering the best dining spots in the city...
            </p>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  )}
  
  {/* Rest of your content goes here */}
</div>


      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin absolute -top-2 -right-2" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Finding Restaurants in {cityName}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Discovering the best dining spots in the city...
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50/80 backdrop-blur-lg border-l-4 border-red-500 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <AlertCircle className="w-8 h-8 text-red-500 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-1">Error Loading Restaurants</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
              <button
                onClick={loadCityRestaurants}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && restaurants.length > 0 && (
          <div className="animate-in slide-in-from-bottom duration-500">
            {/* Stats Bar */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {restaurants.length} Restaurant{restaurants.length !== 1 ? 's' : ''} Found
                    </h3>
                    <p className="text-gray-600">
                      Top rated restaurants in {cityName}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-800">4.2+</span>
                    </div>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-gray-800">Various</span>
                    </div>
                    <p className="text-sm text-gray-600">Price Range</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center mb-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-gray-800">Local</span>
                    </div>
                    <p className="text-sm text-gray-600">Favorites</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Restaurant Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
              {restaurants.map((restaurant, idx) => (
                <div
                  key={restaurant['Restaurant ID'] || idx}
                  className="transform hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom"
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    userLat={null}
                    userLon={null}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && restaurants.length === 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Restaurants Found</h3>
              <p className="text-gray-600 text-lg mb-8">
                We couldn't find any restaurants in {cityName}. This might be due to limited data coverage.
              </p>
              <button 
                onClick={handleGoBack}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant Detail Modal */}
      {showModal && selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          userLat={null}
          userLon={null}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CityRestaurantsPage;
