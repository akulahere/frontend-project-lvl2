import makePlain from './plain.js';
import makeStylish from './stylish.js';
import makeJson from './json.js';

const render = (diff, renderFormat) => {
  switch (String(renderFormat)) {
    case 'stylish':
      return makeStylish(diff);
    case 'plain':
      return makePlain(diff);
    case 'json':
      return makeJson(diff);
    default:
      throw new Error(`'${renderFormat}' is unsupported`);
  }
};

export default render;
