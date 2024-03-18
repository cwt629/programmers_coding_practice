/* 
[3단계] 정수 삼각형
(연습문제: 동적 계획법(Dynamic Programming))
*/

function solution(triangle) {
    var answer = 0;
    // 각 지점까지 도달한 최대값을 저장할 dp배열
    let dp = [];
    for (let i = 0; i < triangle.length; i++)
        dp[i] = [];
    
    // 초기값 지정(왼쪽과 오른쪽 변)
    dp[0][0] = triangle[0][0];
    for (let i = 1; i < triangle.length; i++){
        dp[i][0] = dp[i - 1][0] + triangle[i][0];
        dp[i][i] = dp[i - 1][i - 1] + triangle[i][i];
    }
    
    // 위에서부터 최대값 찾기
    for (let i = 2; i < triangle.length; i++){
        for (let j = 1; j < i; j++){
            // 위에서 더해질 수 있는 값 중 더 큰 값을 고른다
            let upperValue = (dp[i - 1][j - 1] > dp[i - 1][j])? dp[i - 1][j - 1] : dp[i - 1][j];
            dp[i][j] = upperValue + triangle[i][j];
        }
    }
    
    return Math.max(...dp[triangle.length - 1]);
}