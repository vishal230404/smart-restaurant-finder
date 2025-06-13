// services/dataService.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function loadCSV() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '../data/zomato_locations.csv'))
      .pipe(csv())
      .on('data', (row) => {
        const lat = parseFloat(row.lat);
        const lon = parseFloat(row.lon);
        const rating = parseFloat(row.avg_rating);

        if (row.Name && !isNaN(lat) && !isNaN(lon) && !isNaN(rating)) {
          results.push({
            name: row.Name,
            lat,
            lon,
            rating,
          });
        }
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

module.exports = { loadCSV };
