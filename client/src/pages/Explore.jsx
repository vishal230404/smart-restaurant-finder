import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';

const Explore = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/all-restaurants')
      .then((res) => {
        setRestaurants(res.data);
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch all restaurants:', err);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFiltered(
      restaurants.filter((rest) =>
        rest.name.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🍽 Explore All Restaurants</h1>
      <input
        type="text"
        className="w-full p-2 mb-6 border rounded"
        placeholder="Search by restaurant name..."
        value={search}
        onChange={handleSearch}
      />

      {filtered.length > 0 ? (
        filtered.map((restaurant, idx) => (
          <RestaurantCard key={idx} restaurant={restaurant} />
        ))
      ) : (
        <p className="text-center text-gray-600">No restaurants found.</p>
      )}
    </div>
  );
};

export default Explore;
