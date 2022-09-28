import genIndent from '../utils/genIndent.ts';
import compileToJsBase from './JavaScriptBase.ts';

/**
 * Converts an UwU program to JavaScript (Deno).
 * @category Compilation
 * @param {string} source UwU source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param {string} mainFunctionName Main function name.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns {string} Generated JavaScript code.
 * @throws {LoopBoundaryMismatchError} if mismatching loop boundaries are detected.
 */
function compileToJsDeno(
  source: string,
  isMemoryDynamic = true,
  mainFunctionName = 'main',
  indentSize = 2,
  indentChar = ' ',
) {
  const {
    declaration: declarationLines,
    definition: definitionLines,
  } = compileToJsBase(source, isMemoryDynamic, true, indentSize, indentChar);

  const indent = genIndent(1, indentSize, indentChar);

  const putchar = [
    'function putchar() {',
    `${indent}Deno.stdout.write(new TextEncoder().encode(String.fromCharCode(cells[position])));`,
    '}\n',
  ];
  const getchar = [
    'function getchar() {',
    `${indent}const buffer = new Uint8Array(1);`,
    `${indent}const n = Deno.stdin.readSync(buffer);`,
    `${indent}return buffer[0];`,
    '}\n',
  ];
  const hasUserInput = source.indexOf('>w<') > -1;
  const outputCodeArray: string[] = [
    ...declarationLines,
    ...putchar,
  ];
  if (hasUserInput) {
    outputCodeArray.push(...getchar);
  }
  outputCodeArray.push(`function ${mainFunctionName}() {`);
  outputCodeArray.push(...(definitionLines.map((line) => `${indent}${line}`)));
  outputCodeArray.push('}\n');
  outputCodeArray.push(`${mainFunctionName}();`);
  return outputCodeArray.join('\n');
}

export default compileToJsDeno;
