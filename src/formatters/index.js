import makePlain from './plain.js';
import makeStylish from './stylish.js';

const formatters = {
  stylish: makeStylish,
  plain: makePlain,
  json: JSON.stringify,
};

const render = (diff, renderFormat) => {
  if (renderFormat in formatters) {
    return formatters[renderFormat](diff);
  }
  throw new Error('Unknown parser');
};

export default render;
