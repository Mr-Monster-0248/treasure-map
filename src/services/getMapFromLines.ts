import {TileType} from '../models/TileType.enum';
import {TreasureMap} from '../models/TreasureMap';
import MapBuilder from '../tools/MapBuilder';
import {TileBuilder} from '../tools/TileBuilder';

function isCommand(line: string): boolean {
  const char = line.charAt(0);
  switch (char) {
    case 'C':
    case TileType.MOUNTAIN:
    case TileType.TREASURE:
    case 'A':
    case '#':
      return true;
    default:
      return false;
  }
}

export function getMapFromLines(lines: string[]): TreasureMap {
  const map = new MapBuilder();

  for (let i = 0; i < lines.length; i++) {
    if (isCommand(lines[i])) {
      if (lines[i].charAt(0) === 'C') {
        map.setMap(lines[i]);
      } else if (lines[i].charAt(0) === 'M' || lines[i].charAt(0) === 'T') {
        map.tiles.push(TileBuilder.fromLine(lines[i]));
      }
    } else {
      throw new Error(`invalid char "${lines[i].charAt(0)}"`);
    }
  }

  return TreasureMap.fromMapBuilder(map);
}
