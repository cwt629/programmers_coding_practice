/* 
[1단계] 덧칠하기
(연습문제)
*/

function solution(n, m, section) {
    let answer = 0;

    let index = 0;

    while (index < section.length) {
        let start = section[index], endBound = section[index] + m; // 색칠된 마지막 칸 바로 다음 칸
        answer++; // 한번 칠하기
        // 다음 시작점 찾기
        while (index < section.length && section[index] < endBound) index++;
    }

    return answer;
}