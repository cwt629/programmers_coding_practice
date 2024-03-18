/* 
[1단계] 문자열 내 마음대로 정렬하기
(연습문제)
*/

function solution(strings, n) {
    // sort 함수 이용하여 정렬
    strings.sort((a, b) => {
        // 서로 같은 문자라면, 문자열 자체로 정렬
        if (a.charAt(n) === b.charAt(n)) {
            if (a > b) return 1;
            if (a === b) return 0;
            return -1;
        }
        // 서로 다른 문자라면, n번째 인덱스 문자 비교
        return (a.charAt(n) > b.charAt(n)) ? 1 : -1;
    });
    return strings;
}