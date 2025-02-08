import { formatOMDBDateToISO } from './format-date.helper';

describe('formatOMDBDateToISO', () => {
  it('should convert a valid OMDB date to ISO format', () => {
    expect(formatOMDBDateToISO('12 Nov 2020')).toBe('2020-11-12');
  });

  it('should handle single-digit day values correctly', () => {
    expect(formatOMDBDateToISO('3 Jan 1999')).toBe('1999-01-03');
  });

  it('should throw an error if the month abbreviation is invalid', () => {
    expect(() => formatOMDBDateToISO('12 Abc 2020')).toThrow(
      'Invalid date format',
    );
  });

  it('should throw an error if the input format is incorrect', () => {
    expect(() => formatOMDBDateToISO('Nov 12 2020')).toThrow(
      'Invalid date format',
    );
  });

  it('should throw an error if the input is an empty string', () => {
    expect(() => formatOMDBDateToISO('')).toThrow('Invalid date format');
  });
});
