import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import FormAddress from 'components/FormAddress';
import { getAdressLatLong } from 'services/geocoding-census';
import { AddresLatLong } from 'domain/addres-lat-long.model';

const mockedOnSubmitAddress = jest.fn();
const mockedGetAdressLatLong = getAdressLatLong as jest.Mock;

jest.mock('services/geocoding-census', () => {
  return {
    getAdressLatLong: jest.fn()
  };
});

describe('FormAddress component', () => {

  beforeEach(() => {
    mockedOnSubmitAddress.mockClear();
    mockedGetAdressLatLong.mockClear();
  });

  it('should call getAdressLatLong with the submited address', async () => {
    waitFor(() => {
      render(<FormAddress onSubmitAddress={mockedOnSubmitAddress} />);
    });

    const address = '500 Yale Avenue North, Seattle, WA 98109';
    const inputElement = screen.getByTestId('input-address');

    mockedGetAdressLatLong.mockResolvedValue({});

    fireEvent.change(inputElement, {
      target: {
        value: address
      }
    });

    await waitFor(() => {
      screen.getByTestId('button-submit').click();
    });

    expect(mockedGetAdressLatLong).toBeCalledWith(address);
  });

  it('should call props function onSubmitAddress when api return the lat/long', async () => {
    waitFor(() => {
      render(<FormAddress onSubmitAddress={mockedOnSubmitAddress} />);
    });

    const latLongInfo: AddresLatLong = { lat: 123, lng: 321 };
    const inputElement = screen.getByTestId('input-address');

    mockedGetAdressLatLong.mockResolvedValue(latLongInfo);

    fireEvent.change(inputElement, {
      target: {
        value: '500 Yale Avenue North, Seattle, WA 98109'
      }
    });

    screen.getByTestId('button-submit').click();

    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expect(mockedOnSubmitAddress).toHaveBeenNthCalledWith(2, latLongInfo);
    });
  });

  it('should show an error message when submit form with empty input', async () => {
    waitFor(() => {
      render(<FormAddress onSubmitAddress={mockedOnSubmitAddress} />);
    });

    const inputElement = screen.getByTestId('input-address');

    mockedGetAdressLatLong.mockResolvedValue({});

    fireEvent.change(inputElement, {
      target: {
        value: ''
      }
    });

    screen.getByTestId('button-submit').click();

    await waitFor(() => {
      expect(screen.queryByText('Required field')).toBeInTheDocument();
    });
  });

  it('should show an error message when address is not found', async () => {
    waitFor(() => {
      render(<FormAddress onSubmitAddress={mockedOnSubmitAddress} />);
    });

    const inputElement = screen.getByTestId('input-address');

    mockedGetAdressLatLong.mockResolvedValue(null);

    fireEvent.change(inputElement, {
      target: {
        value: '500 Yale Avenue North, Seattle, WA 98109'
      }
    });

    await waitFor(() => {
      screen.getByTestId('button-submit').click();
      expect(screen.queryByText('Address not found, please make sure you typed it correctly')).toBeInTheDocument();
    });
  });

  it('should show an error message when service returns an error', async () => {
    waitFor(() => {
      render(<FormAddress onSubmitAddress={mockedOnSubmitAddress} />);
    });

    const inputElement = screen.getByTestId('input-address');

    mockedGetAdressLatLong.mockRejectedValue({});

    fireEvent.change(inputElement, {
      target: {
        value: '500 Yale Avenue North, Seattle, WA 98109'
      }
    });

    screen.getByTestId('button-submit').click();

    await waitFor(() => {
      expect(screen.queryByText('Error retrieving your location, please try again in a few moments')).toBeInTheDocument();
    });
  });

});
