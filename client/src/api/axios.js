import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // replace with actual backend URL if deployed
});

export default API;
