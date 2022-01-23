module.exports = class WrongInputError extends Error {
  /**
   * WringInput Error contructor.
   * @param {string} message
   */
  constructor(message) {
    super(`Wrong input type:${message ? ` ${message}` : ''}`);
  }
};
