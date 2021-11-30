import {Tile} from './Tile.interface';
import {TileBuilder} from '../tools/TileBuilder';
import {TileType} from './TileType.enum';
import MapBuilder from '../tools/MapBuilder';

export class TreasureMap {
  static readonly IDENTIFIER = 'C';
  height: number;
  width: number;
  terrain: Tile[][];

  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.terrain = this.buildDefaultTerrain();
  }

  public static fromMapBuilder(builder: MapBuilder): TreasureMap {
    const map = new TreasureMap(builder.map.width, builder.map.height);

    builder.tiles.forEach(tile => {
      map.addTile(tile);
    });

    return map;
  }

  private buildDefaultTerrain(): Tile[][] {
    const terrain: Tile[][] = [];
    const line: Tile[] = [];
    const normalTile: Tile = {
      identifier: TileType.NORMAL,
      treasureNumber: undefined,
    };

    for (let i = 0; i < this.width; i++) {
      line.push(normalTile);
    }

    for (let i = 0; i < this.height; i++) {
      const newLine = {...line};
      terrain.push(newLine);
    }

    return terrain;
  }

  private isTileInRange(tile: TileBuilder): boolean {
    if (tile.x > this.width || tile.x < 0)
      throw new RangeError("tile out of terrain's range");
    if (tile.y > this.height || tile.y < 0)
      throw new RangeError("tile out of terrain's range");

    return true;
  }

  private changeTile(x: number, y: number, tile: Tile) {
    if (this.isTileInRange(new TileBuilder(tile.identifier, x, y))) {
      this.terrain[y][x] = tile;
    }
  }

  public addTile(tile: Tile | TileBuilder, x?: number, y?: number) {
    if (tile instanceof TileBuilder) {
      this.changeTile(tile.x, tile.y, tile.toTile());
    } else if (x !== undefined && y !== undefined) {
      this.changeTile(x, y, tile);
    } else {
      throw new Error('Missing arguments');
    }
  }

  public tileTypeAt(x: number, y: number): TileType {
    return this.terrain[y][x].identifier;
  }

  public tileTreasureAt(x: number, y: number): number | undefined {
    return this.terrain[y][x].treasureNumber;
  }
}
