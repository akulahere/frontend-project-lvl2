import fs from 'fs';
import path from 'path';
import genDiff from '../bin';

const formats = ['json', 'yml', 'ini'];

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);

const expectedResult = fs.readFileSync(getFixturePath('expectedResult'), 'utf-8');

test.each(formats)('%s', (format) => {
  const before = getFixturePath(`before.${format}`);
  const after = getFixturePath(`after.${format}`);
  const actual = genDiff(before, after);
  expect(actual).toEqual(expectedResult);
});
