import yaml from 'js-yaml';
import ini from 'ini';

const parser = (fileContent, format) => {
  let result;
  if (format === '.json') {
    result = JSON.parse(fileContent);
  }
  if (format === '.yml') {
    result = yaml.safeLoad(fileContent);
  }
  if (format === '.ini') {
    result = ini.parse(fileContent);
  }
  return result;
};

export default parser;
