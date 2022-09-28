import genIndent from '../utils/genIndent';
import tokenizeUwuSource from '../utils/tokenizeUwuSource';
import LoopBoundaryMismatchError from '../errors/loopBoundaryMismatchError';
import isValidProgram from '../utils/isValidProgram';

/**
 * Converts UwU source code to a C program.
 * @category Compilation
 * @param {string} source UwU source code to convert.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated C code.
 * @throws {LoopBoundaryMismatchError} if mismatching loop boundaries are detected.
 */
function compileToC(source: string, indentSize = 4, indentChar = ' ') {
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
    `${indent}unsigned char cells[30000] = {0};`,
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
        outputCodeArray.push(`${indent}++position;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '°w°':
        outputCodeArray.push(`${indent}if (position - 1 >= 0)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--position;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case 'UwU':
        outputCodeArray.push(`${indent}if (cells[position] < 255)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[position] += 1;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case 'QwQ':
        outputCodeArray.push(`${indent}if (cells[position] > 0)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}cells[position] -= 1;`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '@w@':
        outputCodeArray.push(`${indent}putchar(cells[position]);`);
        break;

      case '>w<':
        outputCodeArray.push(`${indent}cells[position] = (unsigned char)getchar();`);
        break;

      case '~w~':
        outputCodeArray.push(`${indent}while (cells[position] > 0)`);
        outputCodeArray.push(`${indent}{`);
        currentDepth += 1;
        break;

      case '¯w¯':
        currentDepth = Math.max(currentDepth - 1, 0);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        outputCodeArray.push('');
        break;

      // skip default case
    }
  });

  outputCodeArray.push('\n}\n');

  return outputCodeArray.join('\n');
}

export default compileToC;
