// services/distanceService.js
const haversine = require('../utils/haversine');

function findNearbyRestaurants(restaurants, userLat, userLon, count = 5) {
  return restaurants
    .map((rest) => ({
      name: rest.name,
      rating: rest.rating,
      distance: Number(haversine(userLat, userLon, rest.lat, rest.lon).toFixed(2)),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count);
}

module.exports = { findNearbyRestaurants };
