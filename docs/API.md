## Classes

<dl>
<dt><a href="#LoopBoundaryMismatchError">LoopBoundaryMismatchError</a></dt>
<dd></dd>
<dt><a href="#WrongInputError">WrongInputError</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#transpileToBrainfuck">transpileToBrainfuck(source)</a> ⇒ <code>string</code></dt>
<dd><p>Converts UwU source code to Brainfuck.</p>
</dd>
<dt><a href="#transpileToC">transpileToC(source, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts UwU source code to a C program.</p>
</dd>
<dt><a href="#transpileToCpp">transpileToCpp(source, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts UwU source code to a C++ program.</p>
</dd>
<dt><a href="#transpileToJavaScript">transpileToJavaScript(source, funcName, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts UwU source code to a JavaScript function.</p>
</dd>
<dt><a href="#transpileToPython">transpileToPython(source)</a> ⇒ <code>string</code></dt>
<dd><p>Converts UwU source code to a Python script.</p>
</dd>
<dt><a href="#tokenizeUwuSource">tokenizeUwuSource(source)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Converts UwU source code to an array of UwU commands.</p>
</dd>
<dt><a href="#isValidProgram">isValidProgram(sourceArray)</a> ⇒ <code>boolean</code></dt>
<dd><p>Validates an UwU program by looking for umatched loop starts/ends.</p>
</dd>
</dl>

<a name="LoopBoundaryMismatchError"></a>

## LoopBoundaryMismatchError
**Kind**: global class  
<a name="new_LoopBoundaryMismatchError_new"></a>

### new LoopBoundaryMismatchError()
LoopBoundaryMismatch Error constructor.

<a name="WrongInputError"></a>

## WrongInputError
**Kind**: global class  
<a name="new_WrongInputError_new"></a>

### new WrongInputError(message)
WrongInput Error contructor.


| Param | Type |
| --- | --- |
| message | <code>string</code> | 

<a name="transpileToBrainfuck"></a>

## transpileToBrainfuck(source) ⇒ <code>string</code>
Converts UwU source code to Brainfuck.

**Kind**: global function  
**Returns**: <code>string</code> - Generated Brainfuck code.  
**Throws**:

- [<code>WrongInputError</code>](#WrongInputError) Input must be a string or an array of strings.
- [<code>LoopBoundaryMismatchError</code>](#LoopBoundaryMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | UwU source code to convert. |

<a name="transpileToC"></a>

## transpileToC(source, indentSize, indentChar) ⇒ <code>string</code>
Converts UwU source code to a C program.

**Kind**: global function  
**Returns**: <code>string</code> - Generated C code.  
**Throws**:

- [<code>WrongInputError</code>](#WrongInputError) Input must be a string or an array of strings.
- [<code>LoopBoundaryMismatchError</code>](#LoopBoundaryMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | UwU source code to convert. |
| indentSize | <code>number</code> | <code>1</code> | Indentation size (default = 1). |
| indentChar | <code>string</code> | <code>&quot;\t&quot;</code> | Indentation character (default is tab). |

<a name="transpileToCpp"></a>

## transpileToCpp(source, indentSize, indentChar) ⇒ <code>string</code>
Converts UwU source code to a C++ program.

**Kind**: global function  
**Returns**: <code>string</code> - Generated C++ code.  
**Throws**:

- [<code>WrongInputError</code>](#WrongInputError) Input must be a string or an array of strings.
- [<code>LoopBoundaryMismatchError</code>](#LoopBoundaryMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | UwU source code to convert. |
| indentSize | <code>number</code> | <code>1</code> | Indentation size (default = 1). |
| indentChar | <code>string</code> | <code>&quot;\t&quot;</code> | Indentation character (default is tab). |

<a name="transpileToJavaScript"></a>

## transpileToJavaScript(source, funcName, indentSize, indentChar) ⇒ <code>string</code>
Converts UwU source code to a JavaScript function.

**Kind**: global function  
**Returns**: <code>string</code> - Generated JavaScript function source.  
**Throws**:

- [<code>WrongInputError</code>](#WrongInputError) Input must be a string or an array of strings.
- [<code>LoopBoundaryMismatchError</code>](#LoopBoundaryMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | UwU source code to convert. |
| funcName | <code>string</code> | <code>&quot;run&quot;</code> | Output function name (default = 'run'). |
| indentSize | <code>number</code> | <code>2</code> | Indentation size (default = 4). |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character (default is space). |

<a name="transpileToPython"></a>

## transpileToPython(source) ⇒ <code>string</code>
Converts UwU source code to a Python script.

**Kind**: global function  
**Returns**: <code>string</code> - Generated Python code.  
**Throws**:

- [<code>WrongInputError</code>](#WrongInputError) Input must be a string or an array of strings.
- [<code>LoopBoundaryMismatchError</code>](#LoopBoundaryMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | UwU source code to convert. |

<a name="tokenizeUwuSource"></a>

## tokenizeUwuSource(source) ⇒ <code>Array.&lt;string&gt;</code>
Converts UwU source code to an array of UwU commands.

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - An array of UwU commands.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | UwU source code in string form. |

<a name="isValidProgram"></a>

## isValidProgram(sourceArray) ⇒ <code>boolean</code>
Validates an UwU program by looking for umatched loop starts/ends.

**Kind**: global function  

| Param | Type |
| --- | --- |
| sourceArray | <code>Array.&lt;string&gt;</code> | 

