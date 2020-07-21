#!/usr/bin/env node
import cli from 'commander';
import genDiff from '../src/index.js';

cli
  .version('0.2.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format: [stylish]', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, cli.format);
    console.log(diff);
  });

cli.parse(process.argv);
