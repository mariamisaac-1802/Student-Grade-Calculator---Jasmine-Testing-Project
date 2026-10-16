# Student Grade Calculator - Jasmine Testing Project

A modular JavaScript Student Grade Calculator, tested with the Jasmine framework using unit tests and integration tests. Built for a Software Testing assignment.

## Features

- Validates scores (must be a number from 0 to 100)
- Calculates simple averages and weighted grades
- Converts scores to letter grades (A-F) and 4.0-scale grade points
- Processes a full student record into per-course results, an overall GPA, and a PASS/FAIL status

## Project Structure

```
student-grade-calculator/
├── package.json
├── README.md
├── REPORT.md                  # Test report and explanations
├── src/
│   ├── gradeCalculator.js     # Application code (all functions)
│   └── index.js               # Small demo
└── spec/
    ├── support/jasmine.json   # Jasmine configuration
    ├── unit.spec.js           # Part 1: unit tests
    └── integration.spec.js    # Part 2: integration tests
```

## Functions

| Function | Purpose |
|---|---|
| `validateScore(score)` | Throws if the score is not a number between 0 and 100 |
| `calculateAverage(scores)` | Average of an array of scores, rounded to 2 decimals |
| `calculateWeighted(items)` | Weighted grade from `[{ score, weight }]`; weights must sum to 1 |
| `getLetterGrade(score)` | A (90+), B (80+), C (70+), D (60+), otherwise F |
| `getGradePoints(letter)` | Converts a letter grade to 4.0-scale points |
| `processStudentRecord(record)` | Combines all of the above for a whole academic record |

## Getting Started

**Requirements:** [Node.js](https://nodejs.org) (v18 or later recommended)

```bash
# 1. Install dependencies
npm install

# 2. Run the tests
npm test

# 3. (Optional) Run the demo
node src/index.js
```

Expected result: `20 specs, 0 failures`

## Example

```js
const { processStudentRecord } = require('./src/gradeCalculator');

const result = processStudentRecord({
  name: 'Sara',
  courses: [
    { name: 'Math', scores: [95, 90, 100] },
    { name: 'Physics', scores: [75, 80, 70] }
  ]
});

console.log(result.gpa);    // 3
console.log(result.status); // 'PASS'
```

## Testing Overview

**Unit tests (14 specs)** test each function in isolation:
- Normal inputs and rounding
- Boundary scores: 0, 59, 60, 89, 90, 100
- Invalid inputs: negative numbers, values above 100, strings, `NaN`, empty arrays, bad weights, invalid letter grades

**Integration tests (6 specs)** test the functions working together:
- `calculateAverage` to `getLetterGrade`
- `calculateWeighted` to `getLetterGrade` to `getGradePoints`
- The full `processStudentRecord` pipeline, including error propagation

**Unit vs integration:** a unit test checks that one function follows its own rules. An integration test checks that the functions give correct results when one's output feeds the next.

See [REPORT.md](REPORT.md) for the full test report, the unit vs integration comparison, and notes on simulated bugs and how they were fixed.

## Technologies

- JavaScript (Node.js)
- [Jasmine](https://jasmine.github.io/) testing framework

## Author

Mariam Isaac - Software Testing course assignment
