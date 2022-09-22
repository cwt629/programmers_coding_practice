/* 
[1단계] 문자열 내 p와 y의 개수
(연습문제)
*/

function solution(s) {
    // p와 y의 개수를 저장할 맵
    const count = new Map([['p', 0], ['y', 0]]);

    // s를 탐색하며 개수 세기
    for (let i = 0; i < s.length; i++) {
        // p 발견 시
        if (s.charAt(i) === "p" || s.charAt(i) === "P")
            count.set('p', count.get('p') + 1);
        // y 발견 시
        else if (s.charAt(i) === "y" || s.charAt(i) === "Y")
            count.set('y', count.get('y') + 1);
    }

    // 개수를 비교하여 결과 산출
    return (count.get('p') === count.get('y')) ? true : false;
}