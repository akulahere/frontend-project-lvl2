import yaml from 'js-yaml';
import ini from 'ini';

const parseIni = (content) => {
  const parseContent = ini.parse(content);
  const contentConverted = JSON.stringify(parseContent, (key, value) => {
    const valueConvert = parseFloat(value);
    if (!Number.isNaN(valueConvert)) {
      return valueConvert;
    }
    return value;
  });
  return JSON.parse(contentConverted);
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
