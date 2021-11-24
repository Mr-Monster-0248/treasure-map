import {Tile} from './Tile.interface';
import {TileType} from './TileType.enum';

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
    // TODO: from line function
    return new TileBuilder(TileType.NORMAL, 1, 1);
  }

  public toTile(): Tile {
    return {
      identifier: this.identifier,
      treasureNumber: this.treasureNumber,
    };
  }
}
