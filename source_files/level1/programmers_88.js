/* 
[1단계] 문자열 내림차순으로 배치하기
(연습문제)
*/

function solution(s) {
    // s를 배열화한다
    const temp = s.split("");
    // 문자를 사전순 정렬 후, 역순으로 뒤집는다
    temp.sort().reverse();

    // 이를 다시 문자열로 반환한다
    return temp.join("");
}