import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);
let expectedResult;

const inputFormats = ['json', 'ini', 'yml'];
const outputFormats = ['json', 'stylish', 'plain'];

beforeEach(() => {
  expectedResult = {
    json: fs.readFileSync(getFixturePath('jsonExpectedResult'), 'utf8'),
    plain: fs.readFileSync(getFixturePath('plainExpectedResult'), 'utf8'),
    stylish: fs.readFileSync(getFixturePath('stylishExpectedResult'), 'utf8'),
  };
});

describe.each(outputFormats)('%s', (outputFormat) => {
  test.each(inputFormats)('%s', (inputFormat) => {
    const file1 = getFixturePath(`file1.${inputFormat}`);
    const file2 = getFixturePath(`file2.${inputFormat}`);
    const actual = genDiff(file1, file2, outputFormat);
    expect(actual).toEqual(expectedResult[outputFormat]);
  });
});
