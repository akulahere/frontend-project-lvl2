import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (content) => {
  const parseContent = ini.parse(content);
  const convertNumbers = (object) => _.mapValues(object, (value) => {
    if (_.isObject(value)) {
      return convertNumbers(value);
    }
    const numberValue = parseFloat(value);
    if (!Number.isNaN(numberValue)) {
      return numberValue;
    }
    return value;
  });
  return convertNumbers(parseContent);
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: parseIni,
};

const parse = (content, format) => {
  if (format in parsers) {
    return parsers[format](content);
  }
  throw new Error('Unknown parser');
};

export default parse;
