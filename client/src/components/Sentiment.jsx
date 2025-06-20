import React, { useState } from 'react';
import API from '../api/axios';
import { analyzeReviewSentiment } from '../api/analyzer';

const Sentiment = () => {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    try {
      const res = await API.post('/sentiment', { review });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Paste your review..." />
      <button onClick={handleAnalyze}>Analyze</button>
      {result && (
        <div>
          <p>Sentiment: <strong>{result.label}</strong></p>
          <p>Confidence: {result.score.toFixed(2)}</p>
        </div>
      )}
      <div className="text-6xl" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>
  {getSentimentEmoji(result.label, result.score)}
</div>

    </div>
  );
};

export default Sentiment;
