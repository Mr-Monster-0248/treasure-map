import {TileType} from '../../src/models/TileType.enum';
import {getMapFromLines} from '../../src/services';

describe('getMapFromLines()', () => {
  it('should create a map', () => {
    const defaultMap = [
      'C - 3 - 4',
      'M - 1 - 0',
      'M - 2 - 1',
      'T - 0 - 3 - 2',
      'T - 1 - 3 - 3',
      'A - Lara - 1 - 1 - S - AADADAGGA',
    ];

    const map = getMapFromLines(defaultMap);

    expect(map.width).toBe(3);
    expect(map.height).toBe(4);
    expect(map.tileTypeAt(1, 0)).toBe(TileType.MOUNTAIN);
    expect(map.tileTypeAt(2, 1)).toBe(TileType.MOUNTAIN);
    expect(map.tileTypeAt(0, 3)).toBe(TileType.TREASURE);
    expect(map.tileTreasureAt(0, 3)).toBe(2);
    expect(map.tileTypeAt(1, 3)).toBe(TileType.TREASURE);
    expect(map.tileTreasureAt(1, 3)).toBe(3);
  });

  it('should fail, due to two C identifier', () => {
    const failingMap = [
      'C - 3 - 4',
      'C - 1 - 0',
      'M - 2 - 1',
      'T - 0 - 3 - 2',
      'T - 1 - 3 - 3',
      'A - Lara - 1 - 1 - S - AADADAGGA',
    ];

    expect(() => getMapFromLines(failingMap)).toThrow(Error('Map already set'));
  });

  it('should fail, due to bad identifier', () => {
    const failingMap = [
      'C - 3 - 4',
      'X - 1 - 0',
      'M - 2 - 1',
      'T - 0 - 3 - 2',
      'T - 1 - 3 - 3',
      'A - Lara - 1 - 1 - S - AADADAGGA',
    ];

    expect(() => getMapFromLines(failingMap)).toThrow(
      Error('invalid char "X"')
    );
  });

  it('should fail, due to range error', () => {
    const failingMap = [
      'C - 3 - 4',
      'M - 1 - -2',
      'M - 2 - 1',
      'T - 0 - 3 - 2',
      'T - 1 - 3 - 3',
      'A - Lara - 1 - 1 - S - AADADAGGA',
    ];

    expect(() => getMapFromLines(failingMap)).toThrow(
      RangeError("tile out of terrain's range")
    );
  });
});
