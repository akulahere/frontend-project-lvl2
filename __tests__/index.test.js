import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const extensions = ['json', 'ini', 'yml'];
// const formats = ['json', 'stylish', 'plain'];

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);

const expectedResult = (format) => fs.readFileSync(getFixturePath(`${format}ExpectedResult`), 'utf-8');

test.each(extensions)('Stylish %s', (extension) => {
  const before = getFixturePath(`before.${extension}`);
  const after = getFixturePath(`after.${extension}`);
  const actual = genDiff(before, after, 'stylish');
  expect(actual).toEqual(expectedResult('stylish'));
});

test.each(extensions)('Plain %s', (extension) => {
  const before = getFixturePath(`before.${extension}`);
  const after = getFixturePath(`after.${extension}`);
  const actual = genDiff(before, after, 'plain');
  expect(actual).toEqual(expectedResult('plain'));
});

test.each(extensions)('Json %s', (extension) => {
  const before = getFixturePath(`before.${extension}`);
  const after = getFixturePath(`after.${extension}`);
  const actual = genDiff(before, after, 'json');
  expect(actual).toEqual(expectedResult('json'));
});
