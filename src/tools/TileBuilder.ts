import {Tile} from '../models/Tile.interface';
import {TileType} from '../models/TileType.enum';

export class TileBuilder {
  identifier: TileType;
  x: number;
  y: number;
  treasureNumber?: number;

  constructor(
    identifier: TileType,
    x: number,
    y: number,
    treasureNumber?: number
  ) {
    this.identifier = identifier;
    this.x = x;
    this.y = y;
    this.treasureNumber = treasureNumber;
  }

  public static fromLine(line: string): TileBuilder {
    let tileType = TileType.NORMAL;
    let xx = 0;
    let yy = 0;
    let treasureNumber = undefined;

    const [id, x, y, treasure] = line.split(' - ');
    if (id === 'M' && x && y) {
      tileType = TileType.MOUNTAIN;
      xx = parseInt(x);
      yy = parseInt(y);
    } else if (id === 'T' && x && y && treasure) {
      tileType = TileType.TREASURE;
      xx = parseInt(x);
      yy = parseInt(y);
      treasureNumber = parseInt(treasure);
    } else {
      throw new Error('Not a possible line to build a Tile');
    }

    return new TileBuilder(tileType, xx, yy, treasureNumber);
  }

  public static toLine(tile: Tile, x: number, y: number): string {
    let preLine = `${tile.identifier} - ${x} - ${y}`;
    if (tile.identifier === TileType.TREASURE) {
      preLine += ` - ${tile.treasureNumber || 0}`;
    }
    return preLine;
  }

  public toTile(): Tile {
    return {
      identifier: this.identifier,
      treasureNumber: this.treasureNumber,
    };
  }
}
