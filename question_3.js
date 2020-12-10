'use strict';

// example inputs
const relation = [
  ['100', 'ryan', 'music', '2'],
  ['200', 'apeach', 'math', '2'],
  ['300', 'tube', 'computer', '3'],
  ['400', 'con', 'computer', '4'],
  ['500', 'muzi', 'music', '3'],
  ['600', 'apeach', 'music', '2'],
];

// 1. The length of the relation column is 1 ~ 8.
// 2. The length of the relation row is 1 ~ 20.
// 3. The length of all strings is 1 ~ 8.
/*
 * function columnLengthCheck(countable, min, max) {
 *   if (countable.length < min || countable.length > max) return false;
 *   return true;
 * }
 */

// 3. Consists of only lowercase letters and numbers.
/*
 * function stringCheck(arr) {
 *   const wordRule = /[^a-z0-9]/;
 *
 *   for (let i = 0; i < arr.length; i++) {
 *     if (wordRule.test(arr[i])) return false;
 *   }
 *
 *   return true;
 * }
 */

function solution(relation) {
  let answer = 2;

  const uniqueRows = [];

  for (let i = 0; i < relation.length - 1; i++) {
    const uniquePerIteration = [];
    for (let j = 0; j < relation[i].length; j++) {
      if (relation[i][j] !== relation[i + 1][j]) {
        uniquePerIteration.push(j);
      }
    }

    uniqueRows.push(uniquePerIteration);
  }

  // I cannot process the logic in translate those into codes in this question.

  return answer;
}

console.log(solution(relation));
