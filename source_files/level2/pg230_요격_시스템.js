/*
[2단계] 요격 시스템
(연습문제)
*/

function solution(targets) {
    let answer = 0;
    let targetCopy = [...targets];
    // 오른 경계에 대해 오름차순 정렬(greedy)
    targetCopy.sort((a, b) => (a[1] - b[1]));

    // 해당 지점의 끝 직전(개구간이므로)에 요격 시도한다
    let index = 0;
    while (index < targetCopy.length) {
        answer++;

        // 해당 요격에 영향을 받지 않는(시작점이 현재 개구간의 끝점 이상인) 부분으로 이동
        let currentEnd = targetCopy[index][1];
        while (index < targetCopy.length && targetCopy[index][0] < currentEnd)
            index++;
    }

    return answer;
}