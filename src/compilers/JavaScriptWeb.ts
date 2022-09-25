import genIndent from '../utils/genIndent';
import compileToJsBase from './JavaScriptBase';

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
