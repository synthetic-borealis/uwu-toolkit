import tokenizeUwuSource from '../utils/tokenizeUwuSource';
import LoopBoundaryMismatchError from '../errors/loopBoundaryMismatchError';
import isValidProgram from '../utils/isValidProgram';

/**
 * Converts UwU source code to Brainfuck.
 * @param {string} source UwU source code to convert.
 * @returns {string} Generated Brainfuck code.
 * @throws {LoopBoundaryMismatchError} when mismatching loop boundaries are detected.
 */
function compileToBrainfuck(source: string): string {
  const sourceArray = tokenizeUwuSource(source);
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

export default compileToBrainfuck;
