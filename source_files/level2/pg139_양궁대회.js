/* 
[2단계] 양궁대회
(2022 KAKAO BLIND RECRUITMENT)
*/

function solution(n, info) {
    let answer = [];
    let maxGap = 0;

    let curShot = info.map((i) => (0));

    // DFS 방식에 의거한 완전 탐색
    /* 
    index: 과녁의 인덱스 
    currentShot: 지금까지 과녁에 쏜 현황
    shots: 지금까지 과녁에 쏜 화살 개수
    */
    function dfs(index, currentShot, shots) {
        // 이미 모든 화살을 쏜 경우
        if (shots === n) {
            const scores = getScores(info, currentShot);
            if (scores.apeach >= scores.ryon) return;
            if (scores.ryon - scores.apeach > maxGap) {
                answer = [currentShot];
                maxGap = scores.ryon - scores.apeach;
            }
            else if (scores.ryon - scores.apeach === maxGap) {
                answer.push(currentShot);
            }

            return;
        }

        let newShot = [...currentShot];
        // 현재 점수가 마지막이면, 모든 화살을 다 맞춘다
        if (index === 10) {
            newShot[index] = n - shots;
            shots = n;
            dfs(index + 1, newShot, shots);
            return;
        }

        // 현재 과녁을 아예 안맞추거나, 이길 수 있을 만큼만 맞춘다
        dfs(index + 1, newShot, shots);
        if (shots + info[index] + 1 <= n) {
            newShot[index] = info[index] + 1;
            shots += newShot[index];
            dfs(index + 1, newShot, shots);
        }
    }

    dfs(0, curShot, 0);

    // answer에 하나도 모이지 않은 경우
    if (answer.length === 0) return [-1];

    // answer에 모인 배열을 낮은 점수를 많이 쏜 순서대로 (내림차순) 정렬한다
    answer.sort((shot1, shot2) => {
        for (let i = 10; i >= 0; i--) {
            if (shot1[i] !== shot2[i]) return shot2[i] - shot1[i];
        }
        return -1;
    })

    return answer[0];
}



// 두 선수의 결과를 바탕으로 점수를 계산하는 함수
function getScores(apeach, ryon) {
    let scores = {
        apeach: 0,
        ryon: 0
    };

    for (let i = 0; i < apeach.length; i++) {
        // 둘다 0이면 패스
        if (apeach[i] === 0 && ryon[i] === 0) continue;

        // 점수 계산
        if (apeach[i] < ryon[i]) scores.ryon += (10 - i);
        else scores.apeach += (10 - i);
    }

    return scores;
}