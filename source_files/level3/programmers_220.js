/*
[3단계] 등굣길
(연습: 동적계획법(Dynamic Programming))
*/

function solution(m, n, puddles) {
    let dp = [], isDrown = [];
    for (let i = 0; i < n; i++) {
        dp[i] = [];
        isDrown[i] = [];

        for (let j = 0; j < m; j++) {
            dp[i][j] = 0;
            isDrown[i][j] = false;
        }
    }

    // 물이 담긴 지역
    puddles.forEach(([x, y]) => {
        isDrown[y - 1][x - 1] = true;
    })

    // dp 방식으로 최단경로 개수 찾기
    dp[0][0] = 1;
    // 첫째 행에 대해
    for (let col = 1; col < m; col++) {
        dp[0][col] = isDrown[0][col] ? 0 : dp[0][col - 1];
    }
    // 첫째 열에 대해
    for (let row = 1; row < n; row++) {
        dp[row][0] = isDrown[row][0] ? 0 : dp[row - 1][0];
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j < m; j++) {
            // 물에 잠긴 곳
            if (isDrown[i][j]) dp[i][j] = 0;
            else dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000007;
        }
    }

    return dp[n - 1][m - 1];
}