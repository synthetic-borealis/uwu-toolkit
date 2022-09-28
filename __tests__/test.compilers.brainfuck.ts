import * as hirnfick from 'hirnfick';
import fs from 'fs/promises';
import util from 'util';
import childProcess from 'child_process';
import { compileToBrainfuck, LoopBoundaryMismatchError } from '../src';
import { helloUwu, invalidUwu, userInputCode } from '../test-utils/constants';

const exec = util.promisify(childProcess.exec);
const sourceFile = 'test_bf.js';

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fs.writeFile(sourceFile, codeToCheck));
  afterAll(() => fs.unlink(sourceFile));
  it('Generates valid & correct code', () => exec(`node ${sourceFile}`)
    .then(({ stdout }) => {
      expect(stdout.trim()).toBe('Hewwo Wowwd!');
    }));
}

describe('Compilation to Brainfuck', () => {
  describe('Error handling', () => {
    it('Throws LoopBoundaryMismatchError when loop boundaries are mismatching', () => {
      expect(() => compileToBrainfuck(invalidUwu)).toThrow(LoopBoundaryMismatchError);
    });
  });
  describe('Code generation', () => {
    checkGeneratedCode(hirnfick.compileToJsNode(compileToBrainfuck(helloUwu)));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = hirnfick.compileToJsNode(compileToBrainfuck(userInputCode));
      return fs.writeFile(sourceFile, outputCode);
    });
    afterAll(() => fs.unlink(sourceFile));
    it('Generates valid & correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const child = childProcess.exec(`node ${sourceFile}`, (error, stdout) => {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
        child.stdin?.write(`${inputChar}\n`);
      });
      return wrapper()
        .then((out) => {
          expect(out)
            .toBe(inputChar);
        });
    });
  });
});
