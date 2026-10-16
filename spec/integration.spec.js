'use strict';
// PART 2 - INTEGRATION TESTING: functions working together.
// Chain under test: calculateAverage -> getLetterGrade -> getGradePoints -> processStudentRecord
const calc = require('../src/gradeCalculator');

describe('Integration: scores -> average -> letter grade', () => {
  it('classifies raw scores through the average calculator', () => {
    const avg = calc.calculateAverage([88, 92, 90]);        // 90
    expect(calc.getLetterGrade(avg)).toBe('A');
  });
  it('an average just below a boundary falls in the lower grade', () => {
    const avg = calc.calculateAverage([89, 90, 89]);        // 89.33
    expect(calc.getLetterGrade(avg)).toBe('B');
  });
  it('propagates validation errors from the average step', () => {
    expect(() => calc.getLetterGrade(calc.calculateAverage([70, 105]))).toThrowError(RangeError);
  });
});

describe('Integration: weighted grade -> letter -> points', () => {
  it('feeds a weighted result into classification and GPA mapping', () => {
    const weighted = calc.calculateWeighted([
      { score: 70, weight: 0.3 }, { score: 95, weight: 0.7 }  // 87.5
    ]);
    const letter = calc.getLetterGrade(weighted);
    expect(letter).toBe('B');
    expect(calc.getGradePoints(letter)).toBe(3.0);
  });
});

describe('Integration: processStudentRecord (full pipeline)', () => {
  it('produces course results and an overall GPA', () => {
    const result = calc.processStudentRecord({
      name: 'Mariam',
      courses: [
        { name: 'Math', scores: [95, 90, 100] },   // 95    -> A -> 4
        { name: 'Physics', scores: [75, 80, 70] }, // 75    -> C -> 2
        { name: 'History', scores: [50, 55, 40] }  // 48.33 -> F -> 0
      ]
    });
    expect(result.courses.map(c => c.letter)).toEqual(['A', 'C', 'F']);
    expect(result.gpa).toBe(2);
    expect(result.status).toBe('PASS');
  });
  it('marks an all-failing record as FAIL', () => {
    const result = calc.processStudentRecord({ name: 'Sam', courses: [{ name: 'Art', scores: [10, 20] }] });
    expect(result.gpa).toBe(0);
    expect(result.status).toBe('FAIL');
  });
  it('fails the whole record when one course has an invalid score', () => {
    expect(() => calc.processStudentRecord({
      name: 'Lee', courses: [{ name: 'Bio', scores: [80, -3] }]
    })).toThrowError(RangeError);
  });
});
