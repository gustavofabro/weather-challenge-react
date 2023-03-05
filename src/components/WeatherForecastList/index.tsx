import WeatherForecastListLoader from 'components/WeatherForecastListLoader';
import { AddresLatLong } from 'domain/addres-lat-long.model';
import { WeatherForecast } from 'domain/weather-forecast.model';
import React, { useEffect, useState } from 'react';
import { WiHumidity, WiWindy, WiRain } from 'react-icons/wi';
import { getForecastFromLatLong } from 'services/us-weather';
import { maskDateToMonthDay } from 'util/date-helper';
import { ButtonSelectPeriod, ButtonSelectPeriodContainer, Card, CardsContainer, Container, DayPeriod, WeatherInfo, WeatherInfoContainer } from './styles';

const WeatherForecastList: React.FC<{ latLong: AddresLatLong }> = ({ latLong }) => {
  const [weatherForecasts, setWeatherForecasts] = useState<WeatherForecast[]>();
  const [showPeriodMap, setShowPeriodMap] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function setShowPeriodOfDay(dayId: string, periodId: string): void {
    setShowPeriodMap(prev => {
      prev[dayId] = periodId;
      return { ...prev };
    });
  }

  function showPeriodOfDay(dayId: string, periodId: string): boolean {
    return showPeriodMap[dayId] === periodId;
  }

  useEffect(() => {
    const defaultSelectedPeriods: {[key: string]: string} = {};

    weatherForecasts?.forEach(item => {
      const dayId = item.date.toDateString();
      defaultSelectedPeriods[dayId] = item.forecasts[0].startTime;
    });

    setShowPeriodMap(defaultSelectedPeriods);
  }, [weatherForecasts]);

  useEffect(() => {
    async function loadWeatherForecast(): Promise<void> {
      const weatherForecasts = await getForecastFromLatLong(latLong.lat, latLong.lng);

      setWeatherForecasts(weatherForecasts);
    }

    setIsLoading(true);
    loadWeatherForecast()
      .finally(() => setIsLoading(false));
  }, [latLong.lat, latLong.lng]);

  return (
    <Container>
      {isLoading ? <WeatherForecastListLoader /> :
        <CardsContainer>
          {weatherForecasts?.map(item => {
            const dayId = item.date.toDateString();

            return <Card key={dayId}>
              <h2>
                {maskDateToMonthDay(item.date)}
              </h2>

              <ButtonSelectPeriodContainer>
                {item.forecasts.map(dayPeriod => (
                  <ButtonSelectPeriod
                    key={dayPeriod.startTime}
                    isSelected={showPeriodOfDay(dayId, dayPeriod.startTime)}
                    onClick={() => setShowPeriodOfDay(dayId, dayPeriod.startTime)}
                  >{dayPeriod.name}</ButtonSelectPeriod>
                ))}
              </ButtonSelectPeriodContainer>

              <WeatherInfoContainer>
                {item.forecasts.map(dayPeriod =>(
                  <DayPeriod key={dayPeriod.startTime}>
                    {
                      showPeriodOfDay(dayId, dayPeriod.startTime) &&
                      <>
                        <WeatherInfo>
                          <div>
                            <span>{dayPeriod.temperature} °{dayPeriod.temperatureUnit}</span>
                            <div>
                              {dayPeriod.probabilityOfPrecipitation.value && <span>{<WiRain aria-hidden />} {dayPeriod.probabilityOfPrecipitation.value}%</span>}
                              <span>{<WiHumidity aria-hidden />} {dayPeriod.relativeHumidity.value}%</span>
                              <span>{<WiWindy aria-hidden />} {dayPeriod.windSpeed}</span>
                            </div>
                          </div>
                          <p>{dayPeriod.shortForecast}</p>
                        </WeatherInfo>
                      </>
                    }
                  </DayPeriod>
                ))}
              </WeatherInfoContainer>
            </Card>;
          })}
        </CardsContainer>
      }
    </Container>
  );
};

export default WeatherForecastList;
