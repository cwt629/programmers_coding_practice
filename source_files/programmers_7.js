/* 
[1단계] 없는 숫자 더하기
(월간 코드 챌린지 시즌3)
*/

function solution(numbers) {
    var answer = -1;

    for (let i = 0; i <= 9; i++) {
        if (numbers.indexOf(i) < 0) {
            if (answer < 0) {
                answer = i;
            }
            else answer += i;
        }
    }
    return answer;
}