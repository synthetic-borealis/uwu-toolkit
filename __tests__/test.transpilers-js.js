const uwuTK = require('../index');
const fs = require('fs/promises');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { helloUwu, invalidUwu } = require('../lib/constants');
const expectedOutputString = 'Hewwo Wowwd!';

describe('transpileToJsWeb (static memory)', () => {
  let outputCode;
  let hewwoWowwd;

  it('Throws an error when input has incorrect type', () => {
    expect(() => {
      uwuTK.transpileToJsWeb([2, 9, 4]);
    }).toThrow();
  });

  it('Throws an error when input is not a valid program', () => {
    expect(() => {
      uwuTK.transpileToJsWeb(invalidUwu);
    }).toThrow();
  });

  it('Does not throw error when input is a valid program', () => {
    expect(() => {
      outputCode = uwuTK.transpileToJsWeb(helloUwu, false);
    }).not.toThrow();
  });

  it('Generates valid JavaScript', () => {
    hewwoWowwd = new Function(`${outputCode}return main();`);
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

describe('transpileToJsWeb (dynamic memory)', () => {
  let hewwoWowwd;

  it('Generates valid JavaScript', () => {
    const outputCode = uwuTK.transpileToJsWeb(helloUwu, true);
    hewwoWowwd = new Function(`${outputCode}return main();`);
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

describe('transpileToJsCli tests (dynamic memory)', () => {
  const outputCode = uwuTK.transpileToJsCLI(helloUwu, true);
  const sourceFile = 'test.js';

  beforeAll(() => {
    return fs.writeFile(sourceFile, outputCode);
  });

  it('Generates valid JavaScript', (done) => {
    exec(`node ${sourceFile}`)
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  describe('Generated JavaScript code', () => {
    it('Has correct output', (done) => {
      exec(`node ${sourceFile}`)
      .then(({stdout}) => {
        if (stdout.trim() === expectedOutputString) {
          done();
        } else {
          done(new Error('Incorrect output'));
        }
      })
      .catch((err) => done(err));
    });
  });

  afterAll(() => {
    return fs.unlink(sourceFile);
  });
});

describe('transpileToJsCli tests (fixed memory)', () => {
  const outputCode = uwuTK.transpileToJsCLI(helloUwu, false);
  const sourceFile = 'test.js';

  beforeAll(() => {
    return fs.writeFile(sourceFile, outputCode);
  });

  it('Generates valid JavaScript', (done) => {
    exec(`node ${sourceFile}`)
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  describe('Generated JavaScript code', () => {
    it('Has correct output', (done) => {
      exec(`node ${sourceFile}`)
      .then(({stdout}) => {
        if (stdout.trim() === expectedOutputString) {
          done();
        } else {
          done(new Error('Incorrect output'));
        }
      })
      .catch((err) => done(err));
    });
  });

  afterAll(() => {
    return fs.unlink(sourceFile);
  });
});
