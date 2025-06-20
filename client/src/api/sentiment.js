// src/api/sentiment.js

export async function analyzeReviewSentiment(review) {
  const response = await fetch('http://localhost:8000/sentiment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ review }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze sentiment');
  }

  return await response.json();
}
