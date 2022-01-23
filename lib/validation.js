function isValidProgram(sourceArray) {
  const numberOfLoopStarts = sourceArray.reduce((previous, current) => ((current === '~w~') ? previous + 1 : previous), 0);
  const numberOfLoopEnds = sourceArray.reduce((previous, current) => ((current === '¯w¯') ? previous + 1 : previous), 0);

  return numberOfLoopStarts === numberOfLoopEnds;
}

module.exports = { isValidProgram };
