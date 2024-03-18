/* 
[3단계] [1차] 셔틀버스
(2018 KAKAO BLIND RECRUITMENT)
*/

function solution(n, t, m, timetable) {
    // 각 시간을 분으로 환산하고, 시간순으로 정렬
    const minuteTable = timetable.map((time) => (convertToMinute(time)));
    minuteTable.sort((a, b) => (a - b));

    // 운행 시간마다 대기 인원 확인
    const ableMinutes = [];
    let current = 540; // 09:00
    let waiting = 0, index = 0;
    let firstCrew = 0;

    for (let i = 0; i < n; i++) {
        // 23:59인 경우
        if (current === 1439) {
            ableMinutes.push(current);
            break;
        }

        // 현재 시간까지 대기 인원 집계
        while (index < minuteTable.length && minuteTable[index] <= current) {
            waiting++;
            index++;
        }

        // 콘의 자리가 있으면, 탈수 있음을 남긴다
        if (waiting < m) ableMinutes.push(current);

        // 자리가 없다면, 맨 마지막 탑승객보다 1분이라도 일찍 와야함
        else ableMinutes.push(minuteTable[firstCrew + m - 1] - 1);

        // 대기인원 탑승
        if (waiting <= m) {
            firstCrew += waiting;
            waiting = 0;
        }
        else {
            firstCrew += m;
            waiting -= m;
        }

        // 다음 시간
        current += t;
    }

    // 다른 승객이 있을 때는 어느 경우에도 탈수 없다면, 제일 먼저 타야함
    if (ableMinutes.length === 0)
        ableMinutes.push(minuteTable[0] - 1);

    // 가장 늦게 탈 수 있는 시간 반환
    return convertToTime(ableMinutes[ableMinutes.length - 1])
}

// 주어진 시간을 분 단위로 환산하는 함수
function convertToMinute(time) {
    const [hour, minute] = time.split(":");
    return parseInt(hour) * 60 + parseInt(minute);
}

// 주어진 분 단위를 시각으로 환산하는 함수
function convertToTime(min) {
    // min이 음수인 경우(ex. 00:00의 1분전)
    if (min < 0) min += 1440;

    let [hour, minute] = [Math.floor(min / 60), min % 60];
    // 앞에 0을 필요하면 붙여준다
    [hour, minute] = [hour.toString().padStart(2, '0'), minute.toString().padStart(2, '0')];

    return hour + ":" + minute;
}