/* 
[1단계] 평균 구하기
(연습문제)
*/

function solution(arr) {
    // 배열 요소들의 합
    const sum = arr.reduce((acc, cur) => (acc + cur), 0);
    return sum / arr.length;
}