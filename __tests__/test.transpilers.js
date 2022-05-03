const uwuTK = require('../index');
const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { helloUwu, invalidUwu } = require('../lib/constants');
const expectedOutputString = 'Hewwo Wowwd!';

describe('Transpiler tests', () => {
  describe('JavaScript transpiler', () => {
    let outputCode;
    let hewwoWowwd;

    it('Throws an error when input has incorrect type', () => {
      expect(() => {
        uwuTK.transpileToJavaScript([2, 9, 4]);
      }).toThrow();
    });

    it('Throws an error when input is not a valid program', () => {
      expect(() => {
        uwuTK.transpileToJavaScript(invalidUwu);
      }).toThrow();
    });

    it('Does not throw error when input is a valid program', () => {
      expect(() => {
        outputCode = uwuTK.transpileToJavaScript(helloUwu);
      }).not.toThrow();
    });

    it('Generates valid JavaScript', () => {
      hewwoWowwd = new Function(`${outputCode}return run();`);
      expect(hewwoWowwd).not.toThrow();
    });

    describe('Generated function', () => {
      it('Returns a correct output string', () => {
        expect(hewwoWowwd().output.trim()).toBe(expectedOutputString);
      });

      it('Returns cell array', () => {
        expect(Array.isArray(hewwoWowwd().cells) &&
          !hewwoWowwd().cells.some((value) => typeof value !== 'number')).toBeTruthy();
      });
    });
  });
});
