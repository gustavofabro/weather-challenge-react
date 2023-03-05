
import { getGridPointsCache, saveGridPointsCache } from 'services/gridpoints-cache';
import { getForecastFromLatLong } from 'services/us-weather';
import api from 'services/us-weather/us-weather.api';

const mockGetGridPointsCache = getGridPointsCache as jest.Mock;
const mockSaveGridPointsCache = saveGridPointsCache as jest.Mock;
const mockApiGet = api.get as jest.Mock;

jest.mock('../../services/us-weather/us-weather.api', () => ({
  get: jest.fn()
}));


jest.mock('../../services/gridpoints-cache', () => ({
  getGridPointsCache: jest.fn(),
  saveGridPointsCache: jest.fn()
}));


describe('US Weather service', () => {
  beforeEach(() => {
    mockApiGet.mockClear();
    mockGetGridPointsCache.mockClear();
    mockSaveGridPointsCache.mockClear();
  });

  it('should not call api for gridPoints when value is cached', () => {
    const lat = 3123;
    const lng = 2546;
    const cachedValue = {
      gridId: "SEW",
      gridX: 124,
      gridY: 68
    }

    mockGetGridPointsCache.mockReturnValue(cachedValue);
    mockApiGet.mockResolvedValue({
      data: {
        properties: {
          periods: []
        }
      }
    });

    getForecastFromLatLong(lat, lng);

    expect(mockApiGet).not.toBeCalledWith(`points/${lat},${lng}`);
  });

  it('should save gridPoints when not exists in cache', async () => {
    const lat = 3123;
    const lng = 2546;
    const gridPoints = {
      gridId: "SEW",
      gridX: 124,
      gridY: 68
    }

    mockGetGridPointsCache.mockReturnValue(null);
    mockApiGet.mockResolvedValue({
      data: {
        properties: {
          periods: [],
          ...gridPoints
        }
      }
    });

    await getForecastFromLatLong(lat, lng);

    expect(mockSaveGridPointsCache).toBeCalledWith({ lat: `${lat}`, lng: `${lng}`}, gridPoints);
  });
});

