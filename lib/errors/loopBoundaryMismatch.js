class LoopBoundaryMismatchError extends Error {
  /**
   * LoopBoundaryMismatch Error constructor.
   */
  constructor() {
    super('Mismatching loop boundaries');
  }
}

module.exports = LoopBoundaryMismatchError;
