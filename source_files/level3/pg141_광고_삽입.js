/* 
[3단계] 광고 삽입
(2021 KAKAO BLIND RECRUITMENT)
*/

function solution(play_time, adv_time, logs) {
    const totalSec = convertToSec(play_time);
    const adSec = convertToSec(adv_time);

    // 부분합 구현을 위해 모든 초에 대한 일차원 배열 선언
    let partialSum = Array.from({ length: totalSec }, () => (0));

    // 시청자의 재생 시작 시간과, 종료 시간 1초 뒤에 +1, -1을 해준다
    logs.forEach((log) => {
        const [start, end] = log.split("-");
        const [startSec, endSec] = [convertToSec(start), convertToSec(end)];

        // 부분합 배열에 반영
        partialSum[startSec]++;
        partialSum[endSec]--;
    });

    // 앞에서부터 합해나가며 n초~(n+1)초 직전까지 몇명이 보는지 구한다
    for (let i = 0; i < totalSec; i++) {
        if (i > 0) partialSum[i] += partialSum[i - 1];
    }

    // 이를 또 앞에서부터 합해나가며 0~n초 직전까지 몇명이 보는지 구한다
    let accViewer = [0];
    for (let i = 1; i <= totalSec; i++) {
        accViewer[i] = accViewer[i - 1] + partialSum[i - 1];
    }

    // 0-adv_time 직전 부터 시작해서 광고를 시작할 때, 언제가 제일 많은지 구하기
    let optimalStart = 0, maxViewer = accViewer[adSec];
    for (let end = adSec + 1; end <= totalSec; end++) {
        // 최대 갱신
        if (accViewer[end] - accViewer[end - adSec] > maxViewer) {
            optimalStart = end - adSec;
            maxViewer = accViewer[end] - accViewer[end - adSec];
        }
    }

    // 구해진 광고 시작 시간 반환
    return convertToTime(optimalStart);
}

// 주어진 시간 문자열을 초 단위로 환산하는 함수
function convertToSec(time) {
    const [hour, min, sec] = time.split(":");
    return parseInt(hour) * 3600 + parseInt(min) * 60 + parseInt(sec);
}

// 초 단위의 시간을 실제 시각으로 환산하는 함수
function convertToTime(sec) {
    // 1. 시간
    let hour = Math.floor(sec / 3600);
    hour = hour.toString().padStart(2, '0');
    sec %= 3600;

    // 2. 분
    let minute = Math.floor(sec / 60);
    minute = minute.toString().padStart(2, '0');
    sec = (sec % 60).toString().padStart(2, '0');

    return [hour, minute, sec].join(":");
}