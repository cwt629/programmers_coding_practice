/* 
[1단계] 수박수박수박수박수박수?
(연습문제)
*/

function solution(n) {
    var answer = '';
    // "수박"의 각 글자 저장
    const watermelon = ["수", "박"];

    // 하나씩 붙여가기
    for (let i = 0; i < n; i++)
        answer += watermelon[i % 2];

    return answer;
}