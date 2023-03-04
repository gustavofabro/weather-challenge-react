import { AddresLatLong } from 'domain/addres-lat-long.model';
import api from './geocoding-census.api';

interface OneLineAddressResult {
  result: {
    addressMatches: {
      coordinates: {
        x: number,
        y: number
      }
    }[]
  }
}

function getAdressLatLong(address: string): Promise<AddresLatLong | null> {
  return api.get<OneLineAddressResult>('onelineaddress', {
    params: {
      address
    }
  }).then<AddresLatLong | null>((response) => {
    const { addressMatches } = response.data.result;
    const firstMatch = addressMatches[0];

    if (!firstMatch) {
      return null;
    }

    return {
      lat: firstMatch.coordinates.y,
      lng: firstMatch.coordinates.x
    };
  });
}

export { getAdressLatLong };
