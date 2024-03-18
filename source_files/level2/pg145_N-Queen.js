/* 
[2단계] N-Queen
(연습문제)
*/

console.log(solution(4));

function solution(n) {
    let answer = 0;

    // DFS 방식으로 퀸을 배치해나가는 함수
    function dfs(queens, [currentRow, currentCol]) {
        // 다른 퀸들과 현재 넣을 퀸이 서로 공격할 수 있는지 체크
        for (let queen of queens) {
            if (!noInterrupt(queen, [currentRow, currentCol])) return; // 공격할 수 있으면 더 고려하지 않음
        }

        // 현재 퀸까지 모든 퀸을 넣은 경우
        if (currentCol === n - 1) {
            answer++;
            return;
        }

        // 다음 열에 퀸 대입하여 조사
        let newQueens = [...queens, [currentRow, currentCol]];

        for (let i = 0; i < n; i++) {
            // 직전 퀸과 공격할 수 있는 경우 제외
            if (Math.abs(i - currentRow) <= 1) continue;

            // 해당 위치에 퀸 대입
            dfs(newQueens, [i, currentCol + 1]);
        }
    }

    // 0 - (n-1)행까지 0열에 퀸 대입해가며 탐색
    for (let row = 0; row < n; row++)
        dfs([], [row, 0]);

    return answer;
}

// 특정 두 좌표의 퀸이 서로 공격할 수 있는지 판별하는 함수
function noInterrupt([r1, c1], [r2, c2]) {
    // 일직선상에 있는지 체크
    if (r1 === r2 || c1 === c2) return false;

    // \선상에 있는지 체크
    if (c1 - r1 === c2 - r2) return false;

    // /선상에 있는지 체크
    if (c1 + r1 === c2 + r2) return false;

    // 그 외
    return true;
}