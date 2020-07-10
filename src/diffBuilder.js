import _ from 'lodash';

const genDiff = (first, second) => {
  const keys = _.union(_.keys(first), _.keys(second));
  const diff = keys.map((key) => {
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
    if (second[key] !== first[key]) {
      return {
        name: key, oldValue: first[key], newValue: second[key], status: 'modified',
      };
    }
    return { name: key, value: first[key], status: 'unmodified' };
  });
  return diff;
};

export default genDiff;
