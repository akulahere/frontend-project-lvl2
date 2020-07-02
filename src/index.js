import fs from 'fs';
import path from 'path';
import genDiff from './diffBuilder.js';
import render from './formaters/index.js';
import parse from './parsers.js';

const getFileContent = (filePath) => fs.readFileSync(filePath, 'utf8');
const getFileFormat = (filePath) => path.extname(filePath);

export default (path1, path2, outputFormat) => {
  const content1 = getFileContent(path1);
  const content2 = getFileContent(path2);
  const format1 = getFileFormat(path1);
  const format2 = getFileFormat(path2);
  const first = parse(content1, format1);
  const second = parse(content2, format2);
  return render(genDiff(first, second), outputFormat);
};
