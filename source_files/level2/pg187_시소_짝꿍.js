/* 
[2단계] 시소 짝꿍
(연습문제)
*/

function solution(weights) {
    var answer = 0;
    const maxWeight = Math.max(...weights); // 최대 몸무게
    // 각 몸무게별 몇명이 있는지 카운트하는 배열
    const weightCounts = Array.from({ length: maxWeight + 1 }, () => (0));

    // 몸무게별 카운트 저장
    weights.forEach((w) => {
        weightCounts[w]++;
    })

    // 몸무게별 페어 수 저장
    for (let weight of weights) {
        const pairs = getPairs(weight, maxWeight);
        // 페어별 저장
        let count = weightCounts[weight] - 1; // 1:1인 경우 먼저 저장(본인 제외)
        for (let pair of pairs) count += weightCounts[pair];

        answer += count;
    }

    // 현재는 각 쌍에 대해 2번씩 셌으므로, 2를 나누어 반환한다
    return answer / 2;
}

// 몸무게별로 짝이 될 수 있는 몸무게들을 반환하는 함수
function getPairs(weight, maxWeight) {
    let results = []; // 1:1은 제외
    let target;
    // 1. 2m-3m
    target = weight * 2 / 3;
    if (Number.isInteger(target) && target <= maxWeight) {
        results.push(target);
    }
    // 2. 2m - 4m
    if (weight % 2 === 0) {
        results.push(weight / 2);
    }
    // 3. 3m - 2m
    target = weight * 3 / 2;
    if (Number.isInteger(target) && target <= maxWeight) {
        results.push(target);
    }
    // 4. 3m - 4m
    target = weight * 3 / 4;
    if (Number.isInteger(target)) {
        results.push(target);
    }
    // 5. 4m - 2m
    target = weight * 2;
    if (target <= maxWeight) {
        results.push(target);
    }
    // 6. 4m - 3m
    target = weight * 4 / 3;
    if (Number.isInteger(target) && target <= maxWeight) {
        results.push(target);
    }

    return results;
}