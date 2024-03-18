/* 
[1단계] 소수 찾기
(연습문제)
*/

function solution(n) {
    var answer = 0;

    // 모든 수에 대해 소수 판별
    for (let i = 1; i <= n; i++) {
        if (isPrime(i)) answer++;
    }

    return answer;
}

// 소수 판별 함수
function isPrime(number) {
    // 1은 소수가 아니다
    if (number === 1) return false;
    // 짝수는 2를 제외하고는 모두 소수가 아니다
    if (number % 2 === 0)
        return (number === 2) ? true : false;

    // 해당 수의 제곱근값까지 3 이상인 모든 홀수로 나눠본다
    const boundary = Math.sqrt(number);
    for (let i = 3; i <= boundary; i += 2) {
        // 한 번이라도 나누어 떨어지면 소수가 아니다
        if (number % i === 0) return false;
    }

    // 테스트를 통과하면 소수
    return true;
}