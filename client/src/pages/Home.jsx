import React, { useEffect, useState } from 'react';
import { MapPin, Navigation, Loader2, AlertCircle, Search, Heart, Clock, Star, ChevronDown } from 'lucide-react';
import { fetchNearbyRestaurants } from '../api/nearby';
import { getCurrentLocation } from '../services/location';
import RestaurantCard from '../components/RestaurantCard';
import RestaurantDetailModal from '../components/RestaurantDetailModal';
import { fetchCountries, fetchCitiesByCountry, fetchCityRestaurants } from '../api/cities';

const Home = () => {
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationDenied, setLocationDenied] = useState(false);
  const [userLat, setUserLat] = useState(null);
  const [userLon, setUserLon] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // States for popular cities
  const [countries, setCountries] = useState([]);
  const [popularCities, setPopularCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingPopularCities, setLoadingPopularCities] = useState(false);
  const [loadingCityRestaurants, setLoadingCityRestaurants] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState('India');

  const fetchRestaurants = async ({ lat, lon }) => {
    try {
      setLoading(true);
      setUserLat(lat);
      setUserLon(lon);
      const data = await fetchNearbyRestaurants(lat, lon);
      setNearby(data);
      setError('');
    } catch (err) {
      console.error('❌ API error:', err);
      setError('Failed to fetch nearby restaurants.');
    } finally {
      setLoading(false);
    }
  };

  // Load countries when location is denied
  const loadCountries = async () => {
    try {
      setLoadingCountries(true);
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    } catch (err) {
      console.error('❌ Failed to load countries:', err);
      setError('Failed to load countries.');
    } finally {
      setLoadingCountries(false);
    }
  };

  // Load popular cities for selected country
  const loadPopularCities = async (countryName = defaultCountry) => {
    try {
      setLoadingPopularCities(true);
      const citiesData = await fetchCitiesByCountry(countryName);
      
      // Format cities for popular cities display
      const formattedCities = citiesData.slice(0, 12).map(city => ({
        name: city,
        country: countryName,
        flag: getCountryFlag(countryName)
      }));
      
      setPopularCities(formattedCities);
    } catch (err) {
      console.error('❌ Failed to load popular cities:', err);
      setPopularCities([]);
    } finally {
      setLoadingPopularCities(false);
    }
  };

  // Get country flag emoji
  const getCountryFlag = (countryName) => {
    const flagMap = {
      'India': '🇮🇳',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'UAE': '🇦🇪',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'Brazil': '🇧🇷',
    };
    return flagMap[countryName] || '🌍';
  };

  // Handle country selection for popular cities
  const handlePopularCountryChange = async (countryName) => {
    setDefaultCountry(countryName);
    setSelectedCountry(countryName);
    await loadPopularCities(countryName);
  };

  // Handle popular city selection and fetch restaurants
  const handlePopularCityClick = async (cityName, countryName) => {
    try {
      setSelectedCountry(countryName);
      setSelectedCity(cityName);
      setLoadingCityRestaurants(true);
      setLoading(true);
      
      const restaurantsData = await fetchCityRestaurants(cityName, 20);
      setNearby(restaurantsData);
      setError('');
    } catch (err) {
      console.error('❌ Failed to load city restaurants:', err);
      setError('Failed to load restaurants for selected city.');
      setNearby([]);
    } finally {
      setLoadingCityRestaurants(false);
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

  useEffect(() => {
    getCurrentLocation()
      .then(fetchRestaurants)
      .catch((geoErr) => {
        console.warn('⚠️ Geolocation blocked:', geoErr);
        setError('Location access denied. Please choose manually.');
        setLocationDenied(true);
        setLoading(false);
        // Load countries and popular cities when location is denied
        loadCountries();
        loadPopularCities();
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full mb-6">
              <MapPin className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Restaurants
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Find the perfect dining experience right around the corner with our intelligent location-based recommendations
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-300/20 rounded-full blur-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Loading State */}
        {loading && !locationDenied && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Navigation className="w-10 h-10 text-white animate-pulse" />
                  </div>
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin absolute -top-2 -right-2" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Finding Amazing Restaurants</h3>
                  <p className="text-gray-600 text-lg">Discovering the best dining spots near you...</p>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && !locationDenied && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50/80 backdrop-blur-lg border-l-4 border-red-500 p-6 rounded-2xl shadow-lg animate-in slide-in-from-top duration-300">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-1">Location Access Needed</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Popular Cities Section - Only Section When Location Denied */}
        {locationDenied && (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  Popular locations in
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getCountryFlag(defaultCountry)}</span>
                  <select
                    value={defaultCountry}
                    onChange={(e) => handlePopularCountryChange(e.target.value)}
                    className="text-2xl font-bold text-orange-500 bg-transparent border-none outline-none cursor-pointer hover:text-orange-600 transition-colors"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                From swanky upscale restaurants to the cosiest hidden gems serving the most incredible food, 
                we cover it all. Explore menus, and millions of restaurant photos and reviews from users 
                just like you, to find your next great meal.
              </p>
            </div>

            {/* Loading state for popular cities */}
            {loadingPopularCities ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin mr-3" />
                <span className="text-gray-700 font-medium">Loading popular cities...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {popularCities.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularCityClick(city.name, city.country)}
                    className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-orange-300 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                          {city.name} Restaurants
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{city.country}</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transform group-hover:rotate-[-90deg] transition-all duration-200" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Loading indicator for city restaurants */}
            {loadingCityRestaurants && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin mr-3" />
                <span className="text-gray-700 font-medium">Loading restaurants...</span>
              </div>
            )}
          </div>
        )}

        {/* Results Section */}
        {!loading && !error && nearby.length > 0 && (
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
                      Found {nearby.length} Restaurant{nearby.length !== 1 ? 's' : ''}
                    </h3>
                    <p className="text-gray-600">
                      {selectedCity ? `In ${selectedCity}, ${selectedCountry}` : 'Within your area'}
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
                      <span className="font-semibold text-gray-800">15-30</span>
                    </div>
                    <p className="text-sm text-gray-600">Min Away</p>
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
              {nearby.map((restaurant, idx) => (
                <div
                  key={idx}
                  className="transform hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom"
                  style={{animationDelay: `${idx * 0.1}s`}}
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    userLat={userLat}
                    userLon={userLon}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Love what you see?</h3>
                <p className="text-blue-100 mb-6">Discover even more amazing restaurants with our advanced search</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200">
                  Explore More Restaurants
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && nearby.length === 0 && selectedCity && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Restaurants Found</h3>
              <p className="text-gray-600 text-lg mb-8">
                We couldn't find any restaurants in {selectedCity}, {selectedCountry}. Try selecting a different city.
              </p>
              <button 
                onClick={() => {
                  setSelectedCity('');
                  setNearby([]);
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                Choose Different City
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant Detail Modal */}
      {showModal && selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          userLat={userLat}
          userLon={userLon}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
