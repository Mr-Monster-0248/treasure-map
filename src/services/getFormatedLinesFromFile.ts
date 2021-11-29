import * as fs from 'fs';
import path = require('path');

export default function getFormatedLinesFromFile(
  filepath: string
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filepath), (err, data) => {
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
