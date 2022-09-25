class LoopBoundaryMismatchError extends Error {
  /**
   * LoopBoundaryMismatch Error constructor.
   */
  constructor() {
    super('Mismatching loop boundaries');
  }
}

export default LoopBoundaryMismatchError;
