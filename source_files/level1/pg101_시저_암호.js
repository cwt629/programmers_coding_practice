/* 
[1단계] 시저 암호
(연습문제)
*/

function solution(s, n) {
    var answer = '';

    for (let i = 0; i < s.length; i++) {
        // 공백인 경우
        if (s.charAt(i) === " ")
            answer += " ";
        // 알파벳인 경우
        else {
            // 대문자인 경우
            if (isCapitalLetter(s.charAt(i))) {
                // "A"로부터의 거리를 계산한 뒤 n만큼 이동하고, 그 후의 "A"에서의 거리를 알파벳 개수인 26으로 나눈 나머지만큼 "A"에서 이동
                const distanceFromA = (s.charCodeAt(i) - "A".charCodeAt(0) + n) % 26;
                answer += String.fromCharCode("A".charCodeAt(0) + distanceFromA);
            }

            // 소문자인 경우
            else {
                // 대문자와 동일하게 진행
                const distanceFroma = (s.charCodeAt(i) - "a".charCodeAt(0) + n) % 26;
                answer += String.fromCharCode("a".charCodeAt(0) + distanceFroma);
            }
        }
    }

    return answer;
}

// 주어진 영문자가 대문자인지 판별하는 함수(false이면 소문자)
function isCapitalLetter(word) {
    return (word >= "A" && word <= "Z");
}