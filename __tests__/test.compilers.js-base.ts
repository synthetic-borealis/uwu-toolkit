import { LoopBoundaryMismatchError, compileToJsBase } from '../src';
import { invalidUwu } from '../test-utils/constants';

describe('Compilation to JavaScript (Base)', () => {
  describe('Error handling', () => {
    it('Throws LoopBoundaryMismatchError when loop boundaries are mismatching', () => {
      expect(
        () => compileToJsBase(
          invalidUwu,
          false,
          false,
          2,
          ' ',
        ),
      ).toThrow(LoopBoundaryMismatchError);
    });
  });
});
