/* 
[1단계] 크기가 작은 부분 문자열
(연습문제)
*/

function solution(t, p) {
    let answer = 0;
    const pValue = parseInt(p);

    for (let i = 0; i <= t.length - p.length; i++) {
        const subStr = t.substring(i, i + p.length);
        if (parseInt(subStr) <= pValue) answer++;
    }

    return answer;
}