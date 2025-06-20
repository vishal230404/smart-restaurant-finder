import React, { useState } from 'react';
import { MessageSquare, TrendingUp, Star, Sparkles, Send } from 'lucide-react';
import API from '../api/axios';

const ReviewAnalyzer = () => {
  const [review, setReview] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyze = async () => {
    if (!review.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await API.post('/sentiment', { review });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    return sentiment === 'Positive' 
      ? 'from-green-400 to-emerald-600' 
      : 'from-red-400 to-rose-600';
  };

  const getSentimentIcon = (sentiment) => {
    return sentiment === 'Positive' ? '😊' : '😞';
  };

  const getConfidenceLevel = (score) => {
    if (score >= 0.8) return 'Very High';
    if (score >= 0.6) return 'High';
    if (score >= 0.4) return 'Medium';
    return 'Low';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Restaurant Review Analyzer
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the sentiment behind your dining experiences with AI-powered analysis
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
          <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Share Your Restaurant Experience
              </label>
              <div className="relative">
                <textarea
                  className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none text-gray-700 placeholder-gray-400 bg-white/50 backdrop-blur-sm"
                  rows="6"
                  placeholder="Tell us about your dining experience... Was the food delicious? How was the service? Share all the details!"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                  {review.length}/500
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <button
                onClick={analyze}
                disabled={!review.trim() || isLoading}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Analyze Sentiment
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform animate-in slide-in-from-bottom duration-500">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Analysis Results
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Sentiment Card */}
              <div className="relative overflow-hidden rounded-2xl">
                <div className={`bg-gradient-to-r ${getSentimentColor(result.label)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm font-medium">Overall Sentiment</p>
                      <p className="text-3xl font-bold">{result.label}</p>
                    </div>
                    <div className="text-4xl">
                      {getSentimentIcon(result.label)}
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-full p-3 flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      {result.label === 'Positive' ? '👍' : '👎'} 
                      {result.label === 'Positive' ? ' Great Review!' : ' Needs Improvement'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Confidence Card */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm font-medium">Confidence Level</p>
                    <p className="text-3xl font-bold">{getConfidenceLevel(result.score)}</p>
                  </div>
                  <div className="text-4xl">
                    📊
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy Score</span>
                    <span>{(result.score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div 
                      className="bg-white rounded-full h-3 transition-all duration-1000 ease-out"
                      style={{ width: `${result.score * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Insights */}
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                AI Insights
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {result.label === 'Positive' 
                  ? "Your review reflects a positive dining experience! The language and tone suggest satisfaction with various aspects of your visit. This type of feedback helps restaurants understand what they're doing well."
                  : "Your review indicates some concerns about your dining experience. Constructive feedback like this is valuable for restaurants to identify areas for improvement and enhance customer satisfaction."
                }
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Powered by advanced AI sentiment analysis • Help restaurants improve with your feedback
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalyzer;