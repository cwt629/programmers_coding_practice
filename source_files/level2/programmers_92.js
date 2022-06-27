/* 
[2단계] 2*n 타일링
(연습문제)
*/

function solution(n) {
    // dynamic programming 구현을 위한, 각 n에 대한 방법의 수
    var dp = [1n, 1n];

    // 일종의 피보나치 형태로 구현된다(n-2번째까지 채우고 나머지 가로2개 + n-1번째까지 채우고 나머지 세로1개)
    for (let i = 2; i <= n; i++) {
        dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007n;
    }

    // 결과값 반환
    return dp[n];
}

/* 
특이점
1) 모두 bigint로 구해놓고 마지막 결과만 % 연산하면, 4/6개가 시간 초과가 뜸.
2) int로 하되 for문 안에서 %1000000007를 하면, 1/6개가 시간 초과가 뜸.
3) bigint로 하고 for문 안에서 %1000000007n을 하니, 시간이 더 빨라짐.
=> 왜 그렇지..? 아무래도 중간에 int 최대값을 넘는 수가 있어서일 수 있는데,
그랬으면 실패가 뜨지 시간 초과가 뜨진 않지 않았을까?
*/