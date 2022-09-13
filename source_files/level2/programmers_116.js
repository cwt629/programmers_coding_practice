/* 
[2단계] 최댓값과 최솟값
(연습문제)
*/

function solution(s) {
    // 각 요소들을 정수 배열 형태로 받아온다
    const arr = s.split(" ").map((word) => (parseInt(word)));
    // 요소 정렬
    arr.sort((a, b) => (a - b));

    // 최대값과 최소값 받아오기
    const endpoints = [arr[0], arr[arr.length - 1]];

    return endpoints.join(" ");
}