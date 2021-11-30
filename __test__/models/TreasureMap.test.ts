import {TreasureMap} from '../../src/models/TreasureMap';
import {TileType} from '../../src/models/TileType.enum';
import {Tile} from '../../src/models/Tile.interface';
import {TileBuilder} from '../../src/tools/TileBuilder';

describe('TreasureMap class tests', () => {
  let map: TreasureMap;

  it('should build a default map', () => {
    map = new TreasureMap(2, 2);

    expect(map.width).toBe(2);
    expect(map.height).toBe(2);
    expect(map.terrain[0][0].identifier).toBe(TileType.NORMAL);
    expect(map.terrain[0][1].identifier).toBe(TileType.NORMAL);
    expect(map.terrain[1][0].identifier).toBe(TileType.NORMAL);
    expect(map.terrain[1][1].identifier).toBe(TileType.NORMAL);
  });

  it('should find tile type at given coordinates', () => {
    expect(map.tileTypeAt(0, 0)).toBe(TileType.NORMAL);
  });

  it('should find treasure number at given coordinates', () => {
    expect(map.tileTreasureAt(0, 0)).toBeUndefined();
  });

  describe('Adding tile to the map', () => {
    it('should add a Mountain to the map', () => {
      const mountain: Tile = {
        identifier: TileType.MOUNTAIN,
      };
      map.addTile(mountain, 0, 0);

      expect(map.tileTypeAt(0, 0)).toBe(TileType.MOUNTAIN);
    });

    it('should add a Treasure to the map', () => {
      const treasure: Tile = {
        identifier: TileType.TREASURE,
        treasureNumber: 2,
      };
      map.addTile(treasure, 0, 1);

      expect(map.tileTypeAt(0, 1)).toBe(TileType.TREASURE);
      expect(map.tileTreasureAt(0, 1)).toBe(2);
    });
  });

  describe('Adding TileBuilder to the map', () => {
    it('should add a Mountain to the map', () => {
      const mountain = new TileBuilder(TileType.MOUNTAIN, 0, 0);
      map.addTile(mountain);

      expect(map.tileTypeAt(0, 0)).toBe(TileType.MOUNTAIN);
    });

    it('should add a Treasure to the map', () => {
      const treasure = new TileBuilder(TileType.TREASURE, 0, 1, 2);
      map.addTile(treasure);

      expect(map.tileTypeAt(0, 1)).toBe(TileType.TREASURE);
      expect(map.tileTreasureAt(0, 1)).toBe(2);
    });
  });
});
