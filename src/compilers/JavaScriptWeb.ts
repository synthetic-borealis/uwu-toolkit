import genIndent from '../utils/genIndent';
import tokenizeUwuSource from '../utils/tokenizeUwuSource';
import LoopBoundaryMismatchError from '../errors/loopBoundaryMismatchError';
import isValidProgram from '../utils/isValidProgram';

function compileToJsWeb(source: string, useDynamicMemory = true, funcName = 'main', indentSize = 2, indentChar = ' ') {
  const sourceArray = tokenizeUwuSource(source);
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputCodeArray = [
    `function ${funcName}() {`,
    `${indent}var position = 0;`,
    `${indent}var output = "";`,
  ];

  if (useDynamicMemory) {
    outputCodeArray.push(`${indent}let cells = [0];\n`);
  } else {
    outputCodeArray.push(`${indent}let cells = Array(30000).fill(0);\n`);
  }

  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case 'OwO':
        if (useDynamicMemory) {
          outputCodeArray.push(`${indent}if (position + 1 === cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}cells.push(0);`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push('}');
          outputCodeArray.push(`${indent}++position;\n`);
        } else {
          outputCodeArray.push(`${indent}if (position + 1 < cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputCodeArray.push(`${indent}++position;\n`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputCodeArray.push('}');
        }
        break;

      case '°w°':
        outputCodeArray.push(`${indent}if (position > 0)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--position;\n`);
        break;

      case 'UwU':
        outputCodeArray.push(`${indent}if (cells[position] < 255)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}++cells[position];\n`);
        break;

      case 'QwQ':
        outputCodeArray.push(`${indent}if (cells[position] > 0)`);
        indent += genIndent(1, indentSize, indentChar);
        outputCodeArray.push(`${indent}--cells[position];\n`);
        break;

      case '@w@':
        outputCodeArray.push(`${indent}output += String.fromCharCode(cells[position]);`);
        break;

      case '~w~':
        outputCodeArray.push(`${indent}while (cells[position] > 0) {`);
        currentDepth += 1;
        break;

      case '¯w¯':
        currentDepth = currentDepth > 0 ? currentDepth - 1 : 0;
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputCodeArray.push(`${indent}}`);
        break;

      default:
    }
  });

  indent = genIndent(1, indentSize, indentChar);

  outputCodeArray.push('');
  outputCodeArray.push(`${indent}return {cells, output};`);
  outputCodeArray.push('}\n');

  return outputCodeArray.join('\n');
}

export default compileToJsWeb;
