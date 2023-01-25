/* 
[2단계] 할인 행사
(연습문제)
*/

function solution(want, number, discount) {
    let answer = 0;

    // 탐색할 초기 상태
    let dcMap = new Map();

    for (let i = 0; i < 10; i++) {
        addMap(dcMap, discount[i]);
    }
    // 시작 상태에 대해 탐색
    if (isOptimalTerm(want, number, dcMap)) answer++;

    // 다음부터 탐색 시작
    for (let start = 0; start + 10 < discount.length; start++) {
        // 구간 이동
        updateDCMap(dcMap, start, discount);
        if (isOptimalTerm(want, number, dcMap)) answer++;
    }

    return answer;
}

// 현재부터 10일간의 할인품목 map과, 원하는 품목 및 수량이 일치하는지 반환하는 함수
function isOptimalTerm(want, number, dcMap) {
    for (let i = 0; i < want.length; i++) {
        if (!dcMap.has(want[i]) || dcMap.get(want[i]) !== number[i]) return false;
    }

    return true;
}

// map에 특정 요소를 더해주는 함수
function addMap(dcMap, item) {
    if (dcMap.has(item)) {
        dcMap.set(item, dcMap.get(item) + 1);
    }
    else dcMap.set(item, 1);
}

// 시작일을 넘기면서 할인품목 map을 갱신하는 함수
function updateDCMap(dcMap, start, discount) {
    // start -> start + 1로 옮기면서 갱신됨
    dcMap.set(discount[start], dcMap.get(discount[start]) - 1);

    // 예외처리
    if (start + 10 >= discount.length) return;

    addMap(dcMap, discount[start + 10]);
}