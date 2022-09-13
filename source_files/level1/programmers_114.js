/* 
[1단계] x만큼 간격이 있는 n개의 숫자
(연습문제)
*/

function solution(x, n) {
    var answer = [];
    for (let i = 1; i <= n; i++) {
        answer.push(x * i); // x, x+x=2x, 2x+x=3x, ...
    }
    return answer;
}