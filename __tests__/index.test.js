import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const formats = ['json'];

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);

const expectedResult = fs.readFileSync(getFixturePath('stylishExpectedResult'), 'utf-8');

test.each(formats)('%s', (format) => {
  const before = getFixturePath(`before.${format}`);
  const after = getFixturePath(`after.${format}`);
  const actual = genDiff(before, after, 'stylish');
  expect(actual).toEqual(expectedResult);
});
