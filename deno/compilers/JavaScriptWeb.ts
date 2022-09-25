import genIndent from '../utils/genIndent.ts';
import compileToJsBase from './JavaScriptBase.ts';

/**
 * Converts an UwU program to JavaScript (Web).
 * @category Compilation
 * @param {string} source UwU source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param {string} mainFunctionName Main function name.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated JavaScript code.
 * @throws {LoopBoundaryMismatchError} if mismatching loop boundaries are detected.
 */
function compileToJsWeb(
  source: string,
  isMemoryDynamic = true,
  mainFunctionName = 'main',
  indentSize = 2,
  indentChar = ' ',
) {
  const {
    declaration: declarationLines,
    definition: definitionLines,
  } = compileToJsBase(source, isMemoryDynamic, false, indentSize, indentChar);

  const indent = genIndent(1, indentSize, indentChar);
  const outputCodeArray = [
    ...declarationLines,
    'let output = \'\';',
  ];
  const putchar = [
    'function putchar() {',
    `${indent}output += String.fromCharCode(cells[position]);`,
    '}\n',
  ];
  outputCodeArray.push(...putchar);
  outputCodeArray.push(`function ${mainFunctionName}() {`);
  outputCodeArray.push(...(definitionLines.map((line) => `${indent}${line}`)));
  outputCodeArray.push('');
  outputCodeArray.push(`${indent}return { cells, output };`);
  outputCodeArray.push('}\n');
  return outputCodeArray.join('\n');
}

export default compileToJsWeb;
