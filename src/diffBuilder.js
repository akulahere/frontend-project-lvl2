import _ from 'lodash';

const genDiff = (first, second) => {
  const mergedObject = _.union(Object.keys(first), Object.keys(second));
  const diff = mergedObject.map((key) => {
    const node = {
      name: key,
      oldValue: first[key],
      newValue: second[key],
    };
    if (!_.has(second, key)) {
      return { name: key, oldValue: first[key], status: 'removed' };
    }
    if (!_.has(first, key)) {
      return { name: key, newValue: second[key], status: 'added' };
    }
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return {
        name: key,
        status: 'nested',
        children: genDiff(first[key], second[key]),
      };
    }
    if (
      second[key] !== first[key]
    ) {
      return { ...node, status: 'modified' };
    }
    return { ...node, status: 'unmodified' };
  });
  return diff;
};

export default genDiff;
