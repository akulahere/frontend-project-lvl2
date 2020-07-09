import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const inputFormats = ['json', 'ini', 'yml'];
const outputFormats = ['json', 'stylish', 'plain'];
let getExpectedResult;

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);

beforeAll(() => {
  getExpectedResult = (format) => fs.readFileSync(getFixturePath(`${format}ExpectedResult`), 'utf-8');
  return getExpectedResult;
});

describe.each(outputFormats)('%s', (outputFormat) => {
  test.each(inputFormats)('%s', (inputFormat) => {
    const file1 = getFixturePath(`before.${inputFormat}`);
    const file2 = getFixturePath(`after.${inputFormat}`);
    const actual = genDiff(file1, file2, outputFormat);
    expect(actual).toEqual(getExpectedResult(outputFormat));
  });
});
