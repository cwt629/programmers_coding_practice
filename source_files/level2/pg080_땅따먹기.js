/* 
[2단계] 땅따먹기
(연습문제)
*/

function solution(land) {
    // 직전 행의 각 열에 도착할 때의 최대 점수를 저장할 배열
    var maxScores = [0, 0, 0, 0];

    // N행까지 진행
    for (let i = 0; i < land.length; i++) {
        let nextMaxScores = [];
        // 직전의 다른 열에서 현재 열로 올 때의 최대값을 계산해나간다
        for (let j = 0; j < 4; j++) {
            let score = 0;
            for (let k = 0; k < 4; k++) {
                // 같은 열로는 연속해서 이동 불가
                if (j === k) continue;
                // 직전 다른 열까지의 최대값과 현 위치의 점수를 합쳐 최대값 갱신
                if (maxScores[k] + land[i][j] > score)
                    score = maxScores[k] + land[i][j];
            }

            // 구한 최대 점수 저장
            nextMaxScores.push(score);
        }

        // 구한 최대값 갱신
        maxScores = nextMaxScores;
    }

    // 각 열의 최대값들 중 최대값이 우리가 구할 정답
    return Math.max(...maxScores);
}