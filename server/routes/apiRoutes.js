// routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const { getNearby } = require('../controllers/restaurantController');

router.get('/ping', (_, res) => res.send('pong'));
router.get('/nearby', getNearby);

module.exports = router;
