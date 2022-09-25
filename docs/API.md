uwu-toolkit

# uwu-toolkit

## Table of contents

### Classes

- [LoopBoundaryMismatchError](classes/LoopBoundaryMismatchError.md)

### Compilation Functions

- [compileToBrainfuck](API.md#compiletobrainfuck)
- [compileToC](API.md#compiletoc)
- [compileToCpp](API.md#compiletocpp)
- [compileToJsBase](API.md#compiletojsbase)
- [compileToJsNode](API.md#compiletojsnode)
- [compileToJsWeb](API.md#compiletojsweb)
- [compileToPython](API.md#compiletopython)

### Utility Functions

- [genIndent](API.md#genindent)
- [tokenizeUwuSource](API.md#tokenizeuwusource)

### Validation Functions

- [isValidProgram](API.md#isvalidprogram)

## Compilation Functions

### compileToBrainfuck

▸ **compileToBrainfuck**(`source`): `string`

Converts UwU source code to Brainfuck.

**`Throws`**

if mismatching loop boundaries are detected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | UwU source code to convert. |

#### Returns

`string`

Generated Brainfuck code.

#### Defined in

[src/compilers/Brainfuck.ts:12](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/compilers/Brainfuck.ts#L12)

___

### compileToC

▸ **compileToC**(`source`, `indentSize?`, `indentChar?`): `string`

Converts UwU source code to a C program.

**`Throws`**

if mismatching loop boundaries are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | UwU source code to convert. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated C code.

#### Defined in

[src/compilers/C.ts:15](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/compilers/C.ts#L15)

___

### compileToCpp

▸ **compileToCpp**(`source`, `isMemoryDynamic?`, `indentSize?`, `indentChar?`): `string`

Converts UwU source code to a C++ program.

**`Throws`**

if mismatching loop boundaries are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | UwU source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated C++ code.

#### Defined in

[src/compilers/CPP.ts:16](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/compilers/CPP.ts#L16)

___

### compileToJsBase

▸ **compileToJsBase**(`source`, `isMemoryDynamic`, `enableUserInput`, `indentSize`, `indentChar`): `Object`

Converts an UwU program to JavaScript.

**`Description`**

This function is used by [compileToJsWeb](API.md#compiletojsweb) and [compileToJsNode](API.md#compiletojsnode)
to generate their output. You can use it to write functions
that generate output for other JavaScript-based platforms.

**`Throws`**

[LoopBoundaryMismatchError](classes/LoopBoundaryMismatchError.md) if mismatching loop boundaries are detected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | UwU source to convert. |
| `isMemoryDynamic` | `boolean` | Enable dynamic memory array. |
| `enableUserInput` | `boolean` | Enable user input handling. |
| `indentSize` | `number` | Indentation size. |
| `indentChar` | `string` | Indentation character. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `declaration` | `string`[] |
| `definition` | `string`[] |

#### Defined in

[src/compilers/JavaScriptBase.ts:20](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/compilers/JavaScriptBase.ts#L20)

___

### compileToJsNode

▸ **compileToJsNode**(`source`, `isMemoryDynamic?`, `mainFunctionName?`, `indentSize?`, `indentChar?`): `string`

Converts an UwU program to JavaScript (Node.js).

**`Throws`**

if mismatching loop boundaries are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | UwU source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |
| `mainFunctionName` | `string` | `'main'` | Main function name. |
| `indentSize` | `number` | `2` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated JavaScript code.

#### Defined in

[src/compilers/JavaScriptNode.ts:15](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/compilers/JavaScriptNode.ts#L15)

___

### compileToJsWeb

▸ **compileToJsWeb**(`source`, `isMemoryDynamic?`, `mainFunctionName?`, `indentSize?`, `indentChar?`): `string`

Converts an UwU program to JavaScript (Web).

**`Throws`**

if mismatching loop boundaries are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | UwU source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |
| `mainFunctionName` | `string` | `'main'` | Main function name. |
| `indentSize` | `number` | `2` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated JavaScript code.

#### Defined in

[src/compilers/JavaScriptWeb.ts:15](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/compilers/JavaScriptWeb.ts#L15)

___

### compileToPython

▸ **compileToPython**(`source`, `isMemoryDynamic?`): `string`

Converts an UwU program to a Python.

**`Throws`**

if mismatching loop boundaries are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | UwU source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |

#### Returns

`string`

Generated Python code.

#### Defined in

[src/compilers/Python.ts:14](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/compilers/Python.ts#L14)

___

## Utility Functions

### genIndent

▸ **genIndent**(`depth`, `size`, `char`): `string`

Generates an indentation string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `depth` | `number` | Indentation depth. |
| `size` | `number` | Indentation size. |
| `char` | `string` | Indentation character. |

#### Returns

`string`

Indentation string.

#### Defined in

[src/utils/genIndent.ts:9](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/utils/genIndent.ts#L9)

___

### tokenizeUwuSource

▸ **tokenizeUwuSource**(`source`): `string`[]

Converts UwU source code to an array of UwU commands.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | UwU source code in string form. |

#### Returns

`string`[]

An array of UwU commands.

#### Defined in

[src/utils/tokenizeUwuSource.ts:9](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/utils/tokenizeUwuSource.ts#L9)

___

## Validation Functions

### isValidProgram

▸ **isValidProgram**(`sourceArray`): `boolean`

Validates an UwU program by looking for unmatched loop starts/ends.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sourceArray` | `string`[] | Tokenized UwU code. |

#### Returns

`boolean`

true if the program is valid or false otherwise.

#### Defined in

[src/utils/isValidProgram.ts:7](https://github.com/synthetic-borealis/uwu-toolkit/blob/5549936/src/utils/isValidProgram.ts#L7)
