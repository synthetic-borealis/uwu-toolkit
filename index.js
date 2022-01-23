// Error types
const LoopBoundaryMismatchError = require('./lib/errors/loopBoundaryMismatch');
const WrongInputError = require('./lib/errors/wrongInput');

// Utilities
const { tokenizeUwuSource } = require('./lib/utils');

// Transpilers
const transpileToBrainfuck = require('./lib/transpilers/Brainfuck');
const transpileToJavaScript = require('./lib/transpilers/JavaScript');
const transpileToPython = require('./lib/transpilers/Python');

module.exports = {
  LoopBoundaryMismatchError,
  WrongInputError,
  tokenizeUwuSource,
  transpileToBrainfuck,
  transpileToJavaScript,
  transpileToPython,
};
