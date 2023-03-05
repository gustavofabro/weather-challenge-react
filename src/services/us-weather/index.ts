import { WeatherForecastPeriod } from 'domain/weather-forecast-period.model';
import { WeatherForecast } from 'domain/weather-forecast.model';
import { GridPoints } from 'domain/weather-grid-points.model';
import { getGridPointsLocalStorage, saveGridPointsLocalStorage } from 'services/gridpoints-local-cache';
import { isSameDate } from 'util/date-helper';
import { truncDecimal } from 'util/number-helper';
import api from './us-weather.api';

export interface WeatherForecastResult {
  periods: WeatherForecastPeriod[]
}

async function getForecastFromLatLong(lat: number, lng: number): Promise<WeatherForecast[]> {
  const gridPoints = await getLatLongGridPoints(lat, lng);
  const forecast = await getForecastFromGrid(gridPoints);

  return getForecastForNextWeekGrouped(forecast);
}

function getLatLongGridPoints(lat: number, lng: number): Promise<GridPoints> {
  const latTruncated = truncDecimal(lat);
  const longTruncated = truncDecimal(lng);
  const cachedGridPoints = getGridPointsLocalStorage({ lat: latTruncated, lng: longTruncated });

  if (cachedGridPoints) {
    return Promise.resolve(cachedGridPoints);
  }

  return api.get<{properties: GridPoints}>(`points/${latTruncated},${longTruncated}`).then(response => {
    const { gridId, gridX, gridY } = response.data.properties;
    const gridPoints= { gridId, gridX, gridY };

    saveGridPointsLocalStorage({ lat: latTruncated, lng: longTruncated }, gridPoints);

    return gridPoints;
  });
}

function getForecastFromGrid(gridPoints: { gridId: string, gridX: number, gridY: number }): Promise<WeatherForecastResult> {
  return api
    .get<{ properties: WeatherForecastResult }>(`gridpoints/${gridPoints.gridId}/${gridPoints.gridX},${gridPoints.gridY}/forecast`)
    .then<WeatherForecastResult>(response => {
    const { periods } = response.data.properties;

    return {
      periods
    };
  });
}

function getForecastForNextWeekGrouped(forecastResult: WeatherForecastResult): WeatherForecast[] {
  const daysToGroup = 7;
  const nextWeekDays: Date[] = Array
    .from({ length: daysToGroup }, (_, index) => index)
    .map((_, weekDay) => {
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + weekDay);
      return nextDay;
    });

  return nextWeekDays.map(item => {
    const forecastsForCurrentDay = forecastResult.periods.filter(forecast => {
      return isSameDate(new Date(forecast.startTime), item);
    });

    return {
      date: item,
      forecasts: forecastsForCurrentDay
    };
  });
}

export { getForecastFromLatLong };
