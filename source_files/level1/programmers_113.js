/* 
[1단계] 하샤드 수
(연습문제)
*/

function solution(x) {
    // x의 각 자릿수의 합 계산
    const temp = x.toString().split("").map((word) => (parseInt(word)));
    const sum = temp.reduce((acc, cur) => (acc + cur), 0);

    return x % sum === 0;
}