import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WeatherForecastList from 'components/WeatherForecastList';
import { getForecastFromLatLong } from 'services/us-weather';
import { AddresLatLong } from 'domain/addres-lat-long.model';
import { WeatherForecast } from 'domain/weather-forecast.model';
import { TemperatureUnit } from 'domain/temperature-unit.enum';
import { WindDirection } from 'domain/wind-direction.enum';

const mockedGetForecastFromLatLong = getForecastFromLatLong as jest.Mock;

jest.mock('services/us-weather', () => {
  return {
    getForecastFromLatLong: jest.fn()
  };
});

const weatherForecasts: WeatherForecast[] = [{
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  date: new Date(2023, 1, 2),
  forecasts: [{
    name: 'Sunday',
    startTime: '2023-03-05T11:00:00-06:00',
    endTime: '2023-03-05T18:00:00-06:00',
    isDaytime: true,
    temperature: 69,
    temperatureUnit: TemperatureUnit.F,
    probabilityOfPrecipitation: {
      unitCode: 'wmoUnit:percent',
      value: null
    },
    relativeHumidity: {
      unitCode: 'wmoUnit:percent',
      value: 57
    },
    windSpeed: '10 to 15 mph',
    windDirection: WindDirection.E,
    shortForecast: 'Sunny',
    detailedForecast: 'Sunny, with a high near 69. South wind 10 to 15 mph, with gusts as high as 25 mph.'
  }]
}, {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  date: new Date(2023, 1, 1),
  forecasts: [{
    name: 'Sunday',
    startTime: '2023-03-06T11:00:00-06:00',
    endTime: '2023-03-06T18:00:00-06:00',
    isDaytime: true,
    temperature: 69,
    temperatureUnit: TemperatureUnit.F,
    probabilityOfPrecipitation: {
      unitCode: 'wmoUnit:percent',
      value: null
    },
    relativeHumidity: {
      unitCode: 'wmoUnit:percent',
      value: 57
    },
    windSpeed: '10 to 15 mph',
    windDirection: WindDirection.E,
    shortForecast: 'Sunny',
    detailedForecast: 'Sunny, with a high near 69. South wind 10 to 15 mph, with gusts as high as 25 mph.',
    icon: 'https://some-image.com'
  }]
}];

describe('WeatherForecastList component', () => {

  beforeEach(() => {
    mockedGetForecastFromLatLong.mockClear();
  });

  it('should call getForecastFromLatLong with the informed lat/long', async () => {
    const latLongInfo: AddresLatLong = { lat: 123, lng: 321 };
    mockedGetForecastFromLatLong.mockResolvedValue({});

    waitFor(() => {
      render(<WeatherForecastList latLong={latLongInfo} />);
    });

    await waitFor(() => {
      expect(mockedGetForecastFromLatLong).toBeCalledWith(latLongInfo.lat, latLongInfo.lng);
    });
  });


  it('should render the cards for each day', async () => {
    const latLongInfo: AddresLatLong = { lat: 123, lng: 321 };
    mockedGetForecastFromLatLong.mockResolvedValue(weatherForecasts);

    waitFor(() => {
      render(<WeatherForecastList latLong={latLongInfo} />);
    });

    await waitFor(() => {
      const weatherForecastCards = screen.queryAllByTestId('weather-forescast-card');

      expect(weatherForecastCards.length).toBe(weatherForecasts.length);
    });
  });
});
