import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const inputFormats = ['json', 'ini', 'yml'];
const formats = ['json', 'stylish', 'plain'];

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);

const getExpectedResult = (format) => fs.readFileSync(getFixturePath(`${format}ExpectedResult`), 'utf-8');

describe.each(formats)('%s', (format) => {
  test.each(inputFormats)('%s', (inputFormat) => {
    const before = getFixturePath(`before.${inputFormat}`);
    const after = getFixturePath(`after.${inputFormat}`);
    const actual = genDiff(before, after, format);
    expect(actual).toEqual(getExpectedResult(format));
  });
});
