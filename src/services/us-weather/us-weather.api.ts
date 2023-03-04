import axios from 'axios';

const api = axios.create({
  baseURL: 'api/weather',
  headers: {
    'User-Agent': '(fabro-weather-app, gustavofabro.f@gmail.com)'
  }
});

export default api;
