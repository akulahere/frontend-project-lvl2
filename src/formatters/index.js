import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const formatters = {
  stylish: (diff) => makeStylish(diff),
  plain: (diff) => makePlain(diff),
  json: (diff) => makeJson(diff),
};

const render = (diff, renderFormat) => formatters[renderFormat](diff);

export default render;
