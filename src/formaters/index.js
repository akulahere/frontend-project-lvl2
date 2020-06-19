import makePlain from './plain.js';
import makeStylish from './stylish.js';

const render = (diff, renderFormat) => {
  switch (String(renderFormat)) {
    case 'stylish':
      return makeStylish(diff);
    case 'plain':
      return makePlain(diff);
    default:
      throw new Error(`'${renderFormat}' is unsupported`);
  }
};

export default render;
