import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};
const makePlain = (diff, path) => diff.flatMap((node) => {
  const fullPath = path ? `${path}.${node.name}` : `${node.name}`;
  const renderNode = (nodeStatus) => {
    const nodeByStatus = {
      added: () => `Property '${fullPath}' was added with value: ${stringify(node.newValue)}`,
      removed: () => `Property '${fullPath}' was removed`,
      modified: () => `Property '${fullPath}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`,
      nested: () => `${makePlain(node.children, fullPath)}`,
      unmodified: () => null,
    };
    return nodeByStatus[nodeStatus]();
  };
  return renderNode(node.status);
}).filter((obj) => obj).join('\n');

export default makePlain;
