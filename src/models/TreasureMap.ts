import {Tile} from './Tile.interface';
import {TileBuilder} from './TileBuilder';
import {TileType} from './TileType.enum';

export class TreasureMap {
  static readonly IDENTIFIER = 'C';
  height: number;
  width: number;
  terrain: Tile[][];

  constructor(height: number, width: number, tiles?: TileBuilder[]) {
    this.height = height;
    this.width = width;
    this.terrain = this.buildDefaultTerrain();

    if (tiles) {
      tiles.forEach(this.addTile);
    }
  }

  private buildDefaultTerrain(): Tile[][] {
    const terrain: Tile[][] = [];
    const line: Tile[] = [];
    const normalTile: Tile = {
      identifier: TileType.NORMAL,
    };

    for (let i = 0; i < this.width; i++) {
      line.push(normalTile);
    }

    for (let i = 0; i < this.height; i++) {
      terrain.push(line);
    }

    return terrain;
  }

  private addTile(tile: TileBuilder) {
    if (tile.x > this.width || tile.x < 0)
      throw new RangeError("tile out of terrain's range");
    if (tile.y > this.height || tile.y < 0)
      throw new RangeError("tile out of terrain's range");

    this.terrain[tile.y][tile.x] = tile.toTile();
  }
}
