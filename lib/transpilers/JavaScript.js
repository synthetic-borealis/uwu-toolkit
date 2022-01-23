const { isStringArray, genIndent, tokenizeUwuSource } = require('../utils');
const LoopBoundaryMismatchError = require('../errors/loopBoundaryMismatch');
const WrongInputError = require('../errors/wrongInput');
const { isValidProgram } = require('../validation');

/**
 * Converts UwU source code to a JavaScript function.
 * @param {string} source UwU source code to convert.
 * @param {string} funcName Output function name (default = 'run').
 * @param {number} indentSize Indentation size (default = 4).
 * @param {string} indentChar Indentation character (default is space).
 * @returns {string} Generated JavaScript function source.
 * @throws {WrongInputError} Input must be a string or an array of strings.
 * @throws {LoopBoundaryMismatchError} Loop starts must have matching loop ends and vice versa.
 */
function transpileToJavaScript(source, funcName = 'run', indentSize = 2, indentChar = ' ') {
  if (typeof source !== 'string' && !isStringArray(source)) {
    throw new WrongInputError('must be either string or array of strings');
  }

  const sourceArray = typeof source === 'string' ? tokenizeUwuSource(source) : source;
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  const outputCodeArray = [
    `function ${funcName}() {`,
    `${genIndent(1, indentSize, indentChar)}var cells = [0];`,
    `${genIndent(1, indentSize, indentChar)}var position = 0;`,
    `${genIndent(1, indentSize, indentChar)}var output = '';`,
    '',
  ];

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    switch (command) {
      case 'OwO': // >
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position + 1 === cells.length) cells.push(0);`);
          outputCodeArray.push(`${indent}++position;`);
        }
        break;

      case '°w°': // <
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (position > 0) --position;`);
        }
        break;

      case 'UwU': // +
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (cells[position] < 255) ++cells[position];`);
        }
        break;

      case 'QwQ': // -
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}if (cells[position] > 0) --cells[position];`);
        }
        break;

      case '@w@': // .
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}output += String.fromCharCode(cells[position]);`);
        }
        break;

      case '~w~': // [
        {
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}while (cells[position] > 0) {`);
          currentDepth += 1;
        }
        break;

      case '¯w¯': // ]
        {
          currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
          const indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push(`${indent}}`);
        }
        break;

      default:
    }
  });

  outputCodeArray.push('');
  outputCodeArray.push(`${genIndent(1, indentSize, indentChar)}return {cells, output};`);
  outputCodeArray.push('}\n');

  return outputCodeArray.join('\n');
}

module.exports = transpileToJavaScript;
