import axios from 'axios';

const api = axios.create({
  baseURL: 'api/geolocation',
  params: {
    benchmark: 'Public_AR_Census2020',
    format: 'json'
  },
});

export default api;
