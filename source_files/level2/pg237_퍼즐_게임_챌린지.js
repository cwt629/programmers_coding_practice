/*
[2단계] 퍼즐 게임 챌린지
(PCCP 기출문제)
*/

function solution(diffs, times, limit) {
    let maxDiff = diffs[0];
    // 가장 어려운 난이도를 구한다
    for (let i = 1; i < diffs.length; i++){
        if (maxDiff < diffs[i]) maxDiff = diffs[i];
    }
    
    // 이진 탐색 방식으로, 가능한 최소값을 탐색한다
    let start = 1, end = maxDiff;
    while (start <= end){
        let mid = Math.floor((start + end) / 2);
        // 해결에 성공하는 경우, 더 최저를 찾기 위해 end를 줄인다
        if (getTimeSpent(diffs, times, mid) <= limit){
            end = mid - 1;
        }
        // 해결에 실패하는 경우, 더 높은 숙련도에서 탐색하기 위해 start를 늘린다
        else start = mid + 1;
    }
    
    // start가 가리키는 것이 최소값
    return start;
}

// 특정 숙련도에 따라 걸리는 시간을 구하는 함수
function getTimeSpent(diffs, times, level){
    let time = times[0]; // 맨 처음 퍼즐은 무조건 풀 수 있음
    for (let i = 1; i < diffs.length; i++){
        if (diffs[i] > level)
            time += (diffs[i] - level) * (times[i - 1] + times[i]);
        time += times[i];
    }
    
    return time;
}