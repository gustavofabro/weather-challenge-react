
import { isSameDate } from 'util/date-helper';

describe('Date Helper', () => {
  it('should return true when comparing equal dates', () => {
    const date1 = new Date(2020, 1, 1);
    const date2 = new Date(2020, 1, 1);

    expect(isSameDate(date1, date2)).toBe(true);
  });

  it('should return false when comparing different dates', () => {
    const date1 = new Date(2020, 1, 1);
    const date2 = new Date(2020, 2, 1);

    expect(isSameDate(date1, date2)).toBe(false);
  });
});

