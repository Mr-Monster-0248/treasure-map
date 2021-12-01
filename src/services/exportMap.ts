import * as fs from 'fs';
import {Adventurer} from '../models/Adventurer';
import {TreasureMap} from '../models/TreasureMap';

export function exportMap(
  filepath: string,
  map: TreasureMap,
  adventurers: Adventurer[]
) {
  const fileData = map.toFileLines();
  adventurers.forEach(adventurer => {
    fileData.push(adventurer.toLine());
  });

  const data = fileData.join('\n');
  fs.writeFile(filepath, data, console.error);
}
