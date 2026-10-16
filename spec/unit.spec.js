'use strict';
// PART 1 - UNIT TESTING: each function tested in isolation.
const calc = require('../src/gradeCalculator');

describe('Unit: getLetterGrade', () => {
  it('returns correct letters for normal scores', () => {
    expect(calc.getLetterGrade(95)).toBe('A');
    expect(calc.getLetterGrade(85)).toBe('B');
    expect(calc.getLetterGrade(75)).toBe('C');
  });
  it('handles boundary scores 0, 59, 60, 89, 90, 100', () => {
    expect(calc.getLetterGrade(0)).toBe('F');
    expect(calc.getLetterGrade(59)).toBe('F');
    expect(calc.getLetterGrade(60)).toBe('D');
    expect(calc.getLetterGrade(89)).toBe('B');
    expect(calc.getLetterGrade(90)).toBe('A');
    expect(calc.getLetterGrade(100)).toBe('A');
  });
  it('rejects invalid inputs (negative, >100, string, NaN)', () => {
    expect(() => calc.getLetterGrade(-1)).toThrowError(RangeError);
    expect(() => calc.getLetterGrade(101)).toThrowError(RangeError);
    expect(() => calc.getLetterGrade('90')).toThrowError(TypeError);
    expect(() => calc.getLetterGrade(NaN)).toThrowError(TypeError);
  });
});

describe('Unit: calculateAverage', () => {
  it('computes the average of normal scores', () => {
    expect(calc.calculateAverage([80, 90, 100])).toBe(90);
  });
  it('rounds to 2 decimals', () => {
    expect(calc.calculateAverage([70, 71, 72, 73])).toBe(71.5);
    expect(calc.calculateAverage([100, 100, 99])).toBe(99.67);
  });
  it('handles edge cases: single score and all zeros / all 100s', () => {
    expect(calc.calculateAverage([59])).toBe(59);
    expect(calc.calculateAverage([0, 0, 0])).toBe(0);
    expect(calc.calculateAverage([100, 100])).toBe(100);
  });
  it('rejects empty array, non-array, and invalid scores', () => {
    expect(() => calc.calculateAverage([])).toThrowError(TypeError);
    expect(() => calc.calculateAverage('80,90')).toThrowError(TypeError);
    expect(() => calc.calculateAverage([80, -5])).toThrowError(RangeError);
    expect(() => calc.calculateAverage([80, 'abc'])).toThrowError(TypeError);
  });
});

describe('Unit: calculateWeighted', () => {
  it('computes a weighted grade', () => {
    expect(calc.calculateWeighted([{ score: 80, weight: 0.4 }, { score: 90, weight: 0.6 }])).toBe(86);
  });
  it('rejects weights that do not sum to 1', () => {
    expect(() => calc.calculateWeighted([{ score: 80, weight: 0.5 }, { score: 90, weight: 0.6 }])).toThrowError(RangeError);
  });
  it('rejects out-of-range weight and invalid score', () => {
    expect(() => calc.calculateWeighted([{ score: 80, weight: -0.2 }, { score: 90, weight: 1.2 }])).toThrowError(RangeError);
    expect(() => calc.calculateWeighted([{ score: 150, weight: 1 }])).toThrowError(RangeError);
  });
});

describe('Unit: getGradePoints', () => {
  it('maps letters to 4.0-scale points', () => {
    expect(calc.getGradePoints('A')).toBe(4.0);
    expect(calc.getGradePoints('D')).toBe(1.0);
    expect(calc.getGradePoints('F')).toBe(0.0);
  });
  it('rejects invalid letters', () => {
    expect(() => calc.getGradePoints('E')).toThrowError(TypeError);
    expect(() => calc.getGradePoints(4)).toThrowError(TypeError);
  });
});

describe('Unit: validateScore', () => {
  it('accepts boundaries 0 and 100 and returns the value', () => {
    expect(calc.validateScore(0)).toBe(0);
    expect(calc.validateScore(100)).toBe(100);
  });
});
