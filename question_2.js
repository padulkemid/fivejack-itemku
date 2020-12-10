'use strict';

// example inputs
const users1 = [2, 1, 2, 6, 2, 4, 3, 3];
const users2 = [4, 4, 4, 4, 4];

// mutates the arr with sort ( for the failureRate ) then removes the obj to
// replace all the data with only the stages.
function rebuildLogAndSort(arr) {
  arr.sort((a, b) => b.failureRate - a.failureRate);
  arr.forEach((data, i) => {
    const { stage } = data;
    arr[i] = stage;
  });
}

function solution(N, users) {
  const answer = [];

  // need to sort the users arr with ascending order, to ease the stage
  // comparison.
  const sortedUsers = users.sort((a, b) => a - b);

  // count the stage ( same as the array length ).
  let stageCompleted = sortedUsers.length;

  for (let i = 1; i <= N; i++) {
    let countUser = 0;

    for (let j = 0; j < sortedUsers.length; j++) {
      if (sortedUsers[j] === i) {
        countUser += 1;
      }
    }

    answer.push({ stage: i, failureRate: countUser / stageCompleted });

    // minus the stage completed with counted user completed the stage.
    stageCompleted -= countUser;
  }

  // mutates the answer array to only just include stages.
  rebuildLogAndSort(answer);

  return answer;
}

console.log(solution(5, users1)); // [3, 4, 2, 1, 5]
console.log(solution(4, users2)); // [4, 1, 2, 3]
