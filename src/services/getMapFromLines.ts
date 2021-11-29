import {TreasureMap} from '../models/TreasureMap';
import MapBuilder from '../tools/MapBuilder';
import {TileBuilder} from '../tools/TileBuilder';

function isCommand(line: string): boolean {
  const char = line.charAt(0);
  if (char === 'C') return true;
  else if (char === 'M') return true;
  else if (char === 'T') return true;
  else if (char === 'A') return true;
  else if (char === '#') return true;
  else return false;
}

export function getMapFromLines(lines: string[]): TreasureMap {
  const map = new MapBuilder();

  for (let i = 0; i < lines.length; i++) {
    if (isCommand(lines[i])) {
      switch (lines[i]) {
        case 'C':
          map.setMap(lines[i]);
          break;
        case 'M':
        case 'T':
          map.tiles.push(TileBuilder.fromLine(lines[i]));
          break;
        case 'A':
        case '#':
          break;
        default:
          throw new Error('Unsupported identifier');
      }
    } else {
      throw new Error(`invalid char ${lines[i]}`);
    }
  }

  return TreasureMap.fromMapBuilder(map);
}
