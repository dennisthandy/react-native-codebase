export const generateUniqeId = (prefix = 'portal') => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};
