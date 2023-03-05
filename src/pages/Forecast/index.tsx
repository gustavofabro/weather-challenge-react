import React, { useCallback, useState } from 'react';
import { Container } from './styles';
import { AddresLatLong } from 'domain/addres-lat-long.model';
import WeatherForecastList from 'components/WeatherForecastList';
import FormAddress from 'components/FormAddress';

const Forecast: React.FC = () => {
  const [addressLatLong, setAddressLatLong] = useState<AddresLatLong | null>(null);

  const onFindAddress = useCallback((addressLatLong: AddresLatLong | null): void => {
    if (!addressLatLong) {
      setAddressLatLong(null);
      return;
    }

    setAddressLatLong(addressLatLong);
  }, []);

  return (
    <Container>
      <h1>Forecast</h1>
      <FormAddress onSubmitAddress={onFindAddress}></FormAddress>

      {addressLatLong &&
        <WeatherForecastList latLong={addressLatLong} ></WeatherForecastList>
      }
    </Container>
  );
};

export default Forecast;
