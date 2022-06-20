/* 
[1단계] 같은 숫자는 싫어
(연습문제)
*/

function solution(arr) {
    const answer = [];

    // 배열 탐색
    let i = 0;
    while (i < arr.length) {
        // 해당 숫자 저장
        const temp = arr[i];
        answer.push(temp);
        // 저장한 숫자와 다른 숫자가 나타날 때까지 인덱스 이동
        while (i < arr.length && arr[i] === temp) i++;
    }

    return answer;
}