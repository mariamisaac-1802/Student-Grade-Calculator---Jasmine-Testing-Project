// Quick demo: node src/index.js
const { processStudentRecord } = require('./gradeCalculator');
console.log(JSON.stringify(processStudentRecord({
  name: 'Mariam',
  courses: [{ name: 'Math', scores: [95, 90, 100] }, { name: 'Physics', scores: [75, 80, 70] }]
}), null, 2));
