module.exports = class LoopBoundaryMismatchError extends Error {
  constructor() {
    super('Mismatching loop boundaries');
  }
};
