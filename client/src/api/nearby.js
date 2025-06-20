const BASE_URL = 'http://127.0.0.1:8000';

export const fetchNearbyRestaurants = async (lat, lon) => {
  const response = await fetch(`${BASE_URL}/nearby?lat=${lat}&lon=${lon}`);
  if (!response.ok) {
    throw new Error('Failed to fetch nearby restaurants');
  }
  return await response.json();
};
