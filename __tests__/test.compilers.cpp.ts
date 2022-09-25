import * as cppUtils from 'cpp-utils';
import fs from 'fs/promises';
import util from 'util';
import childProcess from 'child_process';
import { LoopBoundaryMismatchError, compileToCpp } from '../src';
import { helloUwu, invalidUwu, userInputCode } from '../test-utils/constants';

const exec = util.promisify(childProcess.exec);
const exeExtension = process.platform === 'win32' ? '.exe' : '';
const executableFile = `test_cpp${exeExtension}`;
const sourceFile = 'test_cpp.cpp';
const commandToRun = process.platform === 'win32' ? executableFile : `./${executableFile}`;

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fs.writeFile(sourceFile, codeToCheck));
  afterAll(() => Promise.all([
    fs.unlink(executableFile),
    fs.unlink(sourceFile),
  ]));
  it(
    'Generates valid & correct code',
    () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
      .then(() => exec(commandToRun))
      .then(({ stdout }) => {
        expect(stdout.trim())
          .toBe('Hewwo Wowwd!');
      }),
  );
}

describe('Compilation to C++', () => {
  describe('Error handling', () => {
    it('Throws LoopBoundaryMismatchError when loop boundaries are mismatching', () => {
      expect(() => compileToCpp(invalidUwu)).toThrow(LoopBoundaryMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToCpp(helloUwu));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToCpp(helloUwu, false));
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
      const outputCode = compileToCpp(userInputCode);
      return fs.writeFile(sourceFile, outputCode);
    });
    // noinspection DuplicatedCode
    afterAll(() => Promise.all([
      fs.unlink(sourceFile),
      fs.unlink(executableFile),
    ]));
    it(
      'Generates valid & correct code',
      () => cppUtils.compileWithGPlus(sourceFile, executableFile, true)
        .then(() => wrapper())
        .then((out) => expect(out)
          .toBe(inputChar)),
    );
  });
});
