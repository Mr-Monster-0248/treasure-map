import {isOnlyValidMoves, isValidMove} from '../../src/tools/isValidMove';

describe('isValidMove', () => {
  it.each`
    move         | value
    ${'forward'} | ${'A'}
    ${'right'}   | ${'D'}
    ${'left'}    | ${'G'}
  `('should be valid move $move', ({value}) => {
    expect(isValidMove(value)).toBeTruthy();
  });

  it('should not be a move', () => {
    expect(isValidMove('f')).toBeFalsy();
  });
});

describe('isOnlyValidMoves', () => {
  it('should be only valid moves', () => {
    expect(isOnlyValidMoves(['A', 'D', 'D', 'G'])).toBeTruthy();
  });

  it('should not only valid moves', () => {
    expect(isOnlyValidMoves(['A', 'R', 'D', 'G'])).toBeFalsy();
  });
});
