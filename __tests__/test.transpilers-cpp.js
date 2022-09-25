const uwuTK = require('../src');
const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { helloUwu } = require('../lib/constants');
const expectedOutputString = 'Hewwo Wowwd!';

describe('Transpilers tests', () => {
  describe('transpileToCpp tests (dynamic memory)', () => {
    const outputCode = uwuTK.transpileToCpp(helloUwu, true);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.cpp';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid C++ code', () => {
      return expect(cppUtils.compileWithGPlus(sourceFile, executableFile, true)).resolves.toBeDefined();
    });

    describe('Generated C++ code', () => {
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
    });

    afterAll(() => {
      return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
    });
  });

  describe('transpileToCpp tests (fixed memory)', () => {
    const outputCode = uwuTK.transpileToCpp(helloUwu, false);
    const exeExtension = process.platform === 'win32' ? '.exe' : '';
    const executableFile = `test${exeExtension}`;
    const sourceFile = 'test.cpp';

    beforeAll(() => {
      return fs.writeFile(sourceFile, outputCode);
    });

    it('Generates valid C++ code', () => {
      return expect(cppUtils.compileWithGPlus(sourceFile, executableFile, true)).resolves.toBeDefined();
    });

    describe('Generated C++ code', () => {
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
    });

    afterAll(() => {
      return Promise.all([fs.unlink(sourceFile), fs.unlink(executableFile)]);
    });
  });
});
