/*
[2단계] 완전범죄
(2025 프로그래머스 코드챌린지 2차 예선)
*/

function solution(info, n, m) {
  var answer = -1;

  let visited = []; // info에서의 인덱스, A도둑의 흔적, B도둑의 흔적 기준으로 visited 배열 만들기
  for (let idx = 0; idx < info.length; idx++) {
    visited[idx] = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => false)
    );
  }

  function dfs(currentIndex, a, b) {
    if (currentIndex === info.length) {
      answer = answer < 0 || answer > a ? a : answer;
      return;
    }

    // 이미 방문한적 있는 경우
    if (visited[currentIndex][a][b]) return;
    visited[currentIndex][a][b] = true;

    const nextA = a + info[currentIndex][0],
      nextB = b + info[currentIndex][1];

    if (nextA < n) {
      dfs(currentIndex + 1, nextA, b);
    }
    if (nextB < m) {
      dfs(currentIndex + 1, a, nextB);
    }
  }

  dfs(0, 0, 0);

  return answer;
}
