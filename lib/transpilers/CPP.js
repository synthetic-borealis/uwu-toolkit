const { isStringArray, genIndent, tokenizeUwuSource } = require('../utils');
const LoopBoundaryMismatchError = require('../errors/loopBoundaryMismatch');
const WrongInputError = require('../errors/wrongInput');
const { isValidProgram } = require('../validation');

/**
 * Converts UwU source code to a C++ program.
 * @param {string} source UwU source code to convert.
 * @param {number} indentSize Indentation size (default = 1).
 * @param {string} indentChar Indentation character (default is tab).
 * @returns {string} Generated C++ code.
 */
module.exports = function transpileToCpp(source, indentSize = 1, indentChar = '\t') {
  if (typeof source !== 'string' && !isStringArray(source)) {
    throw new WrongInputError('must be either string or array of strings');
  }

  const sourceArray = typeof source === 'string' ? tokenizeUwuSource(source) : source;
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  const outputCodeArray = [
    '#include <iostream>',
    '#include <cstdio>',
    '#include <vector>',
    '',
    'auto main() -> int',
    '{',
    `${genIndent(1, indentSize, indentChar)}std::vector<char> cells { 0 };`,
    `${genIndent(1, indentSize, indentChar)}int position = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case 'OwO':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position + 1 == cells.size()) cells.push_back(0);`);
          outputCodeArray.push(`${indent}++position;`);
        }
        break;

      case '°w°':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position - 1 >= 0) --position;`);
        }
        break;

      case 'UwU':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (cells[position] < 255) ++cells[position];`);
        }
        break;

      case 'QwQ':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (cells[position] > 0) --cells[position];`);
        }
        break;

      case '@w@':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}std::cout << cells[position];`);
        }
        break;

      case '>w<':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells[position] = std::getchar();`);
        }
        break;

      case '~w~':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}while (cells[position] > 0)`);
          outputCodeArray.push(`${indent}{`);
          currentDepth += 1;
        }
        break;

      case '¯w¯':
        {
          currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
          outputCodeArray.push('');
        }
        break;

      default:
    }
  });

  outputCodeArray.push('\n}\n');

  return outputCodeArray.join('\n');
};
