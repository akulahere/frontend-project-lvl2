#!/usr/bin/env node
import cli from 'commander';
import { genDiff } from './index.js';

cli
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

cli.parse(process.argv);
