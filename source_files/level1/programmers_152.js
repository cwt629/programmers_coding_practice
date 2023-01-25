/* 
[1단계] 삼총사
(연습문제)
*/

function solution(number) {
    let answer = 0;

    // number 길이가 작으므로, 3중 for문 이용
    for (let i = 0; i < number.length - 2; i++) {
        for (let j = i + 1; j < number.length - 1; j++) {
            for (let k = j + 1; k < number.length; k++) {
                // 삼총사 확인
                if (number[i] + number[j] + number[k] === 0) answer++;
            }
        }
    }

    return answer;
}