const isInvalidFormat = value =>
  value === undefined ||
  value === null ||
  (typeof value !== 'string') ||
  (typeof value === 'string' && value.trim().length === 0);

module.exports = isInvalidFormat;