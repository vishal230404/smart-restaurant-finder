import React, { useEffect, useState } from 'react';
import { fetchNearbyRestaurants } from '../api/nearby';
import { getCurrentLocation } from '../services/location';
import fallbackLocations from '../data/fallbackLocations.json';
import RestaurantCard from '../components/RestaurantCard';
import LocationSelector from '../components/LocationSelector';

const Home = () => {
  const [nearby, setNearby] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [locationDenied, setLocationDenied] = useState(false);

  const fetchRestaurants = async ({ lat, lon }) => {
    try {
      setLoading(true);
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

  useEffect(() => {
    getCurrentLocation()
      .then(fetchRestaurants)
      .catch((geoErr) => {
        console.warn('⚠️ Geolocation blocked:', geoErr);
        setError('Location access denied. Please choose manually.');
        setLocationDenied(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">🍽️ Explore Nearby Restaurants</h1>

      {loading && <p className="text-center text-gray-500">📍 Finding restaurants near you...</p>}

      {!loading && error && (
        <div className="text-center text-red-600 mb-4 font-medium">
          {error}
        </div>
      )}

      {!loading && locationDenied && (
        <LocationSelector
          options={fallbackLocations}
          onSelect={(location) => fetchRestaurants(location)}
        />
      )}

      {!loading && !error && nearby.length > 0 && (
        <div className="grid gap-6 mt-6">
          {nearby.map((restaurant, idx) => (
            <RestaurantCard key={idx} restaurant={restaurant} />
          ))}
        </div>
      )}

      {!loading && !error && nearby.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No restaurants found nearby.</p>
      )}
    </div>
  );
};

export default Home;
