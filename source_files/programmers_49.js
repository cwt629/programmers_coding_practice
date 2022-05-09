/* 
[1단계] 가운데 글자 가져오기
(연습문제)
*/

function solution(s) {
    var answer = '';
    // 단어의 길이에 따라 다르게 반환
    // 단어의 길이가 홀수
    if (s.length % 2 === 1) {
        answer = s.charAt(Math.floor(s.length / 2));
    }
    // 단어의 길이가 짝수
    else {
        const targetIndex = s.length / 2 - 1;
        answer = s.substring(targetIndex, targetIndex + 2);
    }
    return answer;
}