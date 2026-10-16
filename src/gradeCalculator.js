'use strict';
/**
 * Student Grade Calculator
 * Modules (functions) that interact:
 *   validateScore()        -> checks one score is a number in [0, 100]
 *   calculateAverage()     -> uses validateScore() on every score
 *   calculateWeighted()    -> uses validateScore() + weight checks
 *   getLetterGrade()       -> uses validateScore()
 *   getGradePoints()       -> maps a letter grade to 4.0-scale points
 *   processStudentRecord() -> orchestrates all of the above for a full record
 */

/** Validate a single score. Returns the score if valid, otherwise throws. */
function validateScore(score) {
  if (typeof score !== 'number' || Number.isNaN(score)) {
    throw new TypeError('Score must be a number');
  }
  if (score < 0 || score > 100) {
    throw new RangeError('Score must be between 0 and 100');
  }
  return score;
}

/** Simple average of an array of scores, rounded to 2 decimals. */
function calculateAverage(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new TypeError('Scores must be a non-empty array');
  }
  const total = scores.reduce((sum, s) => sum + validateScore(s), 0);
  return Math.round((total / scores.length) * 100) / 100;
}

/**
 * Weighted grade. items = [{ score, weight }], weights must sum to 1 (100%).
 * Example: [{score: 80, weight: 0.4}, {score: 90, weight: 0.6}] -> 86
 */
function calculateWeighted(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new TypeError('Items must be a non-empty array');
  }
  let weightSum = 0;
  let total = 0;
  for (const { score, weight } of items) {
    validateScore(score);
    if (typeof weight !== 'number' || Number.isNaN(weight) || weight < 0 || weight > 1) {
      throw new RangeError('Weight must be a number between 0 and 1');
    }
    weightSum += weight;
    total += score * weight;
  }
  if (Math.abs(weightSum - 1) > 1e-9) {
    throw new RangeError('Weights must sum to 1');
  }
  return Math.round(total * 100) / 100;
}

/** Convert a numeric score to a letter grade (A>=90, B>=80, C>=70, D>=60, else F). */
function getLetterGrade(score) {
  validateScore(score);
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

/** Convert a letter grade to 4.0-scale grade points. */
function getGradePoints(letter) {
  const table = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 };
  if (typeof letter !== 'string' || !(letter in table)) {
    throw new TypeError('Invalid letter grade');
  }
  return table[letter];
}

/**
 * Process a full academic record.
 * record = { name, courses: [{ name, scores: [numbers] }] }
 * Returns per-course average/letter/points plus overall GPA and status.
 */
function processStudentRecord(record) {
  if (!record || typeof record.name !== 'string' || !Array.isArray(record.courses) || record.courses.length === 0) {
    throw new TypeError('Record must have a name and a non-empty courses array');
  }
  const courses = record.courses.map((course) => {
    const average = calculateAverage(course.scores);       // module 1
    const letter = getLetterGrade(average);                // module 2 (fed by module 1)
    const points = getGradePoints(letter);                 // module 3 (fed by module 2)
    return { name: course.name, average, letter, points };
  });
  const gpa = Math.round((courses.reduce((s, c) => s + c.points, 0) / courses.length) * 100) / 100;
  return { student: record.name, courses, gpa, status: gpa >= 1.0 ? 'PASS' : 'FAIL' };
}

module.exports = {
  validateScore, calculateAverage, calculateWeighted,
  getLetterGrade, getGradePoints, processStudentRecord
};
