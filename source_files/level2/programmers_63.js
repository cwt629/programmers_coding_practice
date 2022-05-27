/* 
[2단계] 2개 이하로 다른 비트
(월간 코드 챌린지 시즌2)
*/

function solution(numbers) {
    var answer = [];

    // 각 수에 대해
    numbers.forEach((number) => {
        // 가장 낮은 자리 비트가 0이면, 1 더해주면 됨
        if (number % 2 === 0)
            answer.push(number + 1);
        // 가장 낮은 자리 비트가 1인 경우, 제일 낮은 0의 자리 비트를 1로 바꿔주고, 그 바로 오른쪽 비트를 0으로 바꿔준다
        else {
            // 비트 탐색을 위한 임시 변수(power: 2의 몇제곱 자리인지)
            var temp = number, power = 0;
            while (temp % 2 === 1 && temp > 0) {
                // 맨오른쪽 비트 1 제거
                temp = (temp - 1) / 2;
                power++;
            }
            // 찾은 0의 자리를 1로 바꾸고, 그 오른쪽 자리는 0으로 바꾼다
            // 2^n - 2^(n-1) = 2^(n-1) 임을 이용하여 수식 간소화
            number += Math.pow(2, power - 1)
            // 구해진 값 저장
            answer.push(number);
        }
    })
    return answer;
}