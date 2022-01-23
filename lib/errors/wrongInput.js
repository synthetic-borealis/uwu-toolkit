module.exports = class WrongError extends Error {
  constructor(message) {
    super(`Wrong input type:${message ? ` ${message}` : ''}`);
  }
};
