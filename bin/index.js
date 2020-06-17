import _ from 'lodash';
import parse from './parsers.js';

const parseDiff = (obj1, obj2) => {
  const mergedObject = { ...obj1, ...obj2 };
  console.log(mergedObject);
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

export default (firstFilePath, secondFilePath) => {
  const first = parse(firstFilePath);
  const second = parse(secondFilePath);
  return parseDiff(first, second);
};
