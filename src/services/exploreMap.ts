import {Adventurer} from '../models/Adventurer';
import {TreasureMap} from '../models/TreasureMap';
import {exportMap} from './exportMap';
import getFormatedLinesFromFile from './getFormatedLinesFromFile';

export async function exploreMap(inputPath: string, outputPath: string) {
  const fileLines = await getFormatedLinesFromFile(inputPath);

  const map = TreasureMap.fromFileLines(fileLines);
  const adventurerLines = fileLines.filter(line => line.charAt(0) === 'A');
  const adventurers = adventurerLines.map(Adventurer.fromLine);

  while (adventurers.map(a => a.hasMoves()).includes(true)) {
    adventurers.forEach(adventurer => {
      if (adventurer.hasMoves()) {
        const nextPosition = adventurer.getNextPos();
        const nextTile = map.tileAt(nextPosition.x, nextPosition.y);

        const changedTile = adventurer.move(nextTile);

        if (changedTile) map.addTile(changedTile);
      }
    });
  }

  adventurers.forEach(adventurer => {
    console.log(`${adventurer.name} found ${adventurer.treasure}`);
  });

  exportMap(outputPath, map, adventurers);
}
