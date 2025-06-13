const express = require('express');
const router = express.Router();

function getSentiment(text) {
  const lower = text.toLowerCase();
  if (lower.includes('good') || lower.includes('excellent')) return 'Positive';
  if (lower.includes('bad') || lower.includes('worst')) return 'Negative';
  return 'Neutral';
}

router.post('/analyze-review', (req, res) => {
  const { review } = req.body;
  const sentiment = getSentiment(review);
  res.json({ sentiment });
});

module.exports = router;
