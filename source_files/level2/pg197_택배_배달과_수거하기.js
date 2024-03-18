/* 
[2단계] 택배 배달과 수거하기
(2023 KAKAO BLIND RECRUITMENT)
*/

function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    let deliverPin = getNextPin(deliveries, n), pickupPin = getNextPin(pickups, n); // 맨마지막 집 값이 0인 경우가 있으므로, 배달이나 수거를 할 가장 마지막 집의 인덱스를 따로 구한다

    // 최대한 뒤에서부터 배달 및 수거(매번 cap개씩 오고간다고 가정)
    while (deliverPin >= 0 || pickupPin >= 0) {
        // 이동은 배달과 수거할 집들 중 가장 먼 거리 위주로 왕복한다
        answer += Math.max(deliverPin + 1, pickupPin + 1) * 2;

        // 1. 배달
        let delivering = cap;
        while (deliverPin >= 0) {
            if (delivering >= deliveries[deliverPin]) {
                delivering -= deliveries[deliverPin];
                deliveries[deliverPin] = 0;
                deliverPin = getNextPin(deliveries, deliverPin);
            }
            else {
                deliveries[deliverPin] -= delivering;
                delivering = 0;
            }
            // 배달 다된경우 벗어난다
            if (delivering === 0) break;
        }

        // 2. 수거
        let pickRemaining = cap;
        while (pickupPin >= 0) {
            if (pickRemaining >= pickups[pickupPin]) {
                pickRemaining -= pickups[pickupPin];
                pickups[pickupPin] = 0;
                pickupPin = getNextPin(pickups, pickupPin);
            }
            else {
                pickups[pickupPin] -= pickRemaining;
                pickRemaining = 0;
            }
            // 수거 다 된 경우 벗어난다
            if (pickRemaining === 0) break;
        }
    }

    return answer;
}

// 현재 배열 내 핀에서 왼쪽으로 이동할때, 다음핀의 인덱스를 구하는 함수
function getNextPin(array, pin) {
    do {
        pin--;
    } while (pin >= 0 && array[pin] === 0);

    return pin;
}