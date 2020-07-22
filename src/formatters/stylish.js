import _ from 'lodash';

const baseIndent = '    ';
const makeIndent = (depth) => baseIndent.repeat(depth);

const formatValue = (value, depth) => {
  if (_.isObject(value)) {
    const indent = makeIndent(depth + 1);
    const result = _.map(_.entries(value), ([key, keyValue]) => `${indent}    ${key}: ${keyValue}`);
    return `{\n${result.join('\n')}\n${indent}}`;
  }
  return value;
};

const makeStylish = (diff, depth = 0) => {
  const indent = makeIndent(depth);
  const result = diff.map(({
    name, status, oldValue, value, newValue, children,
  }) => {
    switch (status) {
      case 'added':
        return `${indent}  + ${name}: ${formatValue(newValue, depth)}`;
      case 'removed':
        return `${indent}  - ${name}: ${formatValue(oldValue, depth)}`;
      case 'unmodified':
        return `${indent}    ${name}: ${formatValue(value, depth)}`;
      case 'modified':
        return `${indent}  + ${name}: ${formatValue(newValue, depth)}\n${indent}  - ${name}: ${formatValue(oldValue, depth)}`;
      case 'nested':
        return `${indent}    ${name}: ${makeStylish(children, depth + 1)}`;
      default:
        throw new Error(`${status} is incorrect status of the key: ${name}`);
    }
  });
  return `{\n${result.join('\n')}\n${indent}}`;
};

export default makeStylish;
