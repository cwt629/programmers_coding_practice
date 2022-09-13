/* 
[2단계] 주차 요금 계산
(2022 KAKAO BLIND RECRUITMENT)
*/

function solution(fees, records) {
    var answer = [];
    // 주차장 역할을 할 map
    const parkinglot = new Map();
    // 각 차량마다의 소요 시간과 그에 따른 주차 요금을 저장할 딕셔너리
    var cars = {};

    // record 순환
    records.forEach((rec) => {
        // 정보를 각각 받아온다
        const [time, carnumber, task] = rec.split(" ");
        // 입차인 경우
        if (task === "IN") {
            // 주차장에 추가
            parkinglot.set(carnumber, time);
        }
        // 출차인 경우
        else if (task === "OUT") {
            // 시간을 계산하여 cars 딕셔너리에 추가
            if (Object.keys(cars).includes(carnumber))
                cars[carnumber] += minutesSpent(parkinglot.get(carnumber), time);
            else cars[carnumber] = minutesSpent(parkinglot.get(carnumber), time);

            // 주차장에서 해당 차 출차
            parkinglot.delete(carnumber);
        }
    })

    // 주차장에 남아있는 차들에 대해서는 23:59에 출차 처리
    parkinglot.forEach((time, carnumber) => {
        // 시간을 계산하여 cars 딕셔너리에 추가
        if (Object.keys(cars).includes(carnumber))
            cars[carnumber] += minutesSpent(time, "23:59");
        else cars[carnumber] = minutesSpent(time, "23:59");
    })

    // 딕셔너리의 차량 번호에 대해 정렬하여 배열에 차례대로 넣어준다
    var sortedCars = [];
    Object.keys(cars).sort().forEach((key) => {
        sortedCars.push(cars[key]);
    })

    // 정렬된 각 시간 값에 대해 요금 계산 후 저장
    sortedCars.forEach((time) => {
        answer.push(totalFee(time, fees));
    })

    return answer;
}

// 주어진 두 시간 사이에 몇분이 지났는지 반환하는 함수
function minutesSpent(from, to) {
    // 몇시 몇분인지를 각각 배열로 받음
    const timeInfo = [from.split(":"), to.split(":")];

    // 분으로 계산하여 결과값 반환
    return (parseInt(timeInfo[1][0]) * 60 + parseInt(timeInfo[1][1])) - (parseInt(timeInfo[0][0]) * 60 + parseInt(timeInfo[0][1]));
}

// 주어진 시간(분)동안의 주차 요금을 반환하는 함수
function totalFee(minute, fees) {
    // 기본 시간 이내로 주차했다면, 기본 요금 반환
    if (minute <= fees[0]) return fees[1];

    // 기본 시간을 초과한 경우
    return fees[1] + Math.ceil((minute - fees[0]) / fees[2]) * fees[3];
}