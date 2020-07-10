import makePlain from './plain.js';
import makeStylish from './stylish.js';

const formatters = {
  stylish: (diff) => makeStylish(diff),
  plain: (diff) => makePlain(diff),
  json: (diff) => JSON.stringify(diff),
};

const render = (diff, renderFormat) => formatters[renderFormat](diff);

export default render;
