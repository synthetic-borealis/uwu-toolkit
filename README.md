# UwU Toolkit

[![GitHub license](https://img.shields.io/github/license/synthetic-borealis/uwu-toolkit)](https://github.com/synthetic-borealis/uwu-toolkit/blob/main/LICENSE)
[![npm version](https://badge.fury.io/js/uwu-toolkit.svg)](https://badge.fury.io/js/uwu-toolkit)
![Tests](https://github.com/synthetic-borealis/uwu-toolkit/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/github/synthetic-borealis/uwu-toolkit/branch/main/graph/badge.svg?token=FNGQ35KT0M)](https://codecov.io/github/synthetic-borealis/uwu-toolkit)

An UwU source-to-source compilation library for web-browsers, Node.js & Deno.

## Contents

1. [What is Uwu](#what-is-uwu)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Supported output languages](#supported-output-languages)
5. [Examples](#examples)

## What is UwU?

UwU is an esoteric programming language created by [Kira Rose](https://github.com/KiraDotRose). It
is a member of the Brainfuck trivial substitution family of programming languages. An example
program written in UwU, and a list of commands can be
found [here](https://github.com/KiraDotRose/UwU).

## Installation

Run `npm i uwu-toolkit` or `yarn add uwu-toolkit`.

## Usage

- Use `compileTo[LANGUAGE]()` where `[LANGUAGE]` is a supported output language/variant (
  e.g. `compileToJsWeb()`).
- The web variant of the JavaScript transpiler generates a function that returns an object
  containing two members:
  1. `output` - The output of the program.
  2. `cells` - The array of cells that were used by the program.
- See the [documentation](docs/API.md) for more information.

## Supported Output Languages

- Brainfuck.
- C.
- C++.
- JavaScript.
- Python.

### Table 1: Supported Commands by Output Language

| Language             |   OwO   |   °w°   |   UwU   |   QwQ   |   @w@   |   >w<   |  \~w\~  |   ¯w¯   | Memory Size    |
|:---------------------| :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :------------: |
| Brainfuck            | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | Not Applicable |
| C                    | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000         |
| C++                  | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |
| JavaScript (Web)     | &check; | &check; | &check; | &check; | &check; | &cross; | &check; | &check; | 30,000/Dynamic |
| JavaScript (Node.js) | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |
| JavaScript (Deno)    | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |
| Python               | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; | 30,000/Dynamic |

## Examples

### CommonJS (Node)

```javascript
const uwuTK = require('uwu-toolkit');

const helloUwu = 'UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO'
  + 'UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU'
  + 'UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯'
  + 'OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°'
  + 'QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@'
  + '@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@'
  + 'OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°'
  + '°w° QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ @w@ OwO OwO'
  + 'UwU @w@ OwO OwO UwU UwU @w@';

try {
  const helloJS = uwuTK.compileToJsWeb(helloUwu);
  const hello = new Function(`${helloJS}return main().output;`);

  console.log(hello());
} catch (err) {
  console.error(`Error: ${err.message}`);
}
```

### Program Validation - CommonJS (Node)

```javascript
const uwuTK = require('uwu-toolkit');

const helloUwu = 'UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO'
  + 'UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU'
  + 'UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯'
  + 'OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°'
  + 'QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@'
  + '@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@'
  + 'OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°'
  + '°w° QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ @w@ OwO OwO'
  + 'UwU @w@ OwO OwO UwU UwU @w@';

const invalidUwu = 'UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO'
  + 'UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU'
  + 'UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯'
  + 'OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°'
  + 'QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@'
  + '@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@'
  + 'OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°'
  + '°w° QwQ QwQ QwQ QwQ QwQ QwQ ¯w¯ QwQ QwQ QwQ QwQ @w@ OwO OwO'
  + 'UwU @w@ OwO OwO UwU UwU @w@';

const validSourceArray = uwuTK.tokenizeUwuSource(helloUwu);
const invalidSourceArray = uwuTK.tokenizeUwuSource(invalidUwu);

console.log(uwuTK.isValidProgram(validSourceArray)); // true
console.log(uwuTK.isValidProgram(invalidSourceArray)); // false
```

### ESM (Node)

```javascript
import * as uwuTK from 'uwu-toolkit';

const helloUwu = 'UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO'
  + 'UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU'
  + 'UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯'
  + 'OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°'
  + 'QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@'
  + '@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@'
  + 'OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°'
  + '°w° QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ @w@ OwO OwO'
  + 'UwU @w@ OwO OwO UwU UwU @w@';

try {
  const helloJS = uwuTK.compileToJsWeb(helloUwu);
  const hello = new Function(`${helloJS}return main().output;`);

  console.log(hello());
} catch (err) {
  console.error(`Error: ${err.message}`);
}
```

### ESM (Deno)

```javascript
import * as uwuTK from "https://jspm.dev/uwu-toolkit";

const helloUwu = "UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO"
  + "UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU"
  + "UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯"
  + "OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°"
  + "QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@"
  + "@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@"
  + "OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°"
  + "°w° QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ @w@ OwO OwO"
  + "UwU @w@ OwO OwO UwU UwU @w@";

try {
  const helloJS = uwuTK.compileToJsWeb(helloUwu);
  const hello = new Function(`${helloJS}return main().output;`);

  console.log(hello());
} catch (err) {
  console.error(`Error: ${err.message}`);
}
```

### TypeScript (Deno)

```typescript
import * as uwuTK from "https://cdn.jsdelivr.net/gh/synthetic-borealis/uwu-toolkit/deno/index.ts";

const helloUwu = "UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO" +
  "UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU" +
  "UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯" +
  "OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°" +
  "QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@" +
  "@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@" +
  "OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°" +
  "°w° QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ @w@ OwO OwO" +
  "UwU @w@ OwO OwO UwU UwU @w@";

try {
  const helloJS = uwuTK.compileToJsWeb(helloUwu);
  const hello = new Function(`${helloJS}return main().output;`);

  console.log(hello());
} catch (err) {
  console.error(`Error: ${err.message}`);
}
```

### Web

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hewwo Wowwd!</title>
    <script src="https://unpkg.com/uwu-toolkit@2.0.0/dist/uwu-toolkit.js"></script>
  </head>
  <body>
    <p>
      <textarea id="output-box" readonly rows="8" style="width: 90%;"></textarea>
    </p>
    <button id="run-button">Run</button>

    <script>
      const runButton = document.getElementById('run-button');
      const outputBox = document.getElementById('output-box');
      const helloUwu = 'UwU UwU UwU UwU UwU UwU UwU UwU ~w~ OwO'
        + 'UwU UwU UwU UwU ~w~ OwO UwU UwU OwO UwU UwU UwU OwO UwU UwU'
        + 'UwU OwO UwU OwO UwU UwU UwU UwU °w° °w° °w° °w° °w° QwQ ¯w¯'
        + 'OwO UwU OwO UwU OwO QwQ OwO OwO QwQ OwO UwU ~w~ °w° ¯w¯ °w°'
        + 'QwQ ¯w¯ OwO OwO @w@ OwO QwQ QwQ QwQ @w@ OwO OwO OwO QwQ @w@'
        + '@w@ °w° °w° °w° UwU UwU UwU UwU UwU UwU UwU UwU UwU UwU @w@'
        + 'OwO OwO @w@ °w° QwQ @w@ °w° @w@ OwO OwO OwO @w@ @w@ °w° °w°'
        + '°w° QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ QwQ @w@ OwO OwO'
        + 'UwU @w@ OwO OwO UwU UwU @w@';

      outputBox.value = '';
      runButton.addEventListener('click', () => {
        try {
          const helloWorldProgram = uwuTK.compileToJsWeb(helloUwu);
          const helloWorld = new Function(`${helloWorldProgram} return main().output;`);

          outputBox.value += helloWorld();
        } catch (err) {
          outputBox.value += `Error: ${err.message}`;
        }
      });
    </script>
  </body>
</html>
```
