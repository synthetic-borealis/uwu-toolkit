import fs from 'fs/promises';
import util from 'util';
import childProcess from 'child_process';
import { compileToJsNode } from '../src';
import { helloUwu, userInputCode } from '../test-utils/constants';

const exec = util.promisify(childProcess.exec);
const sourceFile = 'test_js_node.js';

function checkGeneratedCode(codeToCheck: string) {
  beforeAll(() => fs.writeFile(sourceFile, codeToCheck));
  afterAll(() => fs.unlink(sourceFile));
  it('Generates valid & correct code', () => exec(`node ${sourceFile}`)
    .then(({ stdout }) => {
      expect(stdout.trim()).toBe('Hewwo Wowwd!');
    }));
}

describe('Compilation to JavaScript (Node.js)', () => {
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToJsNode(helloUwu));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToJsNode(helloUwu, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = compileToJsNode(userInputCode);
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
