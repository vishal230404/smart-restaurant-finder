import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // update if your FastAPI server runs on a different port

export const fetchCountries = async () => {
  const res = await axios.get(`${BASE_URL}/countries`);
  return res.data.countries;
};

export const fetchCitiesByCountry = async (countryName) => {
  const res = await axios.get(`${BASE_URL}/cities`, {
    params: { country: countryName }
  });
  return res.data.cities;
};

export const fetchCityRestaurants = async (cityName, topN = 10) => {
  const res = await axios.get(`${BASE_URL}/city`, {
    params: { name: cityName, top_n: topN }
  });
  return res.data;
};
