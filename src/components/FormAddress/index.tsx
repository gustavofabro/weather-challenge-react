import React, { FormEvent, useState } from 'react';
import { getAdressLatLong } from 'services/geocoding-census';
import { AddressInputContainer, ButtonSubmit, Container } from './styles';
import { FaSpinner } from 'react-icons/fa';
import { AddresLatLong } from 'domain/addres-lat-long.model';

interface FormAddressProps {
  onSubmitAddress: (addressLatLong: AddresLatLong | null) => void
}

const FormAddress: React.FC<FormAddressProps> = ({ onSubmitAddress }) => {
  const [address, setAddress] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [addressNotFound, setAddressNotFound] = useState<boolean>(false);
  const [apiErrorCommunication, setApiErrorCommunication] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setIsSubmitted(true);

    if (!isFormValid()) {
      return;
    }

    onSubmitAddress(null);
    setIsLoading(true);
    handleGetAddressForecastInfo(address)
      .finally(() => setIsLoading(false));
  }

  async function handleGetAddressForecastInfo(address: string): Promise<void> {
    try {
      const latLongInfo = await getAdressLatLong(address);

      if (!latLongInfo) {
        setAddressNotFound(true);
        return;
      }

      onSubmitAddress(latLongInfo);
    } catch {
      setApiErrorCommunication(true);
    }
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
          data-testid="input-address"
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
        {!inputHasError(address) && apiErrorCommunication && <span role='alert'>Error retrieving your location, please try again in a few moments</span>}
      </AddressInputContainer>

      <ButtonSubmit type='submit' isLoading={isLoading} disabled={isLoading} data-testid="button-submit">
        {isLoading ? <FaSpinner title='Searching address'/> : <span>Submit</span>}
      </ButtonSubmit>
    </Container>
  );
};

export default FormAddress;
