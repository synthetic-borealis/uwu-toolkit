// Error types
const LoopBoundaryMismatchError = require('./lib/errors/loopBoundaryMismatch');
const WrongInputError = require('./lib/errors/wrongInput');

// Utilities
const { tokenizeUwuSource } = require('./lib/utils');
const { isValidProgram } = require('./lib/validation');

// Transpilers
const transpileToBrainfuck = require('./lib/transpilers/Brainfuck');
const transpileToC = require('./lib/transpilers/C');
const transpileToCpp = require('./lib/transpilers/CPP');
const transpileToJavaScript = require('./lib/transpilers/JavaScript');
const transpileToPython = require('./lib/transpilers/Python');

module.exports = {
  LoopBoundaryMismatchError,
  WrongInputError,
  tokenizeUwuSource,
  isValidProgram,
  transpileToBrainfuck,
  transpileToC,
  transpileToCpp,
  transpileToJavaScript,
  transpileToPython,
};
