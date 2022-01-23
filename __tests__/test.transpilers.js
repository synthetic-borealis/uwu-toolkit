const uwuTK = require('../index');
const { PythonShell } = require('python-shell');
const should = require('should');
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

  describe('Python transpiler', () => {
    let outputCode;

    it('Does not throw error when input is a valid program', () => {
      expect(() => {
        outputCode = uwuTK.transpileToPython(helloUwu);
      }).not.toThrow();
    });

    it('Generates valid Python code', (done) => {
      PythonShell.runString(outputCode, null, (err, results) => {
        if (err) {
          done(err);
        }
        done();
      });
    });

    describe('Generated function', () => {
      it('Returns a correct output string', (done) => {
        PythonShell.runString(outputCode, null, (err, results) => {
          if (err) {
            done(err);
          }
          results.should.eql([expectedOutputString]);
          done();
        });
      });
    });
  });

  describe('C transpiler', () => {
    let outputCode;

    it('Does not throw error when input is a valid program', () => {
      expect(() => {
        outputCode = uwuTK.transpileToC(helloUwu);
      }).not.toThrow();
    });

    describe('Generated C code', () => {
      const exeExtension = process.platform === 'win32' ? '.exe' : '';
      const executableFile = `test${exeExtension}`;
      const sourceFile = 'test.c';

      beforeAll(() => {
        return fs.writeFile(sourceFile, outputCode);
      });

      it('Is valid', () => {
        return expect(cppUtils.compileWithGcc(sourceFile, executableFile, true)).resolves.toBeDefined();
      });

      it('Has correct output', (done) => {
        const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
        exec(commandToRun)
          .then(({ stdout, stderr }) => {
            if (stdout.trim() === expectedOutputString) {
              done();
            }
          })
          .catch((err) => {
            done(err);
          });
      });

      afterAll(() => {
        return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
      });
    });
  });

  describe('C++ transpiler', () => {
    let outputCode;

    it('Does not throw error when input is a valid program', () => {
      expect(() => {
        outputCode = uwuTK.transpileToCpp(helloUwu);
      }).not.toThrow();
    });

    describe('Generated C++ code', () => {
      const exeExtension = process.platform === 'win32' ? '.exe' : '';
      const executableFile = `test${exeExtension}`;
      const sourceFile = 'test.cpp';

      beforeAll(() => {
        return fs.writeFile(sourceFile, outputCode);
      });

      it('Is valid', () => {
        return expect(cppUtils.compileWithGPlus(sourceFile, executableFile, true)).resolves.toBeDefined();
      });

      it('Has correct output', (done) => {
        const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;
        exec(commandToRun)
          .then(({ stdout, stderr }) => {
            if (stdout.trim() === expectedOutputString) {
              done();
            }
          })
          .catch((err) => {
            done(err);
          });
      });

      afterAll(() => {
        return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
      });
    });
  });
});
