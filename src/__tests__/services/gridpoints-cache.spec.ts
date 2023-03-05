
import { getGridPointsCache, saveGridPointsCache } from 'services/gridpoints-cache';

const mockLocalStorageGetItem = jest.fn();
const mockLocalStorageSetItem = jest.fn();

Object.defineProperty(window, 'localStorage', { value: {
  getItem: mockLocalStorageGetItem,
  setItem: mockLocalStorageSetItem
} });

describe('GridPoints service', () => {
  beforeEach(() => {
    mockLocalStorageGetItem.mockClear();
    mockLocalStorageSetItem.mockClear();
  });

  it('should return the gridPoint value for the informed lat/long when it exists in local storage', () => {
    const lat = '3123';
    const lng = '-2546';
    const cachedValue = {
      gridId: 'SEW',
      gridX: 124,
      gridY: 68
    };

    mockLocalStorageGetItem.mockReturnValue(JSON.stringify({
      ['38.8459/-76.9274']: {
        gridId: 'SEW',
        gridX: 124,
        gridY: 68
      },
      [`${lat}/${lng}`]: cachedValue
    }));

    const returnValue = getGridPointsCache({ lat, lng });

    expect(returnValue).toStrictEqual(cachedValue);
  });

  it('should save the value in local storage and keeping the existing ones', () => {
    const lat = '3123';
    const lng = '-2546';
    const gridPoints = {
      gridId: 'SEW',
      gridX: 124,
      gridY: 68
    };
    const previousValue = {
      ['38.8459/-76.9274']: {
        gridId: 'SEW',
        gridX: 124,
        gridY: 68
      }
    };

    mockLocalStorageGetItem.mockReturnValue(JSON.stringify(previousValue));

    saveGridPointsCache({ lat, lng }, gridPoints);

    expect(mockLocalStorageSetItem).toBeCalledWith(expect.anything(), JSON.stringify({
      ...previousValue,
      [`${lat}/${lng}`]: gridPoints
    }));
  });
});

