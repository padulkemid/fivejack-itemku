'use strict';

// example inputs
const recordTest1 = [
  'Enter uid1234 Muzi',
  'Enter uid4567 Prodo',
  'Leave uid1234',
  'Enter uid1234 Prodo',
  'Change uid4567 Ryan',
];

const recordTest2 = [
  'Enter uid1234 Muzi',
  'Enter uid4567 Prodo',
  'Leave uid1234',
  'Enter uid1234 Prodo',
  'Change uid4567 Ryan',
  'Leave uid4567 Ryan',
  'Enter uid4567 Steve',
  'Enter uid890 Steve!@$!@#',
  'Enter uid1203710237912387, Verylongnameindeedtobepreciselyyes',
  'Enter uid Ane',
];

// change its nickname based on entering command / changing command with uid
function changeNickname(arr, uid, name) {
  arr.forEach((data, i) => {
    const { uid: arrUid, msg: arrMsg } = data;
    let splittedMsg = arrMsg.split(' ');

    if (arrUid === uid) {
      splittedMsg[0] = name;
      const combinedMsg = splittedMsg.join(' ');

      arr[i].msg = combinedMsg;
    }
  });
}

// leave the chat with uid
function leaveChat(arr, uid) {
  arr.forEach((data) => {
    const { uid: arrUid, msg: arrMsg } = data;
    const [arrName] = arrMsg.split(' ');

    if (arrUid === uid) {
      arr.push({ uid, msg: `${arrName} has left.` });
    }
  });
}

// rebuild the 'log' array to just use the msg key since it contains the
// message.
function rebuildLog(arr) {
  arr.forEach((data, i) => {
    const { msg } = data;
    arr[i] = msg;
  });
}

// 1. Each word is separated by a space and consists of only uppercase and
// lowercase letters.
function wordCheck(str) {
  const wordRule = /[^A-Za-z0-9\s]/;

  return wordRule.test(str);
}

// 2. The length of the user ID and nickname is 1 ~ 10.
function lengthCheck(str) {
  const [, uid, name] = str.split(' ');
  const realUid = uid.split('').slice(3).join('');

  if (realUid.length < 1 || realUid.length > 10) return false;

  if (name !== undefined) {
    if (name.length < 1 || name.length > 10) return false;
  }

  return true;
}

function solution(record) {
  const answer = [];

  for (let i = 0; i < record.length; i++) {
    // check limitations
    if (wordCheck(record[i])) continue;
    if (!lengthCheck(record[i])) continue;

    // run the command
    const [command, uid, name] = record[i].split(' ');

    if (command === 'Enter') {
      // check for available uids and mutate its name based on uid.
      changeNickname(answer, uid, name);

      // should push new answer log if there isn't same uid detected.
      answer.push({ uid, msg: `${name} came in.` });
    }

    if (command === 'Leave') leaveChat(answer, uid);

    if (command === 'Change') changeNickname(answer, uid, name);
  }

  // rebuild answer ( mutate its object to just return the msg key )
  rebuildLog(answer);

  return answer;
}

console.log(solution(recordTest1)); // ['Prodo came in.'. 'Ryan came in.', 'Prodo has left.' , 'Prodo came in.']
console.log(solution(recordTest2)); // ['Prodo came in.', 'Steve came in.', 'Prodo has left.', 'Prodo came in.', 'Steve has left.', 'Steve came in.']
