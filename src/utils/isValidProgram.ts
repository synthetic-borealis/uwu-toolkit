/**
 * Validates an UwU program by looking for unmatched loop starts/ends.
 * @category Validation
 * @param {Array<string>} sourceArray Tokenized UwU code.
 * @returns {boolean} true if the program is valid or false otherwise.
 */
function isValidProgram(sourceArray: string[]): boolean {
  const numberOfLoopStarts = sourceArray.reduce(
    (previous, current) => ((current === '~w~') ? previous + 1 : previous),
    0,
  );
  const numberOfLoopEnds = sourceArray.reduce(
    (previous, current) => ((current === '¯w¯') ? previous + 1 : previous),
    0,
  );

  return numberOfLoopStarts === numberOfLoopEnds;
}

export default isValidProgram;
