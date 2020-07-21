import _ from 'lodash';

const baseIndent = '    ';
const makeIndent = (depth) => baseIndent.repeat(depth);

const formatValue = (value, depth) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  const indent = makeIndent(depth + 1);
  const result = Object.entries(value)
    .map(([key, keyValue]) => {
      const calcValue = _.isObject(keyValue) ? formatValue(keyValue, depth + 1) : keyValue;
      return `${indent}    ${key}: ${calcValue}`;
    });
  return `{\n${result.join('\n')}\n${indent}}`;
};

const makeStylish = (diff) => {
  const render = (tree, depth) => tree.flatMap(({
    name, status, oldValue, value, newValue, children,
  }) => {
    const indent = makeIndent(depth);
    switch (status) {
      case 'added':
        return `${indent}  + ${name}: ${formatValue(newValue, depth)}`;
      case 'removed':
        return `${indent}  - ${name}: ${formatValue(oldValue, depth)}`;
      case 'unmodified':
        return `${indent}    ${name}: ${formatValue(value, depth)}`;
      case 'modified':
        return [`${indent}  + ${name}: ${formatValue(newValue, depth)}`, `${indent}  - ${name}: ${formatValue(oldValue, depth)}`];
      case 'nested':
        return `${indent}    ${name}: ${render(children, depth + 1)}`;
      default:
        throw new Error(`${status} is incorrect status of the key: ${name}`);
    }
  });
  return `{\n${render(diff, 0).join('\n')}\n${makeIndent(0)}}`;
};

export default makeStylish;
