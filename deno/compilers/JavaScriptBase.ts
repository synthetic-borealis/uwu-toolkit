import genIndent from '../utils/genIndent.ts';
import tokenizeUwuSource from '../utils/tokenizeUwuSource.ts';
import LoopBoundaryMismatchError from '../errors/loopBoundaryMismatchError.ts';
import isValidProgram from '../utils/isValidProgram.ts';

/**
 * Converts an UwU program to JavaScript.
 * @description This function is used by {@link compileToJsWeb}, {@link compileToJsNode}
 * and {@link compileToJsDeno} to generate their output. You can use it to write functions
 * that generate output for other JavaScript-based platforms.
 * @category Compilation
 * @param {string} source UwU source to convert.
 * @param {boolean} isMemoryDynamic Enable dynamic memory array.
 * @param {boolean} enableUserInput Enable user input handling.
 * @param {number} indentSize Indentation size.
 * @param {string} indentChar Indentation character.
 * @returns @returns {<{ declaration: string[], definition: string[] }>}
 * @throws {@link LoopBoundaryMismatchError} if mismatching loop boundaries are detected.
 */
function compileToJsBase(
  source: string,
  isMemoryDynamic: boolean,
  enableUserInput: boolean,
  indentSize: number,
  indentChar: string,
) {
  const sourceArray = tokenizeUwuSource(source);
  if (!isValidProgram(sourceArray)) {
    throw new LoopBoundaryMismatchError();
  }

  let indent = genIndent(1, indentSize, indentChar);

  const outputDeclarationLines = [
    'let position = 0',
  ];
  if (isMemoryDynamic) {
    outputDeclarationLines.push('const cells = [0];');
  } else {
    outputDeclarationLines.push('const cells =  new Uint8Array(30000);');
  }
  const outputDefinitionLines: string[] = [];
  let currentDepth = 0;

  sourceArray.forEach((command) => {
    indent = genIndent(currentDepth + 1, indentSize, indentChar);
    switch (command) {
      case 'OwO':
        if (isMemoryDynamic) {
          outputDefinitionLines.push(`${indent}if (position + 1 === cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputDefinitionLines.push(`${indent}cells.push(0);`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputDefinitionLines.push('}');
          outputDefinitionLines.push(`${indent}++position;\n`);
        } else {
          outputDefinitionLines.push(`${indent}if (position + 1 < cells.length) {`);
          indent += genIndent(1, indentSize, indentChar);
          outputDefinitionLines.push(`${indent}++position;\n`);
          indent = genIndent(currentDepth + 1, indentSize, indentChar);
          outputDefinitionLines.push('}');
        }
        break;

      case '°w°':
        outputDefinitionLines.push(`${indent}if (position > 0)`);
        indent += genIndent(1, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}--position;\n`);
        break;

      case 'UwU':
        outputDefinitionLines.push(`${indent}if (cells[position] < 255)`);
        indent += genIndent(1, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}++cells[position];\n`);
        break;

      case 'QwQ':
        outputDefinitionLines.push(`${indent}if (cells[position] > 0)`);
        indent += genIndent(1, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}--cells[position];\n`);
        break;

      case '@w@':
        outputDefinitionLines.push(`${indent}putchar(String.fromCharCode(cells[position]));`);
        break;

      case '>w<':
        if (enableUserInput) {
          outputDefinitionLines.push(`${indent}cells[position] = getchar();`);
        }
        break;

      case '~w~':
        outputDefinitionLines.push(`${indent}while (cells[position] > 0) {`);
        currentDepth += 1;
        break;

      case '¯w¯':
        currentDepth = Math.max(currentDepth - 1, 0);
        indent = genIndent(currentDepth + 1, indentSize, indentChar);
        outputDefinitionLines.push(`${indent}}`);
        break;

      // skip default case
    }
  });
  return {
    declaration: outputDeclarationLines,
    definition: outputDefinitionLines,
  };
}

export default compileToJsBase;
