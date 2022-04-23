/* 
[1단계] 완주하지 못한 선수
(연습: 해시)
*/

function solution(participant, completion) {
    var answer = '';
    // participant와 completion의 각 선수들을 이름의 길이별로 나누어 저장할 배열
    var ptcpByLength = [], compByLength = [];
    var index;

    ptcpByLength[0] = null; compByLength[0] = null;

    // 각 배열의 각 요소들을 배열로 선언해줌
    for (let i = 1; i <= 20; i++) {
        ptcpByLength[i] = [];
        compByLength[i] = [];
    }

    // participant들에 대해 hashing 시작
    participant.forEach(function (param) {
        // 길이를 인덱스로 가진다
        index = param.length;
        // 해당 배열에 push한다
        ptcpByLength[index].push(param);
    })

    // completion에 대해 hashing 시작
    completion.forEach(function (param) {
        // 길이를 인덱스로 가진다
        index = param.length;
        // 해당 배열에 push한다
        compByLength[index].push(param);
    })

    // 각 배열들을 탐색하여, 서로 길이가 다른 배열을 찾아 탐색한다
    for (let i = 1; i <= 20; i++) {
        if (ptcpByLength[i].length != compByLength[i].length) {
            // comp에 있는 선수를 차례차례 제거한다
            ptcpByLength[i].forEach(function (param) {
                // comp에 있는지 체크
                index = compByLength[i].indexOf(param);
                // 있다면, comp에서 제거
                if (index >= 0) {
                    compByLength[i].splice(index, 1)
                }
                // 없다면, 그 선수가 완주하지 못했다
                else {
                    answer = param;
                }
            })
        }
    }

    return answer;
}