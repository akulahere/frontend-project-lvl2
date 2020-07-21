import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const makePlain = (diff) => {
  const render = (tree, path) => tree.flatMap((node) => {
    const fullPath = path ? `${path}.${node.name}` : `${node.name}`;
    switch (node.status) {
      case 'added':
        return `Property '${fullPath}' was added with value: ${stringify(node.newValue)}`;
      case 'removed':
        return `Property '${fullPath}' was removed`;
      case 'modified':
        return `Property '${fullPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return render(node.children, fullPath);
      case 'unmodified':
        return [];
      default:
        throw new Error('Unknown status');
    }
  }).filter((obj) => obj).join('\n');
  return render(diff);
};

export default makePlain;
