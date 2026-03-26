/**
 * [1단계] 노란불 신호등
 * (2025 카카오 하반기 1차)
 */

function solution(signals) {
  let colors = [];
  let intervals = []; // 각 신호의 주기(g + y + r)

  // 각 신호등별로 색깔 패턴을 만든다
  for (let i = 0; i < signals.length; i++) {
    let [g, y, r] = signals[i];
    colors[i] = [];
    for (let time = 0; time < g + y + r; time++) {
      if (time < g) colors[i][time] = "G";
      else if (time < g + y) colors[i][time] = "Y";
      else colors[i][time] = "R";
    }
    intervals[i] = g + y + r;
  }

  // 완전탐색으로 사이클을 모두 돌려본다
  const maxInterval = intervals.reduce((acc, cur) => acc * cur, 1);
  for (let time = 1; time <= maxInterval; time++) {
    let isAllYellow = true;
    for (let index = 0; index < signals.length; index++) {
      if (colors[index][(time - 1) % intervals[index]] !== "Y") {
        isAllYellow = false;
        break;
      }
    }

    if (isAllYellow) return time;
  }

  return -1;
}
