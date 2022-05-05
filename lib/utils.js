const { uwuRegex } = require('./constants');

function genIndent(depth, size, char = ' ') {
  return Array(depth * size + 1).join(char);
}

/**
 * Converts UwU source code to an array of UwU commands.
 * @param {string} source UwU source code in string form.
 * @returns {Array<string>} An array of UwU commands.
 */
function tokenizeUwuSource(source) {
  return [...source.matchAll(uwuRegex)].map((item) => item[0]);
}

module.exports = { genIndent, tokenizeUwuSource };
