/*
[3단계] 코딩 테스트 공부
(2022 KAKAO TECH INTERNSHIP)
*/

/* 1st try: DP로 풀었으나, 효율성 테스트 3번과 10번에서 시간 초과가 남. 아무리 최적화해도 안 되어서, 추후 최적화 방안을 더 찾아봐야 할 것 같음. */
function solution(alp, cop, problems) {
  const maxAlp = getMax(problems, 0),
    maxCop = getMax(problems, 1);

  // DP 방식으로 최소 cost를 갱신한다. 초기값은 알고리즘 공부 & 코딩 공부로 올린 케이스로 설정한다.
  let dp = Array.from({ length: maxAlp + 1 }, (v1, row) =>
    Array.from(
      { length: maxCop + 1 },
      (v2, col) => (row > alp ? row - alp : 0) + (col > cop ? col - cop : 0)
    )
  );

  // DP 방식으로, 현 alp와 cop에서 각 문제를 풀면서 갱신한다
  for (let currentAlp = 0; currentAlp <= maxAlp; currentAlp++) {
    for (let currentCop = 0; currentCop <= maxCop; currentCop++) {
      if (currentAlp === maxAlp && currentCop === maxCop) break;

      for (let prob of problems) {
        if (currentAlp < prob[0] || currentCop < prob[1]) continue;

        // 문제를 푼 뒤 도달하는 알고력과 코딩력(max를 넘어가는 경우 max로 조정)
        const nextAlp =
            currentAlp + prob[2] <= maxAlp ? currentAlp + prob[2] : maxAlp,
          nextCop =
            currentCop + prob[3] <= maxCop ? currentCop + prob[3] : maxCop;

        if (dp[currentAlp][currentCop] + prob[4] < dp[nextAlp][nextCop]) {
          dp[nextAlp][nextCop] = dp[currentAlp][currentCop] + prob[4];
        }
      }
    }
  }

  return dp[maxAlp][maxCop];
}

// 최대 수치를 구하는 함수
function getMax(data, index) {
  let max = data[0][index];
  for (let i = 1; i < data.length; i++) {
    if (data[i][index] > max) max = data[i][index];
  }

  return max;
}
