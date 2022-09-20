/* 
[2단계] 메뉴 리뉴얼
(2021 KAKAO BLIND RECRUITMENT)
*/

function solution(orders, course) {
    var answer = [];

    // 각 order를 알파벳 순으로 정렬
    orders = orders.map((order) => (sortOrder(order)));

    // course마다 수행
    course.forEach((number) => {
        answer.push(...getOptimalCombo(orders, number));
    })

    return answer.sort();
}

// 주어진 order를 알파벳 순으로 정렬하는 함수
function sortOrder(order) {
    let alphabets = order.split("");
    alphabets.sort();
    return alphabets.join("");
}

// 주어진 order의 index에서 course개의 원소로 이루어진 조합을 모두 반환하는 함수
function getCombo(order, index, course) {
    // index부터 course개만큼 뽑을 수 없는 경우
    if (index + course > order.length) return [];

    // index에서 딱 course만큼 뽑을 수 있는 경우
    if (index + course === order.length) return [order.substring(index)];

    // 1개는 index에서부터 그대로 반환
    if (course === 1) return order.substring(index).split("");

    // 2개 이상은 다음 위치에서부터 더해가며 반환
    return [...getCombo(order, index + 1, course - 1).map((combo) => (order.charAt(index) + combo)), ...getCombo(order, index + 1, course)];
}

// 모든 order에 대해 course개짜리 조합 중 최대로 나온 조합을 반환하는 함수
function getOptimalCombo(orders, course) {
    const comboMap = new Map();

    // map 구성
    for (let order of orders) {
        const combos = getCombo(order, 0, course);
        for (let combo of combos) {
            if (comboMap.has(combo))
                comboMap.set(combo, comboMap.get(combo) + 1);
            else comboMap.set(combo, 1);
        }
    }

    // map에서 2개 이상 최대로 많이 나온 조합 추려내기
    let result = [], max = 1;
    for (let combo of comboMap.keys()) {
        // 최대값 갱신
        if (comboMap.get(combo) > max) {
            result = [combo];
            max = comboMap.get(combo);
        }
        // 최대값과 동일한 콤보
        else if (max > 1 && comboMap.get(combo) === max) {
            result.push(combo);
        }
    }

    return result;
}