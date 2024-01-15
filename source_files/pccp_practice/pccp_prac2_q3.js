/*
[PCCP 모의고사 2 > 2회 모의고사 3번]
3번 - 카페 확장
*/

function solution(menu, order, k) {
    var answer = 0;

    // 구간합 구현을 위한 배열을 선언한다
    let addArray = [], subArray = [];

    // 앞에서부터 k초마다 손님 한명씩 늘어난다
    for (let i = 0; i < order.length; i++) {
        addArray[i * k] = 1;
    }

    // 메뉴가 완성될 때마다 손님 한명씩 빠진다
    let time = 0;
    let orderIndex = 0;
    while (orderIndex < order.length) {
        // 다음 주문이 들어오기 전에는 대기한다
        if (time < orderIndex * k) {
            time++;
            continue;
        }
        // 다음 주문에 대해 완료 시점에 손님 한명을 뺀다
        let spendingTime = menu[order[orderIndex++]];
        time += spendingTime;
        subArray[time] = 1;
    }

    // 편한 계산을 위해, 정의되지 않은 인덱스들에 대해서 0을 채워준다
    for (let i = 0; i <= time; i++) {
        if (i > addArray.length || !addArray[i])
            addArray[i] = 0;

        if (i > subArray.length || !subArray[i])
            subArray[i] = 0;
    }

    // 구간합을 구해준다(time까지)
    let customers = [1];
    for (let i = 1; i <= time; i++) {
        customers[i] = customers[i - 1] + addArray[i] - subArray[i];
    }

    return getMax(customers);
}

// 배열에서 가장 큰 값을 반환하는 함수
function getMax(array) {
    let max = -1;
    for (let element of array) {
        if (element > max)
            max = element;
    }

    return max;
}