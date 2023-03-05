import React, { FormEvent, useState } from 'react';
import { getAdressLatLong } from 'services/geocoding-census';
import { AddressInputContainer, ButtonSubmit, Container } from './styles';
import { FaSpinner } from 'react-icons/fa';
import { AddresLatLong } from 'domain/addres-lat-long.model';

interface FormAddressProps {
  onSubmitAddress: (addressLatLong: AddresLatLong) => void
}

const FormAddress: React.FC<FormAddressProps> = ({ onSubmitAddress }) => {
  const [address, setAddress] = useState<string>('');
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
    handleGetAddressForecastInfo(address)
      .finally(() => setIsLoading(false));
  }

  async function handleGetAddressForecastInfo(address: string): Promise<void> {
    const latLongInfo = await getAdressLatLong(address);

    if (!latLongInfo) {
      setAddressNotFound(true);
      return;
    }

    onSubmitAddress(latLongInfo);
  }

  function isFormValid(): boolean {
    return !!address.trim();
  }

  function inputHasError(value: string): boolean {
    return isSubmitted && !value.trim();
  }

  return (
    <Container onSubmit={onSubmit}>
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

      <ButtonSubmit type='submit' isLoading={isLoading} disabled={isLoading}>
        {isLoading ? <FaSpinner title='Loading weather forecast'/> : <span>Submit</span>}
      </ButtonSubmit>
    </Container>
  );
};

export default FormAddress;
