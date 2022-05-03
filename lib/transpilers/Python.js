const { genIndent, tokenizeUwuSource } = require('../utils');
const LoopBoundaryMismatchError = require('../errors/loopBoundaryMismatch');
const WrongInputError = require('../errors/wrongInput');
const { isValidProgram } = require('../validation');

/**
 * Converts UwU source code to a Python script.
 * @param {string} source UwU source code to convert.
 * @param {boolean} useDynamicMemory
 * @returns {string} Generated Python code.
 * @throws {WrongInputError} Input must be a string.
 * @throws {LoopBoundaryMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToPython(source, useDynamicMemory = true) {
  if (typeof source !== 'string') {
    throw new WrongInputError('Input must be a string');
  }

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

  if (useDynamicMemory) {
    outputCodeArray.push('cells = [0]');
    outputCodeArray.push('');
  } else {
    outputCodeArray.push('cells = [0] * 30000');
    outputCodeArray.push('');
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    const indent = genIndent(currentDepth, indentSize, indentChar);

    switch (command) {
      case 'OwO':
        if (useDynamicMemory) {
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

      case '~w~':
        outputCodeArray.push(`${indent}while cells[position] > 0:`);
        currentDepth += 1;
        break;

      case '¯w¯':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        outputCodeArray.push('');
        break;

      default:
    }
  });

  outputCodeArray.push('\n');

  return outputCodeArray.join('\n');
}

module.exports = transpileToPython;
