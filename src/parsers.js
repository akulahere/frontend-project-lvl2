import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (content, format) => {
  if (format in parsers) {
    return parsers[format](content);
  }
  throw new Error('Unknown parser');
};

export default parse;
