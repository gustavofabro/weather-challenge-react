import WeatherForecastListLoader from 'components/WeatherForecastListLoader';
import { AddresLatLong } from 'domain/addres-lat-long.model';
import { WeatherForecast } from 'domain/weather-forecast.model';
import useErrorMessage from 'hooks/useErrorMessage';
import React, { useEffect, useState } from 'react';
import { WiHumidity, WiWindy, WiRain } from 'react-icons/wi';
import { getForecastFromLatLong } from 'services/us-weather';
import { maskDateToMonthDay } from 'util/date-helper';
import { ButtonSelectPeriod, ButtonSelectPeriodContainer, Card, CardsContainer, Container, DayPeriod, ForecastMainInfo, ForecastResume, WeatherInfo, WeatherInfoContainer } from './styles';

const WeatherForecastList: React.FC<{ latLong: AddresLatLong }> = ({ latLong }) => {
  const [weatherForecasts, setWeatherForecasts] = useState<WeatherForecast[]>();
  const [showPeriodMap, setShowPeriodMap] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { updateErrorMessage } = useErrorMessage();

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
      defaultSelectedPeriods[dayId] = item.forecasts[0]?.startTime;
    });

    setShowPeriodMap(defaultSelectedPeriods);
  }, [weatherForecasts]);

  useEffect(() => {
    async function loadWeatherForecast(): Promise<void> {
      try {
        const weatherForecasts = await getForecastFromLatLong(latLong.lat, latLong.lng);

        setWeatherForecasts(weatherForecasts);
      } catch {
        updateErrorMessage('Error retrieving weather forecast, please try again in a few moments');
      }
    }

    setIsLoading(true);
    loadWeatherForecast()
      .finally(() => setIsLoading(false));
  }, [latLong.lat, latLong.lng, updateErrorMessage]);

  return (
    <Container>
      {isLoading ? <WeatherForecastListLoader /> :
        <CardsContainer>
          {weatherForecasts?.map(item => {
            const dayId = item.date.toDateString();

            return <Card data-testid="weather-forescast-card" key={dayId}>
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
                  /* TODO: Split in separate component */
                  <DayPeriod key={dayPeriod.startTime}>
                    {
                      showPeriodOfDay(dayId, dayPeriod.startTime) &&
                        <WeatherInfo>
                          <ForecastMainInfo>
                            <span>{dayPeriod.temperature} °{dayPeriod.temperatureUnit}</span>
                            <div>
                              {dayPeriod.probabilityOfPrecipitation.value && <span>{<WiRain aria-hidden />} {dayPeriod.probabilityOfPrecipitation.value}%</span>}
                              <span>{<WiHumidity aria-hidden />} {dayPeriod.relativeHumidity.value}%</span>
                              <span>{<WiWindy aria-hidden />} {dayPeriod.windSpeed}</span>
                            </div>
                          </ForecastMainInfo>

                          <ForecastResume>
                            <img src={dayPeriod.icon} alt="Forecast icon" aria-hidden/>
                            <p>{dayPeriod.shortForecast}</p>
                          </ForecastResume>
                        </WeatherInfo>
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

