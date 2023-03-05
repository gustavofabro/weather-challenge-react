import { TemperatureUnit } from './temperature-unit.enum';
import { WindDirection } from './wind-direction.enum';

export interface WeatherForecastPeriod {
  name: string,
  startTime: string,
  endTime: string,
  isDaytime: boolean,
  temperature: number,
  temperatureUnit: TemperatureUnit,
  probabilityOfPrecipitation: {
    unitCode: string,
    value: number | null
  },
  relativeHumidity: {
    unitCode: string,
    value: number
  },
  windSpeed: string,
  windDirection: WindDirection,
  shortForecast: string,
  detailedForecast: string,
  icon: string
}
