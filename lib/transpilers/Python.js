const { isStringArray, genIndent, tokenizeUwuSource } = require('../utils');
const LoopBoundaryMismatchError = require('../errors/loopBoundaryMismatch');
const WrongInputError = require('../errors/wrongInput');
const { isValidProgram } = require('../validation');

/**
 * Converts UwU source code to a Python script.
 * @param {string} source UwU source code to convert.
 * @returns {string} Generated Python code.
 */
module.exports = function transpileToPython(source) {
  if (typeof source !== 'string' && !isStringArray(source)) {
    throw new WrongInputError('must be either string or array of strings');
  }

  const sourceArray = typeof source === 'string' ? tokenizeUwuSource(source) : source;
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  const indentSize = 4;
  const indentChar = ' ';

  const outputCodeArray = [
    'import sys',
    '',
    'cells = [0]',
    'position = 0',
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case 'OwO':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}if position + 1 == len(cells):`);
          outputCodeArray.push(`${indent}${genIndent(1, indentSize, indentChar)}cells.append(0)`);
          outputCodeArray.push(`${indent}`);
          outputCodeArray.push(`${indent}position += 1`);
        }
        break;

      case '°w°':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}position = position - 1 if position > 0 else position`);
        }
        break;

      case 'UwU':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells[position] = cells[position] + 1 if cells[position] < 255 else cells[position]`);
        }
        break;

      case 'QwQ':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells[position] = cells[position] - 1 if cells[position] > 0 else cells[position]`);
        }
        break;

      case '@w@':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}sys.stdout.write(chr(cells[position]))`);
          outputCodeArray.push(`${indent}sys.stdout.flush()`);
        }
        break;

      case '~w~':
        {
          const indent = genIndent(currentDepth, indentSize, indentChar);
          outputCodeArray.push(`${indent}while cells[position] > 0:`);
          currentDepth += 1;
        }
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
};
