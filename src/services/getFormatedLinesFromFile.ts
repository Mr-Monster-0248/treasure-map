import * as fs from 'fs';

export default function getFormatedLinesFromFile(
  filepath: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) reject(err);
      else {
        const lines = data
          .toString()
          .split(/\r?\n/)
          .filter(line => line !== '');

        resolve(lines);
      }
    });
  });
}
