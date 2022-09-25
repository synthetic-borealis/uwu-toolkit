import tokenizeUwuSource from '../utils/tokenizeUwuSource.ts';
import LoopBoundaryMismatchError from '../errors/loopBoundaryMismatchError.ts';
import isValidProgram from '../utils/isValidProgram.ts';

/**
 * Converts UwU source code to Brainfuck.
 * @category Compilation
 * @param {string} source UwU source code to convert.
 * @returns {string} Generated Brainfuck code.
 * @throws {LoopBoundaryMismatchError} if mismatching loop boundaries are detected.
 */
function compileToBrainfuck(source: string) {
  const sourceArray = tokenizeUwuSource(source);
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }
  let output = '';

  sourceArray.forEach((value) => {
    switch (value) {
      case 'OwO':
        output += '>';
        break;

      case '°w°':
        output += '<';
        break;

      case 'UwU':
        output += '+';
        break;

      case 'QwQ':
        output += '-';
        break;

      case '@w@':
        output += '.';
        break;

      case '>w<':
        output += ',';
        break;

      case '~w~':
        output += '[';
        break;

      case '¯w¯':
        output += ']';
        break;

      // skip default case
    }
  });
  return output;
}

export default compileToBrainfuck;
