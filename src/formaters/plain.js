import _ from 'lodash';

const stringify = (value) => (!_.isObject(value) ? value : '[complex value]');

const makePlain = (diff, path) => {
  const result = diff.map((key) => {
    const {
      name, status, oldValue, newValue, children,
    } = key;
    const fullPath = path ? `${path}.${name}` : `${name}`;
    switch (status) {
      case 'added':
        return `Property '${fullPath}' was added with value: '${stringify(newValue)}'`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'modified':
        return `Property '${fullPath}' was updated. From '${stringify(oldValue)}' to '${stringify(newValue)}'`;
      case 'nested':
        return `${makePlain(children, fullPath)}`;
      case 'unmodified':
        return null;
      default:
        throw new Error(`${status} is incorrect status of the key: ${name}`);
    }
  }).filter((obj) => obj);
  return result.join('\n');
};

export default makePlain;
