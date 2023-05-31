/* 
[2단계] 이모티콘 할인행사
(2023 KAKAO BLIND RECRUITMENT)
*/

function solution(users, emoticons) {
    let maxResult = {
        service: 0,
        income: 0
    };

    // DFS 방식으로 4^7개의 할인율 조합을 모두 탐색함
    function dfs(discounts = []) {
        // 조합이 완성된 경우
        if (emoticons.length === discounts.length) {
            const result = getProfit(discounts, users, emoticons);
            // 갱신
            maxResult = pickBetterResult(maxResult, result);
            return;
        }

        for (let i = 1; i <= 4; i++) {
            const currentDC = 10 * i;
            dfs([...discounts, currentDC]);
        }
    }

    dfs();

    return [maxResult.service, maxResult.income];
}

// 특정 할인폭 조합에 대해 서비스 가입자와 판매액을 반환하는 함수
function getProfit(discounts, users, emoticons) {
    let result = {
        service: 0, // 이모티콘 플러스 서비스 가입자 수
        income: 0 // 이모티콘 판매액
    };

    users.forEach((user) => {
        // [할인율 기준, 서비스 가입 기준]
        const [dcCut, servCut] = user;
        let usage = 0;
        for (let i = 0; i < discounts.length; i++) {
            if (discounts[i] >= dcCut) usage += emoticons[i] * (100 - discounts[i]) / 100;
        }

        if (usage >= servCut) result.service++;
        else result.income += usage;
    })

    return result;
}

// 두 결과 중 더 좋은 결과를 반환하는 함수
function pickBetterResult(result1, result2) {
    if (result1.service < result2.service) return result2;
    if (result1.service === result2.service) {
        if (result1.income < result2.income) return result2;
    }

    return result1;
}