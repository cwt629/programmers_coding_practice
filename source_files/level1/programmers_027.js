/* 
[1단계] 실패율
(2019 KAKAO BLIND RECRUITMENT)
*/

const stages = [2, 1, 2, 6, 2, 4, 3, 3];
console.log(solution(5, stages));

function solution(N, stages) {
    var answer = [];
    const len = stages.length;

    /* 
    [스테이지 수, 스테이지에 정확히 서있는 플레이어의 수, 
    스테이지에 도달한 플레이어의 수, 실패율]
    를 저장할 이차원 배열
    */
    var statistics = [];

    // 각 스테이지마다 수행
    for (let i = 0; i < N; i++) {
        statistics[i] = [];
        // 스테이지 수 저장
        statistics[i][0] = i + 1;

        // 스테이지에 도달한 플레이어들을 받아온다
        var experienced = stages.filter(function (param) {
            return param >= i + 1;
        })
        // 스테이지에 정확히 서있는 플레이어들을 받아온다
        var onStage = experienced.filter(function (param) {
            return param === i + 1;
        })

        // 각 플레이어 수 저장
        statistics[i][1] = onStage.length;
        statistics[i][2] = experienced.length;

        // 실패율 계산하여 저장
        statistics[i][3] = (statistics[i][2] > 0) ?
            statistics[i][1] / statistics[i][2] : 0;
    }

    // 배열을 실패율에 대하여 내림차순 정렬(같으면 번호에 대해 오름차순)
    statistics.sort(function (a, b) {
        if (a[3] === b[3]) {
            return a[0] - b[0];
        }
        return b[3] - a[3];
    })

    // answer에 각 스테이지 번호 저장
    for (let i = 0; i < N; i++) {
        answer[i] = statistics[i][0];
    }

    return answer;
}