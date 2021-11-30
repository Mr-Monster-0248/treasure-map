import {TileType} from '../../src/models/TileType.enum';
import {TileBuilder} from '../../src/tools/TileBuilder';

describe('TileBuilder test', () => {
  describe('fromLine()', () => {
    it.each`
      tileName      | tileType             | treasureNumber | x    | y    | line
      ${'mountain'} | ${TileType.MOUNTAIN} | ${undefined}   | ${1} | ${2} | ${'M - 1 - 2'}
      ${'treasure'} | ${TileType.TREASURE} | ${3}           | ${1} | ${4} | ${'T - 1 - 4 - 3'}
    `('should build a $tileName', ({tileType, treasureNumber, x, y, line}) => {
      const tile = TileBuilder.fromLine(line);

      expect(tile.identifier).toBe(tileType);
      expect(tile.x).toBe(x);
      expect(tile.y).toBe(y);
      expect(tile.treasureNumber).toBe(treasureNumber);
    });

    it('should fail tile creation', () => {
      expect(() => TileBuilder.fromLine('U - 1 - 2')).toThrow(
        Error('Not a possible line to build a Tile')
      );
    });
  });

  describe('toTile()', () => {
    it.each`
      tileName      | tileType             | treasureNumber
      ${'mountain'} | ${TileType.MOUNTAIN} | ${undefined}
      ${'treasure'} | ${TileType.TREASURE} | ${3}
    `('should build a $tileName', ({tileType, treasureNumber}) => {
      const tile = new TileBuilder(tileType, 0, 0, treasureNumber).toTile();

      expect(tile.identifier).toBe(tileType);
      expect(tile.treasureNumber).toBe(treasureNumber);
    });
  });
});
