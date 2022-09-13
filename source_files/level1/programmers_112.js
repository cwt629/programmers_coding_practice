/* 
[1단계] 정수 내림차순으로 배치하기
(연습문제)
*/

function solution(n) {
    // 각 자릿수를 쪼개고 정렬
    const arr = n.toString().split("").map((word) => (parseInt(word)));
    arr.sort((a, b) => (b - a));
    return parseInt(arr.join(""));
}