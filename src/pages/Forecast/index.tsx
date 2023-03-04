import React, { FormEvent, useState } from 'react';
import { getAdressLatLong } from 'services/geocoding-census';
import { AddressInputContainer, ButtonSumit, Container, FormContainer } from './styles';
import { FaSpinner } from 'react-icons/fa';

const Forecast: React.FC = () => {
  const [address, setAddress] = useState<string>('500 Yale Avenue North, Seattle, WA 98109');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [addressNotFound, setAddressNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid()) {
      return;
    }

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
              placeholder='Type your complete address ' />

            {inputHasError(address) && <span role='alert'>Required field</span>}
            {!inputHasError(address) && addressNotFound && <span role='alert'>Address not found, please make sure you typed it correctly</span>}
          </AddressInputContainer>

          <ButtonSumit type='submit' isLoading={isLoading} disabled={isLoading}>
            {isLoading ? <FaSpinner/> : <span>Submit</span>}
          </ButtonSumit>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Forecast;
