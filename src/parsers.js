import yaml from 'js-yaml';
import ini from 'ini';

const parseFunctions = {
  json: (content) => JSON.parse(content),
  yml: (content) => yaml.safeLoad(content),
  ini: (content) => ini.parse(content),
};

const parse = (fileContent, format) => parseFunctions[format](fileContent);

export default parse;
