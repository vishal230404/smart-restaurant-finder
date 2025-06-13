// controllers/restaurantController.js
const { findNearbyRestaurants } = require('../services/distanceService');

let restaurantData = [];
let isDataLoaded = false;

function setRestaurantData(data) {
  restaurantData = data;
  isDataLoaded = true;
}

function getRestaurantData() {
  return restaurantData;
}

function checkDataLoaded() {
  return isDataLoaded;
}

const getNearby = (req, res) => {
  if (!isDataLoaded) return res.status(503).json({ error: 'Service loading data' });

  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);
  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  console.log(`📍 Received coordinates: LAT=${lat}, LON=${lon}`);

  try {
    const nearest = findNearbyRestaurants(restaurantData, lat, lon);
    res.json(nearest);
  } catch (err) {
    console.error('🚨 Error in /api/nearby:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getNearby,
  setRestaurantData,
  getRestaurantData,      // ✅ added
  isDataLoaded: checkDataLoaded // ✅ renamed for clarity
};
