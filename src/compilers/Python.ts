import genIndent from '../utils/genIndent';
import tokenizeUwuSource from '../utils/tokenizeUwuSource';
import LoopBoundaryMismatchError from '../errors/loopBoundaryMismatchError';
import isValidProgram from '../utils/isValidProgram';

/**
 * Converts an UwU program to a Python.
 * @category Compilation
 * @param {string} source UwU source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @returns {string} Generated Python code.
 * @throws {LoopBoundaryMismatchError} if mismatching loop boundaries are detected.
 */
function compileToPython(source: string, isMemoryDynamic = true) {
  const sourceArray = tokenizeUwuSource(source);
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  const indentSize = 4;
  const indentChar = ' ';

  const outputCodeArray = [
    'import sys',
    '',
    'position = 0',
  ];

  if (isMemoryDynamic) {
    outputCodeArray.push('cells = bytearray([0])');
    outputCodeArray.push('');
  } else {
    outputCodeArray.push('cells = bytearray([0] * 30000)');
    outputCodeArray.push('');
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    const indent = genIndent(currentDepth, indentSize, indentChar);

    switch (command) {
      case 'OwO':
        if (isMemoryDynamic) {
          outputCodeArray.push(`${indent}if position + 1 == len(cells):`);
          outputCodeArray.push(`${indent}${genIndent(1, indentSize, indentChar)}cells.append(0)`);
          outputCodeArray.push(`${indent}`);
          outputCodeArray.push(`${indent}position += 1`);
        } else {
          outputCodeArray.push(`${indent}if position + 1 < len(cells):`);
          outputCodeArray.push(`${indent}${genIndent(1, indentSize, indentChar)}position += 1`);
        }
        break;

      case '°w°':
        outputCodeArray.push(`${indent}position = position - 1 if position > 0 else position`);
        break;

      case 'UwU':
        outputCodeArray.push(`${indent}cells[position] = cells[position] + 1 if cells[position] < 255 else cells[position]`);
        break;

      case 'QwQ':
        outputCodeArray.push(`${indent}cells[position] = cells[position] - 1 if cells[position] > 0 else cells[position]`);
        break;

      case '@w@':
        outputCodeArray.push(`${indent}sys.stdout.write(chr(cells[position]))`);
        outputCodeArray.push(`${indent}sys.stdout.flush()`);
        break;

      case '>w<':
        outputCodeArray.push(`${indent}cells[position] = ord(sys.stdin.read(1))`);
        outputCodeArray.push(`${indent}sys.stdout.flush()`);
        break;

      case '~w~':
        outputCodeArray.push(`${indent}while cells[position] > 0:`);
        currentDepth += 1;
        break;

      case '¯w¯':
        currentDepth = Math.max(currentDepth - 1, 0);
        outputCodeArray.push('');
        break;

      // skip default case
    }
  });

  outputCodeArray.push('\n');

  return outputCodeArray.join('\n');
}

export default compileToPython;
