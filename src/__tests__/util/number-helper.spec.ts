import { truncDecimal } from "util/number-helper";

describe('Number Helper', () => {
  it('should return the number with 4 decimal places', () => {
    const value = 1.34123002;

    expect(truncDecimal(value, 4)).toBe('1.3412');
  });

  it('should return the number itself when the number of decimal places is less than the value to truncate', () => {
    const value = 1.341;

    expect(truncDecimal(value, 4)).toBe('1.341');
  });
});

