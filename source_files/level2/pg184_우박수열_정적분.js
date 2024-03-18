/* 
[2단계] 우박수열 정적분
(연습문제)
*/

function solution(k, ranges) {
    let graph = [k];
    // 수열 완성
    let current = k;
    while (current !== 1) {
        current = nextPrediction(current);
        graph.push(current);
    }

    // 각 구간마다 답 구하기
    return ranges.map((range) => {
        let start = range[0], end = range[1] + graph.length - 1; // 실제 시작과 끝
        // 유효하지 않은 구간
        if (start > end) return -1;

        // 적분 시작
        let area = 0;
        for (let i = start; i < end; i++) {
            area += (graph[i] + graph[i + 1]) / 2;
        }

        return area;
    })
}

// 특정 수가 추측에 의해 어디로 가는지 반환하는 함수
function nextPrediction(num) {
    // 짝수
    if (num % 2 === 0) return num / 2;
    // 홀수
    return num * 3 + 1;
}