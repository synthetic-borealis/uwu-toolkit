import * as cppUtils from 'cpp-utils';
import fs from 'fs/promises';
import util from 'util';
import childProcess from 'child_process';
import { LoopBoundaryMismatchError, compileToC } from '../src';
import { helloUwu, invalidUwu, userInputCode } from '../test-utils/constants';

const exec = util.promisify(childProcess.exec);
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_c${exeExtension}`;
const sourceFile = 'test_c.c';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

describe('Compilation to C', () => {
  describe('Error handling', () => {
    it('Throws LoopBoundaryMismatchError when loop boundaries are mismatching', () => {
      expect(() => compileToC(invalidUwu)).toThrow(LoopBoundaryMismatchError);
    });
  });
  describe('Code generation', () => {
    beforeAll(() => {
      const outputCode = compileToC(helloUwu);
      return fs.writeFile(sourceFile, outputCode);
    });
    afterAll(() => Promise.all([
      fs.unlink(sourceFile),
      fs.unlink(executableFile),
    ]));
    it(
      'Generates valid & correct code',
      () => cppUtils.compileWithGcc(sourceFile, executableFile, true)
        .then(() => exec(commandToRun))
        .then(({ stdout }) => {
          expect(stdout.trim()).toBe('Hewwo Wowwd!');
        }),
    );
  });
  describe('Code generation (with user input)', () => {
    const inputChar = 'a';
    const wrapper = () => new Promise((resolve, reject) => {
      const child = childProcess.exec(`${commandToRun}`, (error, stdout) => {
        if (error) {
          reject(error);
        }
        resolve(stdout);
      });
      child.stdin?.write(`${inputChar}\n`);
    });
    beforeAll(() => {
      const outputCode = compileToC(userInputCode);
      return fs.writeFile(sourceFile, outputCode);
    });
    // noinspection DuplicatedCode
    afterAll(() => Promise.all([
      fs.unlink(sourceFile),
      fs.unlink(executableFile),
    ]));
    it(
      'Generates valid & correct code',
      () => cppUtils.compileWithGcc(sourceFile, executableFile, true)
        .then(() => wrapper())
        .then((out) => expect(out)
          .toBe(inputChar)),
    );
  });
});
