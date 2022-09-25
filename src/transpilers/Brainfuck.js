const { isStringArray, tokenizeUwuSource } = require('../utils');
const LoopBoundaryMismatchError = require('../errors/loopBoundaryMismatch');
const WrongInputError = require('../errors/wrongInput');
const { isValidProgram } = require('../validation');

/**
 * Converts UwU source code to Brainfuck.
 * @param {string} source UwU source code to convert.
 * @returns {string} Generated Brainfuck code.
 * @throws {WrongInputError} Input must be a string or an array of strings.
 * @throws {LoopBoundaryMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToBrainfuck(source) {
  if (typeof source !== 'string' && !isStringArray(source)) {
    throw new WrongInputError('must be either string or array of strings');
  }

  const sourceArray = typeof source === 'string' ? tokenizeUwuSource(source) : source;
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  return sourceArray.map((value) => {
    switch (value) {
      case 'OwO':
        return '>';

      case '°w°':
        return '<';

      case 'UwU':
        return '+';

      case 'QwQ':
        return '-';

      case '@w@':
        return '.';

      case '>w<':
        return ',';

      case '~w~':
        return '[';

      case '¯w¯':
        return ']';

      default:
        return '';
    }
  }).join('');
}

module.exports = transpileToBrainfuck;
