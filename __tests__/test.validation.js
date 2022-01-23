const { helloUwu, invalidUwu } = require('../lib/constants');
const { tokenizeUwuSource } = require('../lib/utils');
const { isValidProgram } = require('../lib/validation');

describe('Validation functions tests', () => {
  describe('isValidProgram', () => {
    it('Accepts valid programs', () => {
      expect(isValidProgram(tokenizeUwuSource(helloUwu))).toBeTruthy();
    });

    it('Rejects invalid programs', () => {
      expect(isValidProgram(tokenizeUwuSource(invalidUwu))).toBeFalsy();
    });
  });
});
