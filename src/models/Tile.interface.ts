import {TileType} from './TileType.enum';

export interface Tile {
  identifier: TileType;
  treasureNumber?: number;
}
