import { WeatherForecastPeriod } from './weather-forecast-period.model';

export interface WeatherForecast {
  date: Date,
  forecasts: WeatherForecastPeriod[]
}
