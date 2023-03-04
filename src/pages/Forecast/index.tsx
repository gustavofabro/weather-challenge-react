import React, { FormEvent, useState } from 'react';
import { getAdressLatLong } from 'services/geocoding-census';
import { AddressInputContainer, ButtonSumit, Container, FormContainer } from './styles';
import { FaSpinner } from 'react-icons/fa';
import { AddresLatLong } from 'domain/addres-lat-long.model';
import WeatherForecastList from 'components/WeatherForecastList';

const Forecast: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [addressLatLong, setAddressLatLong] = useState<AddresLatLong | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [addressNotFound, setAddressNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid()) {
      return;
    }

    setAddressLatLong(null);
    setIsLoading(true);
    handlGetWeatherForecast(address)
      .finally(() => setIsLoading(false));
  }

  async function handlGetWeatherForecast(address: string): Promise<void> {
    const latLongInfo = await getAdressLatLong(address);

    if (!latLongInfo) {
      setAddressNotFound(true);
      return;
    }

    setAddressLatLong(latLongInfo);
  }

  function isFormValid(): boolean {
    return !!address.trim();
  }

  function inputHasError(value: string): boolean {
    return isSubmitted && !value.trim();
  }

  return (
    <Container>
      <h1>Forecast</h1>
      <FormContainer>
        <form onSubmit={onSubmit}>
          <AddressInputContainer hasError={inputHasError(address)}>
            <input
              type="text"
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressNotFound(false);
              }}
              maxLength={100}
              value={address}
              placeholder='Type your complete address (street, city, state, zip) ' />

            {inputHasError(address) && <span role='alert'>Required field</span>}
            {!inputHasError(address) && addressNotFound && <span role='alert'>Address not found, please make sure you typed it correctly</span>}
          </AddressInputContainer>

          <ButtonSumit type='submit' isLoading={isLoading} disabled={isLoading}>
            {isLoading ? <FaSpinner title='Loading weather forecast'/> : <span>Submit</span>}
          </ButtonSumit>
        </form>
      </FormContainer>

      {addressLatLong &&
        <WeatherForecastList latLong={addressLatLong} ></WeatherForecastList>
      }
    </Container>
  );
};

export default Forecast;
