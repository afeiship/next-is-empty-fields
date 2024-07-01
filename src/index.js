import nx from '@jswork/next';

const defaults = {
  isEmpty: (value) => value === null || value === ''
};

nx.isEmptyFields = function (inValues, inOptions = {}) {
  const { isEmpty } = nx.mix(null, defaults, inOptions);
  if (Array.isArray(inValues)) return inValues.every(nx.isEmptyFields);

  return Object.values(inValues).every((value) => {
    const isArr = Array.isArray(value);
    const isObj = value && typeof value === 'object';
    if (isArr) return nx.isEmptyFields(value);
    if (isObj) {
      return Object.values(value).every(isEmpty);
    }
    return isEmpty(value);
  });
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.isEmptyFields;
}

export default nx.isEmptyFields;
