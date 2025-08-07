/*
[2단계] 서버 증설 횟수
(2025 프로그래머스 코드챌린지 2차 예선)
*/

const TOTAL_TIMES = 24;

function solution(players, m, k) {
  var answer = 0;
  let servers = Array.from({ length: TOTAL_TIMES }, () => 0);

  for (let i = 0; i < players.length; i++) {
    const requiredServerAmount = getRequiredServerAmount(players[i], m);
    // 추가로 필요한 경우
    if (servers[i] < requiredServerAmount) {
      answer += requiredServerAmount - servers[i];
      incrementServer(servers, requiredServerAmount - servers[i], i, k);
    }
  }

  return answer;
}

// 추가로 필요한 서버 개수를 반환하는 함수
function getRequiredServerAmount(playerCount, m) {
  return Math.floor(playerCount / m);
}

// 주어진 서버 개수 배열에 특정 시간부터 k시간동안 서버 개수를 늘리는 함수
function incrementServer(servers, amount, hour, k) {
  for (let i = hour; i < hour + k && i < TOTAL_TIMES; i++) {
    servers[i] += amount;
  }
}
