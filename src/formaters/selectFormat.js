import makeStylish from './stylish.js';

const render = (diff, renderFormat) => {
  console.log(diff);
  console.log(renderFormat.toLowerCase());
  switch (String(renderFormat)) {
    case 'stylish':
      return makeStylish(diff);
    default:
      throw new Error(`'${renderFormat}' is unsupported`);
  }
};

export default render;
