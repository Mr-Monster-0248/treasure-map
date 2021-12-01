import * as yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {exploreMap} from './services/exploreMap';

const args = yargs(hideBin(process.argv))
  .option('input', {
    alias: 'i',
    type: 'string',
    description: 'file to use as a treasure map',
    default: './data/input/defaultMap.txt',
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'file to write the result to',
    default: './data/output/defaultMap.txt',
  })
  .parseSync();

exploreMap(args.input, args.output);
