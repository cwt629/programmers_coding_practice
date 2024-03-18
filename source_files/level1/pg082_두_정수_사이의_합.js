/* 
[1단계] 두 정수 사이의 합
(연습문제)
*/

function solution(a, b) {
    var answer = 0;

    // a > b인 경우, 순서를 바꿔준다
    if (a > b) [a, b] = [b, a];

    // a부터 b까지 모두 더하기
    for (let i = a; i <= b; i++) {
        answer += i;
    }

    return answer;
}