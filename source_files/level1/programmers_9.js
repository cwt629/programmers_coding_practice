/* 
[1단계] 내적
(월간 코드 챌린지 시즌1)
*/

function solution(a, b) {
    var answer = 0;
    // length만큼 실행
    for (let i = 0; i < a.length; i++) {
        answer += a[i] * b[i];
    }
    return answer;
}