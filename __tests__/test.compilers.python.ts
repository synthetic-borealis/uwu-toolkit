import { PythonShell } from 'python-shell';
import fs from 'fs/promises';
import { LoopBoundaryMismatchError, compileToPython } from '../src';
import { helloUwu, invalidUwu } from '../test-utils/constants';

const userInputCode = '>w< @w@';
const sourceFile = 'test_py.py';

function checkGeneratedCode(codeToCheck: string) {
  const wrapper = () => new Promise((resolve, reject) => {
    PythonShell.runString(codeToCheck, undefined, (err, output) => {
      if (err) {
        reject(err);
      }
      resolve((output as string[])[0]);
    });
  });
  it('Generates  valid & correct code', () => wrapper()
    .then((output) => {
      expect(output)
        .toBe('Hewwo Wowwd!');
    }));
}

describe('Compilation to Python', () => {
  describe('Error handling', () => {
    it('Throws LoopBoundaryMismatchError when loop boundaries are mismatching', () => {
      expect(() => compileToPython(invalidUwu)).toThrow(LoopBoundaryMismatchError);
    });
  });
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToPython(helloUwu));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToPython(helloUwu, false));
  });
  describe('Code generation (with user input)', () => {
    beforeAll(() => {
      const outputCode = compileToPython(userInputCode);
      return fs.writeFile(sourceFile, outputCode);
    });
    afterAll(() => fs.unlink(sourceFile));
    it('Generates valid & correct code', () => {
      const inputChar = 'a';
      const wrapper = () => new Promise((resolve, reject) => {
        const pyShell = new PythonShell(sourceFile);
        pyShell.on('message', (message) => {
          resolve(message);
        });
        pyShell.on('error', (error) => {
          reject(error);
        });
        pyShell.on('pythonError', (error) => {
          reject(error);
        });
        pyShell.stdin.write(`${inputChar}\n`);
      });
      return wrapper()
        .then((out) => {
          expect(out)
            .toBe(inputChar);
        });
    });
  });
});
