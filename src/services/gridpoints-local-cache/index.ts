import { GridPoints } from 'domain/weather-grid-points.model';

const LOCAL_STORAGE_WEATHER_CHALLENGE_KEY = 'weather-challenge-react';

function getGridPointsLocalStorage(latLong: {lat: string, lng: string}): GridPoints | null {
  const data =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER_CHALLENGE_KEY) || '{}');
  const gridPointsForLatLong = data[_getPropertieKey(latLong)];

  return gridPointsForLatLong || null;
}

function saveGridPointsLocalStorage(latLong: {lat: string, lng: string}, gridPoints: GridPoints): void {
  let data =  JSON.parse(localStorage.getItem(LOCAL_STORAGE_WEATHER_CHALLENGE_KEY) || '{}');

  data = {
    ...data,
    [_getPropertieKey(latLong)]: gridPoints
  };

  localStorage.setItem(LOCAL_STORAGE_WEATHER_CHALLENGE_KEY, JSON.stringify(data));
}

function _getPropertieKey(latLong: {lat: string, lng: string}): string {
  return `${latLong.lat}/${latLong.lng}`;
}

export { getGridPointsLocalStorage, saveGridPointsLocalStorage };
