const uwuRegex = /OwO|°w°|UwU|QwQ|@w@|>w<|~w~|¯w¯/g;

/**
 * Converts UwU source code to an array of UwU commands.
 * @param {string} source UwU source code in string form.
 * @returns {Array<string>} An array of UwU commands.
 */
function tokenizeUwuSource(source: string): string[] {
  return [...source.matchAll(uwuRegex)].map((item) => item[0]);
}

export default tokenizeUwuSource;
