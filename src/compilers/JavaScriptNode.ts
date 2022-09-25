import genIndent from '../utils/genIndent';
import compileToJsBase from './JavaScriptBase';

function compileToJsNode(
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
    `${indent}process.stdout.write(String.fromCharCode(cells[position]));`,
    '}\n',
  ];
  const getchar = [
    'function getchar() {',
    `${indent}const buffer = Buffer.alloc(1);`,
    `${indent}fs.readSync(process.stdin.fd, buffer, 0, 1);`,
    `${indent}return buffer[0];`,
    '}\n',
  ];
  const hasUserInput = source.indexOf('>w<') > -1;
  const outputCodeArray: string[] = [];
  if (hasUserInput) {
    outputCodeArray.push('const fs = require(\'fs\');\n');
  }
  outputCodeArray.push(...declarationLines);
  outputCodeArray.push(...putchar);
  if (hasUserInput) {
    outputCodeArray.push(...getchar);
  }
  outputCodeArray.push(`function ${mainFunctionName}() {`);
  outputCodeArray.push(...(definitionLines.map((line) => `${indent}${line}`)));
  outputCodeArray.push('}\n');
  outputCodeArray.push(`${mainFunctionName}();`);
  return outputCodeArray.join('\n');
}

export default compileToJsNode;
