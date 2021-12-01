import {isValidDirection} from '../../src/tools/isValidDirection';

describe('isValidDirection', () => {
  it.each`
    direction  | value
    ${'north'} | ${'N'}
    ${'est'}   | ${'E'}
    ${'south'} | ${'S'}
    ${'west'}  | ${'W'}
  `('should be valid direction for $direction', ({value}) => {
    expect(isValidDirection(value)).toBeTruthy();
  });

  it('should not be a direction', () => {
    expect(isValidDirection('f')).toBeFalsy();
  });
});
