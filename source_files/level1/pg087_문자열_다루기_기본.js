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

/* 
추가:
1. isNaN를 사용할 수 있다고 생각했는데, "1e22"와 같이 지수표현의 경우 true로 판별하는 문제가 있음!
2. 정규표현식을 사용하면 더욱 간단하게 찾아낼 수 있다.
*/