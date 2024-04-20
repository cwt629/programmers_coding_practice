/*
[1단계] 기사단원의 무기
(연습문제)
*/

function solution(number, limit, power) {
    let answer = 0;

    for (let i = 1; i <= number; i++) {
        let divisor = getDivisors(i);
        answer += (divisor <= limit) ? divisor : power;
    }

    return answer;
}

// 약수 개수를 반환하는 함수
function getDivisors(number) {
    // 자기 자신의 제곱근값
    const THRESHOLD = Math.sqrt(number);
    let count = 0;

    for (let i = 1; i < THRESHOLD; i++) {
        if (number % i === 0) count++;
    }

    // 제곱근값 전까지만 약수를 계산한 뒤 거기에 2배하면 되며, 제곱근값 자체가 정수이면 1 더해준다
    return count * 2 + ((THRESHOLD === Math.floor(THRESHOLD)) ? 1 : 0);
}