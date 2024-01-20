/*
[2단계] 광물 캐기
(연습문제)
*/

function solution(picks, minerals) {
    const FATIGUE = {
        "diamond": { "diamond": 1, "iron": 1, "stone": 1 },
        "iron": { "diamond": 5, "iron": 1, "stone": 1 },
        "stone": { "diamond": 25, "iron": 5, "stone": 1 }
    };

    let answer = 25 * minerals.length + 1;
    let copyOfPicks = [...picks];

    function dfs(acc, index, currentPicks) {
        if (index >= minerals.length || hasNoPicks(currentPicks)) {
            if (answer > acc) answer = acc;
            return;
        }

        // 다이아 곡괭이 사용
        if (currentPicks[0] > 0) {
            let nextAcc = acc;
            let nextPicks = [currentPicks[0] - 1, currentPicks[1], currentPicks[2]];
            for (let i = index; i < minerals.length && i < index + 5; i++) {
                nextAcc += FATIGUE["diamond"][minerals[i]];
            }
            dfs(nextAcc, index + 5, nextPicks);
        }

        // 철 곡괭이 사용
        if (currentPicks[1] > 0) {
            let nextAcc = acc;
            let nextPicks = [currentPicks[0], currentPicks[1] - 1, currentPicks[2]];
            for (let i = index; i < minerals.length && i < index + 5; i++) {
                nextAcc += FATIGUE["iron"][minerals[i]];
            }
            dfs(nextAcc, index + 5, nextPicks);
        }

        // 돌 곡괭이 사용
        if (currentPicks[2] > 0) {
            let nextAcc = acc;
            let nextPicks = [currentPicks[0], currentPicks[1], currentPicks[2] - 1];
            for (let i = index; i < minerals.length && i < index + 5; i++) {
                nextAcc += FATIGUE["stone"][minerals[i]];
            }
            dfs(nextAcc, index + 5, nextPicks);
        }
    }

    dfs(0, 0, copyOfPicks);

    return answer;
}

// 곡괭이가 없는지 판단하는 함수
function hasNoPicks(picks) {
    return picks[0] === 0 && picks[1] === 0 && picks[2] === 0;
}