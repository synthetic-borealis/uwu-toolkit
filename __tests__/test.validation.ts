import { tokenizeUwuSource, isValidProgram } from '../src';
import { helloUwu, invalidUwu } from '../test-utils/constants';

describe('Validation', () => {
  it('Accepts valid programs', () => {
    expect(isValidProgram(tokenizeUwuSource(helloUwu))).toBeTruthy();
    expect(isValidProgram(tokenizeUwuSource(invalidUwu))).toBeFalsy();
  });
});
