/*
[3단계] 산 모양 타일링
(2024 KAKAO WINTER INTERNSHIP)
*/

function solution(n, tops) {
  let dp = {
    rightFilled: [0], // n = k에서의 사다리꼴 중 맨 오른쪽 삼각형이 마름모 형태로 채워지지 않은 횟수(k + 1에서 삼각형이나 마름모가 될 수 있음)
    rightEmpty: [1], // n = k에서의 사다리꼴 중 맨 오른쪽 삼각형이 마름모 형태로 채워진 횟수
  };

  // DP 방식으로, 맨 오른쪽 삼각형이 마름모로 채워지거나 채워지지 않는 각 케이스마다 더해간다
  for (let i = 0; i < n; i++) {
    dp.rightFilled[i + 1] = (dp.rightEmpty[i] + dp.rightFilled[i]) % 10007;
    dp.rightEmpty[i + 1] =
      (dp.rightEmpty[i] * (2 + tops[i]) + dp.rightFilled[i] * (1 + tops[i])) %
      10007;
  }

  return (dp.rightFilled[n] + dp.rightEmpty[n]) % 10007;
}
