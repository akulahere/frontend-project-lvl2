import { describe, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../bin';

const getFixturePath = (filename) => path.join('__tests__', '__fixtures__', filename);

describe('genDiff json', () => {
  test('get the difference', () => {
    const firstFilePath = getFixturePath('before.json');
    const secondFilePath = getFixturePath('after.json');
    const actualResult = genDiff(firstFilePath, secondFilePath);
    const expectedResult = fs.readFileSync(getFixturePath('expectedResult'), 'utf-8');
    expect(actualResult).toBe(expectedResult);
  });
});
describe('genDiff yml', () => {
  test('get the difference', () => {
    const firstFilePath = getFixturePath('before.yml');
    const secondFilePath = getFixturePath('after.yml');
    const actualResult = genDiff(firstFilePath, secondFilePath);
    const expectedResult = fs.readFileSync(getFixturePath('expectedResult'), 'utf-8');
    expect(actualResult).toBe(expectedResult);
  });
});
