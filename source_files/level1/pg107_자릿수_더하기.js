/* 
[1단계] 자릿수 더하기
(연습문제)
*/

function solution(n) {
    // 주어진 자연수를 문자 하나하나로 쪼갠다
    const nums = n.toString().split("");
    return nums.reduce((acc, cur) => (acc + parseInt(cur)), 0);
}