import React, { useState } from 'react';
import API from '../api/axios';

const Recommend = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    try {
      const res = await API.post('/recommend', { name });
      setResults(res.data.recommendations || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Restaurant name" />
      <button onClick={handleSubmit}>Get Recommendations</button>
      <ul>
        {results.map((r, i) => (
          <li key={i}>{r.name} - ⭐ {r.rate} ({r.location})</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommend;
