import genIndent from '../utils/genIndent';
import tokenizeUwuSource from '../utils/tokenizeUwuSource';
import LoopBoundaryMismatchError from '../errors/loopBoundaryMismatchError';
import isValidProgram from '../utils/isValidProgram';

/**
 * Converts UwU source code to a C++ program.
 * @category Compilation
 * @param {string} source UwU source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated C++ code.
 * @throws {LoopBoundaryMismatchError} if mismatching loop boundaries are detected.
 */
function compileToCpp(source: string, isMemoryDynamic = true, indentSize = 4, indentChar = ' ') {
  const sourceArray = tokenizeUwuSource(source);
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    '#include <iostream>',
    '#include <cstdio>',
    '#include <vector>',
    '',
    'auto main() -> int',
    '{',
    `${indent}int position = 0;`,
  ];

  if (isMemoryDynamic) {
    outputCodeArray.push(`${indent}std::vector<char> cells { 0 };\n`);
  } else {
    outputCodeArray.push(`${indent}std::vector<char> cells { std::vector<char>(30000) };\n`);
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case 'OwO':
        if (isMemoryDynamic) {
          outputCodeArray.push(`${indent}if (position + 1 == cells.size())`);
          outputCodeArray.push(`${indent}{`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells.push_back(0);`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
          outputCodeArray.push(`${indent}++position;`);
        } else {
          outputCodeArray.push(`${indent}if (position + 1 < cells.size())`);
          outputCodeArray.push(`${indent}{`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}++position;`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
        }
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
        outputCodeArray.push(`${indent}++cells[position];`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case 'QwQ':
        outputCodeArray.push(`${indent}if (cells[position] > 0)`);
        outputCodeArray.push(`${indent}{`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--cells[position];`);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      case '@w@':
        outputCodeArray.push(`${indent}std::cout << cells[position];`);
        break;

      case '>w<':
        outputCodeArray.push(`${indent}cells[position] = std::getchar();`);
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

export default compileToCpp;
