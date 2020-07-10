import fs from 'fs';
import path from 'path';
import genDiff from './diffBuilder.js';
import render from './formatters/index.js';
import parse from './parsers.js';

const getFileFormat = (filePath) => path.extname(filePath).substr(1);

export default (path1, path2, outputFormat) => {
  const content1 = fs.readFileSync(path1, 'utf8');
  const content2 = fs.readFileSync(path2, 'utf8');

  const format1 = getFileFormat(path1);
  const format2 = getFileFormat(path2);

  const first = parse(content1, format1);
  const second = parse(content2, format2);
  return render(genDiff(first, second), outputFormat);
};
