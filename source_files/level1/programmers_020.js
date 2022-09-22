/* 
[1단계] 예산
(Summer/Winter Coding(~2018))
*/

function solution(d, budget) {
    var answer = 0;

    // greedy algorithm 사용
    while (budget > 0 && d.length > 0) {
        const minIndex = getMinIndex(d);
        // 해당 부서의 신청 금액이 예산을 넘어서면, 더 이상 진행할 수 없음
        if (d[minIndex] > budget) break;

        // 그 부서의 신청 금액만큼 구매
        budget -= d[minIndex];
        answer += 1;
        // 그 부서는 구매 완료
        d.splice(minIndex, 1);
    }
    return answer;
}

function getMinIndex(d) {
    var minIndex = 0;
    const len = d.length;
    // 배열 탐색
    for (let i = 1; i < len; i++) {
        if (d[i] < d[minIndex]) {
            minIndex = i;
        }
    }
    // 해당 인덱스 반환
    return minIndex;
}