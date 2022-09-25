const uwuTK = require('../src');
const cppUtils = require('cpp-utils');
const fs = require('fs/promises');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { helloUwu } = require('../lib/constants');
const expectedOutputString = 'Hewwo Wowwd!';

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
