import axios from 'axios';

export const fetchNearbyRestaurants = async (lat, lon) => {
  const response = await axios.get(`http://localhost:5000/api/nearby`, {
    params: { lat, lon },
  });
  return response.data;
};
