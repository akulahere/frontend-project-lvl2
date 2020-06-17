import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (file) => {
  const fileContent = fs.readFileSync(file, 'utf8');
  const format = path.extname(file);
  let result;
  if (format === '.json') {
    result = JSON.parse(fileContent);
  }
  if (format === '.yml') {
    result = yaml.safeLoad(fileContent);
  }
  return result;
};

export default parser;