/* 
[1단계] 신고 결과 받기
(2022 KAKAO BLIND RECRUITMENT) 
*/

// let id_list = ["muzi", "frodo", "apeach", "neo"];
// let report = ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"];

// console.log(solution(id_list, report, 2));


function solution(id_list, report, k) {
    var answer = [];
    // 각 유저들이 신고받은 횟수를 저장할 배열
    var reported = [];
    // 각 유저들이 신고한 유저를 저장할 배열
    var log = [];

    // 각 유저들의 신고받은 횟수와, 신고한 유저 배열, 메일 보낼 횟수 초기화
    const len = id_list.length;
    for (let i = 0; i < len; i++) {
        reported[i] = 0;
        log[i] = [];
        answer[i] = 0;
    }

    // 각 신고 처리
    report.forEach(function (param) {
        // 신고자, 신고 대상 구분짓기
        const reportArray = param.split(" ");
        const reporter = reportArray[0];
        const gotReported = reportArray[1];
        // 신고 로그 저장(중복되지 않는다면)
        const indexForReporter = id_list.indexOf(reporter);
        if (!log[indexForReporter].includes(gotReported)) {
            log[indexForReporter].push(gotReported);
            // 신고 대상에 대한 count
            reported[id_list.indexOf(gotReported)]++;
        };
    })

    // 정지할 유저 골라내고, 그에 따라 메일 전송해주기
    for (let i = 0; i < len; i++) {
        if (reported[i] >= k) {
            // 신고한 사람들을 찾아 메일 보내주기
            for (let j = 0; j < len; j++) {
                if (log[j].includes(id_list[i])) {
                    answer[j]++;
                }
            }
        }
    }
    return answer;
}