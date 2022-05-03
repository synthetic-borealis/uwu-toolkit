const { genIndent, tokenizeUwuSource } = require('../utils');
const LoopBoundaryMismatchError = require('../errors/loopBoundaryMismatch');
const WrongInputError = require('../errors/wrongInput');
const { isValidProgram } = require('../validation');

/**
 * Converts UwU source code to a C program.
 * @param {string} source UwU source code to convert.
 * @param {number} indentSize Indentation size (default = 1).
 * @param {string} indentChar Indentation character (default is tab).
 * @returns {string} Generated C code.
 * @throws {WrongInputError} Input must be a string.
 * @throws {LoopBoundaryMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToC(source, indentSize = 1, indentChar = '\t') {
  if (typeof source !== 'string') {
    throw new WrongInputError('Input must be a string');
  }

  const sourceArray = tokenizeUwuSource(source);
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    '#include <stdio.h>',
    '#include <stdlib.h>',
    '',
    'int main()',
    '{',
    `${indent}char array[30000] = {0};`,
    `${indent}char* ptr = array;`,
    `${indent}int position = 0;`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);

    switch (command) {
      case 'OwO':
        outputCodeArray.push(`${indent}if (position + 1 < 30000)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}++position;`);
        outputCodeArray.push(`${indent + genIndent(1, indentSize, indentChar)}++ptr;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '°w°':
        outputCodeArray.push(`${indent}if (position - 1 >= 0)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--position;`);
        outputCodeArray.push(`${indent}--ptr;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case 'UwU':
        outputCodeArray.push(`${indent}if (*ptr < 255)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}++*ptr;`);
        break;

      case 'QwQ':
        outputCodeArray.push(`${indent}if (*ptr > 0)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--*ptr;`);
        break;

      case '@w@':
        outputCodeArray.push(`${indent}putchar(*ptr);`);
        break;

      case '>w<':
        outputCodeArray.push(`${indent}*ptr = (char)getchar();`);
        break;

      case '~w~':
        outputCodeArray.push(`${indent}while (*ptr)`);
        outputCodeArray.push(`${indent}{`);
        currentDepth += 1;
        break;

      case '¯w¯':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        outputCodeArray.push('');
        break;

      default:
    }
  });

  outputCodeArray.push('\n}\n');

  return outputCodeArray.join('\n');
}

module.exports = transpileToC;
