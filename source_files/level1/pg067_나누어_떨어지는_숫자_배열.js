/* 
[1단계] 나누어 떨어지는 숫자 배열
(연습문제)
*/

function solution(arr, divisor) {
    var answer = [];

    // divisor로 나누어 떨어지는 값 받기
    answer = arr.filter((num) => (num % divisor === 0));

    // 비어있다면, -1 넣기
    if (answer.length === 0) answer.push(-1);
    // 비어있지 않다면, 오름차순 정렬해주기
    else answer.sort((a, b) => (a - b));

    return answer;
}