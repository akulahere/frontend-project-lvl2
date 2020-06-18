import _ from 'lodash';

const genDiff = (first, second) => {
  const mergedObject = { ...first, ...second };
  const diff = Object.keys(mergedObject).map((key) => {
    const node = {
      name: key,
      oldValue: first[key],
      newValue: second[key],
    };
    if (!_.has(second, key)) return { ...node, status: 'removed' };
    if (!_.has(first, key)) return { ...node, status: 'added' };
    if (_.isObject(first[key]) && _.isObject(second[key])) {
      return {
        name: key,
        status: 'hasChildren',
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
