const express = require('express');
const router = express.Router();
const { getRestaurantData, isDataLoaded } = require('../controllers/restaurantController');

router.get('/all-restaurants', (req, res) => {
  if (!isDataLoaded()) {
    return res.status(503).json({ error: 'Data is still loading. Please try again later.' });
  }

  res.json(getRestaurantData());
});

module.exports = router;
