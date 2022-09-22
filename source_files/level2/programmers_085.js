/* 
[2단계] 숫자의 표현
(연습문제)
*/

function solution(n) {
    var answer = 0;

    // Idea: 등차중항을 기점으로 계산한다. 단, 자연수의 합으로 표현할 수 없게 되는 구간은 따로 계산을 통해 추려낸다.
    for (let i = 1; i <= n; i++) {
        const temp = available(n, i)
        if (temp >= 0) {
            // 자연수의 합으로 표현하려면, 등차중항의 왼쪽에 있을 수 있는 자연수의 개수가 최소한 현재 필요한 자연수의 개수의 절반보다는 크거나 같아야 한다
            if (Math.ceil(i / 2) > Math.floor(temp)) break; // 더 진행할 필요 없음
            answer++;
        }
    }
    return answer;
}

// 연속한 자연수들로 표현한 수의 등차중항으로서 성립이 가능한지 판별하고, 가능하다면 등차중항을 반환하는 함수
function available(n, divid) {
    const result = n / divid;
    // 홀수면 결과가 자연수여야 하고, 짝수면 홀수/2 꼴이어야 한다
    if (divid % 2 === 1)
        return (result === Math.floor(result)) ? result : -1;
    return ((result * 2) % 2 === 1) ? result : -1;
}