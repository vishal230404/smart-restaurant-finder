from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # or from your own module if custom
import re
from textblob import TextBlob  # example analyzer, replace with your model

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Example clean function (you can import yours from utils/cleaning.py)
def clean_text(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = text.lower().strip()
    return text

@app.route('/api/analyze-review', methods=['POST'])
def analyze_review():
    data = request.get_json()
    review = data.get('review')

    if not review:
        return jsonify({'error': 'No review provided'}), 400

    cleaned = clean_text(review)
    blob = TextBlob(cleaned)
    polarity = blob.sentiment.polarity

    sentiment = (
        "Positive" if polarity > 0.2 else
        "Negative" if polarity < -0.2 else
        "Neutral"
    )

    return jsonify({
        'review': review,
        'sentiment': sentiment,
        'score': round(polarity, 2)
    })

if __name__ == '__main__':
    app.run(port=5000)
