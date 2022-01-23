const { isStringArray, genIndent, tokenizeUwuSource } = require('../utils');
const LoopBoundaryMismatchError = require('../errors/loopBoundaryMismatch');
const WrongInputError = require('../errors/wrongInput');
const { isValidProgram } = require('../validation');

/**
 * Converts UwU source code to a C program.
 * @param {string} source UwU source code to convert.
 * @param {number} indentSize Indentation size (default = 1).
 * @param {string} indentChar Indentation character (default is tab).
 * @returns {string} Generated C code.
 * @throws {WrongInputError} Input must be a string or an array of strings.
 * @throws {LoopBoundaryMismatchError} Loop starts must have matching loop ends and vice versa.
 */
module.exports = function transpileToC(source, indentSize = 1, indentChar = '\t') {
  if (typeof source !== 'string' && !isStringArray(source)) {
    throw new WrongInputError('must be either string or array of strings');
  }

  const sourceArray = typeof source === 'string' ? tokenizeUwuSource(source) : source;
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  const outputCodeArray = [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '',
    'int main()',
    '{',
    `${genIndent(1, indentSize, indentChar)}char array[30000] = {0};`,
    `${genIndent(1, indentSize, indentChar)}char* ptr = array;`,
    `${genIndent(1, indentSize, indentChar)}int position = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case 'OwO':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position + 1 < 30000)`);
          outputCodeArray.push(`${indent}{`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}++position;`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}++ptr;`);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      case '°w°':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position - 1 >= 0)`);
          outputCodeArray.push(`${indent}{`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}--position;`);
          outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}--ptr;`);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      case 'UwU':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (*ptr < 255) ++*ptr;`);
        }
        break;

      case 'QwQ':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (*ptr > 0) --*ptr;`);
        }
        break;

      case '@w@':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}putchar(*ptr);`);
        }
        break;

      case '>w<':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}*ptr = (char)getchar();`);
        }
        break;

      case '~w~':
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}while (*ptr)`);
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
