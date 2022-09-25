const uwuTK = require('../src');
const { PythonShell } = require('python-shell');
const should = require('should');

const { helloUwu } = require('../lib/constants');
const expectedOutputString = 'Hewwo Wowwd!';

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
