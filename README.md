# UwU Toolkit

An UwU transpilation library for Node.js.

## Contents

1. [What is Uwu](#what-is-uwu)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Supported output languages](#supported-output-languages)

## What is UwU?

UwU is an esoteric programming language created by [Kira Rose](https://github.com/KiraDotRose). It is a member of the Brainfuck trivial substitution family of programming languages. An example program written in UwU, and a list of commands can be found [here](https://github.com/KiraDotRose/UwU).

## Installation

Run `npm i uwu`

## Usage

- Use `transpileTo[LANGUAGE]()` where `[LANGUAGE]` is a supported output language (e.g. `transpileToJavaScript()`).
- Transpilation to JavaScript generates a function that returns an object containing two members:
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

| Language   |   OwO   |   °w°   |   UwU   |   QwQ   |   @w@   |   >w<   |  \~w\~  |   ¯w¯   |
| :--------- | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
| Brainfuck  | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
| C          | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
| C++        | &check; | &check; | &check; | &check; | &check; | &check; | &check; | &check; |
| JavaScript | &check; | &check; | &check; | &check; | &check; | &cross; | &check; | &check; |
| Python     | &check; | &check; | &check; | &check; | &check; | &cross; | &check; | &check; |
