# Test Report - Student Grade Calculator (Jasmine)

**Run result:** 20 specs, 0 failures (`npm test`)

## 1. Unit Testing - what was tested
Each function was tested **in isolation**, with no other function's result used as input:
- `getLetterGrade` - normal scores, boundaries (0, 59, 60, 89, 90, 100), invalid input (-1, 101, "90", NaN).
- `calculateAverage` - normal averages, 2-decimal rounding, single score, all zeros/100s, empty array, non-array, invalid scores.
- `calculateWeighted` - correct weighted result, weights not summing to 1, out-of-range weight, invalid score.
- `getGradePoints` - letter-to-points mapping and invalid letters.
- `validateScore` - accepts boundaries 0 and 100.
Total: 14 unit specs.

## 2. Integration Testing - what was tested
Components were tested **together**, so one function's real output feeds the next:
- `calculateAverage -> getLetterGrade` (raw scores to letter, including an average just below a boundary, and error propagation).
- `calculateWeighted -> getLetterGrade -> getGradePoints`.
- `processStudentRecord`, which chains average -> letter -> points -> GPA -> PASS/FAIL (normal record, failing record, invalid score inside a record).
Total: 6 integration specs.

## 3. Unit vs Integration Testing in this project
| | Unit testing | Integration testing |
|---|---|---|
| Scope | One function (e.g. `getLetterGrade(89)` returns 'B') | A chain of functions (e.g. scores -> average -> letter -> GPA) |
| Question answered | "Does this function follow its own rules?" | "Do the functions work correctly when connected?" |
| Typical failures found | Wrong boundary, missing validation | Wrong data passed between functions, errors not propagating, rounding mismatches |
| Speed/debugging | Very fast, failure points to one function | Slightly broader, failure points to an interaction |

Example: `getLetterGrade` can pass every unit test, yet the record pipeline would still be wrong if `calculateAverage` returned an unrounded value that lands on the wrong side of a boundary. Only an integration test shows that.

## 4. Simulated bugs and edge-case notes
These are simulated bugs, i.e. realistic mistakes the suite is designed to catch (they were not produced by a real failing run):
1. **Boundary operator:** `score > 90` instead of `>= 90` would give 90 a 'B'. Caught by the boundary specs (90, 60). Fix: use `>=`.
2. **NaN slipping through validation:** `typeof NaN === 'number'`, so a number-only check accepts it. Caught by the NaN spec. Fix: add `Number.isNaN` to `validateScore`.
3. **Strings coerced silently:** `"90" >= 90` is true in JS, so a string could be graded. Caught by the "90" spec. Fix: strict `typeof` check first.
4. **Floating-point weights:** 0.1 + 0.2 style sums are not exactly 1. Fix: compare with a tolerance (`1e-9`) in `calculateWeighted`.
5. **Rounding between modules:** averaging 89.995 without rounding could flip a grade. Fix: round once, inside `calculateAverage`, so downstream functions always get a consistent value (covered by the integration "just below a boundary" spec).
6. **Error propagation:** an invalid score deep in a record must fail the whole record, not be skipped. Covered by the integration spec using `-3`.

## How to run
```
npm install
npm test          # runs jasmine
node src/index.js # demo
```
