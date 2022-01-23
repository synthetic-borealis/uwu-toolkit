class WrongInputError extends Error {
  /**
   * WrongInput Error contructor.
   * @param {string} message
   */
  constructor(message) {
    super(`Wrong input type:${message ? ` ${message}` : ''}`);
  }
}

module.exports = WrongInputError;
