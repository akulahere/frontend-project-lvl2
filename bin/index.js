import fs from 'fs';
import path from 'path';
import JSON from 'JSON';
import _ from 'lodash';

const currentPath = process.cwd();

export const getAbsolutePath = (pathToFile) => path.resolve(currentPath, pathToFile);

const parseDiff = (obj1, obj2) => {
  const mergedObject = { ...obj1, ...obj2 };
  const result = Object.keys(mergedObject).map((key) => {
    if (!_.has(obj1, key)) {
      return ` + ${key}: ${obj2[key]}`;
    }
    if (!_.has(obj2, key)) {
      return ` - ${key}: ${obj1[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return ` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
    }
    return (`   ${key}: ${obj2[key]}`);
  }).join('\n');
  return `{\n${result}\n}`;
};

export const genDiff = (firstFilePath, secondFilePath) => {
  const first = JSON.parse(fs.readFileSync(getAbsolutePath(firstFilePath), 'utf-8'));
  const second = JSON.parse(fs.readFileSync(getAbsolutePath(secondFilePath), 'utf-8'));
  return parseDiff(first, second);
};
