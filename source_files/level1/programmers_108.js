/* 
[1단계] 약수의 합
(연습문제)
*/

function solution(n) {
    var answer = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) answer += i;
    }
    return answer;
}