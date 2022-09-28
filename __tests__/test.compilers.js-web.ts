import { compileToJsWeb } from '../src';
import { helloUwu } from '../test-utils/constants';

function checkGeneratedCode(codeToCheck: string) {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const generatedFunction = new Function(`${codeToCheck} return main().output;`);
  it('Generates valid code', () => {
    expect(generatedFunction).not.toThrow();
  });
  it('Generates correct code', () => {
    expect(generatedFunction().trim()).toBe('Hewwo Wowwd!');
  });
}

describe('Compilation to JavaScript (Web)', () => {
  describe('Code generation (dynamic array)', () => {
    checkGeneratedCode(compileToJsWeb(helloUwu));
  });
  describe('Code generation (fixed array)', () => {
    checkGeneratedCode(compileToJsWeb(helloUwu, false));
  });
});
