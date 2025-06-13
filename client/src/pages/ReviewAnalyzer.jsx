import React, { useState } from 'react';
import axios from 'axios';

const ReviewAnalyzer = () => {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);

  const analyzeReview = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/analyze-review', { review });
      setResult(res.data);
    } catch (error) {
      setResult({ sentiment: 'Error analyzing review' });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🧠 Review Sentiment Analyzer</h1>
      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="4"
        placeholder="Paste a restaurant review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded"
        onClick={analyzeReview}
      >
        Analyze
      </button>
      {result && (
        <div className="mt-4 text-lg font-medium text-center">
          Sentiment: <span className="text-indigo-700">{result.sentiment}</span>
        </div>
      )}
    </div>
  );
};

export default ReviewAnalyzer;
