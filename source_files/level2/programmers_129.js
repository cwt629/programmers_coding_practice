/* 
[2단계] 하노이의 탑
(연습문제)
*/

function solution(n) {
    return getPath(n, 1, 3);
}

// begin 기둥에 있는 n개의 원판을 goal 기둥으로 옮기는 경로를 반환하는 함수
function getPath(n, begin, goal) {
    // 원판이 1개인 경우
    if (n === 1) return [[begin, goal]];

    // 남은 기둥 찾기
    let remaining;
    for (let i = 1; i <= 3; i++) {
        if (i !== begin && i !== goal) remaining = i;
    }

    return [...getPath(n - 1, begin, remaining), [begin, goal], ...getPath(n - 1, remaining, goal)];
}