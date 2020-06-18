import _ from 'lodash';

const makeSpaces = (depth) => '    '.repeat(depth);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const blank = makeSpaces(depth + 1);
  const result = Object.entries(value)
    .map(([key, keyValue]) => {
      const calcValue = _.isObject(keyValue) ? formatValue(keyValue, depth + 1) : keyValue;
      return `${blank}    ${key}: ${calcValue}`;
    });
  return `{\n${result.join('\n')}\n${blank}}`;
};

const makeStylish = (diff, depth = 0) => {
  const blank = makeSpaces(depth);
  const result = diff.map(({
    name, status, oldValue, newValue, children,
  }) => {
    switch (status) {
      case 'added':
        return `${blank}  + ${name}: ${formatValue(newValue, depth)}`;
      case 'removed':
        return `${blank}  - ${name}: ${formatValue(oldValue, depth)}`;
      case 'unmodified':
        return `${blank}    ${name}: ${formatValue(oldValue, depth)}`;
      case 'modified':
        return `${blank}  + ${name}: ${formatValue(newValue, depth)}\n${blank}  - ${name}: ${formatValue(oldValue, depth)}`;
      case 'hasChildren':
        return `${blank}    ${name}: ${makeStylish(children, depth + 1)}`;
      default:
        throw new Error(`${status} is incorrect status of the key: ${name}`);
    }
  });
  return `{\n${result.join('\n')}\n${blank}}`;
};

export default makeStylish;
