import genDiff from './diffBuilder.js';
import render from './formaters/selectFormat.js';
import parse from './parsers.js';

export default (firstFilePath, secondFilePath, formatOfRender) => {
  const first = parse(firstFilePath);
  const second = parse(secondFilePath);
  return render(genDiff(first, second), formatOfRender);
};
