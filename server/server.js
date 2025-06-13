// server.js
const app = require('./app');
const { loadCSV } = require('./services/dataService');
const { setRestaurantData } = require('./controllers/restaurantController');

const PORT = 5000;

loadCSV()
  .then((data) => {
    setRestaurantData(data);
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
      console.log(`📊 Loaded ${data.length} restaurants`);
    });
  })
  .catch((err) => {
    console.error('❌ CSV loading error:', err);
  });
