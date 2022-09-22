/* 
[1단계] 문자열 다루기 기본
(연습문제)
*/

function solution(s) {
    // 길이로 먼저 걸러낸다
    if (s.length !== 4 && s.length !== 6) return false;

    // 숫자로 구성되어 있는지 판별 시작
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) >= "0" && s.charAt(i) <= "9") continue;
        return false;
    }

    // 모두 통과 시 true 리턴
    return true;
}