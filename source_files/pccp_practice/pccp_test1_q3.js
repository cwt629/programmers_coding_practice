/*
[PCCP 기출문제 > PCCP 기출 3번]
3번 / 아날로그 시계
*/

function solution(h1, m1, s1, h2, m2, s2) {
    let answer = 0;

    // 0. 같은 시,분 에서 초만 바뀌는 경우
    if (h1 === h2 && m1 === m2) {
        let startGapMinute = getAngle(h1, m1, s1, "minute") - getAngle(h1, m1, s1, "second"); // 시작 시간에서의 분침 - 초침
        let endGapMinute = getAngle(h2, m2, s2, "minute") - getAngle(h2, m2, s2, "second"); // 끝 시간에서의 분침 - 초침
        // 둘이 서로 부호가 다르면, 만난 것이다
        if (startGapMinute * endGapMinute <= 0) answer++;
        let startGapHour = getAngle(h1, m1, s1, "hour") - getAngle(h1, m1, s1, "second"); // 시작 시간에서의 시침 - 초침
        let endGapHour = getAngle(h2, m2, s2, "hour") - getAngle(h2, m2, s2, "second"); // 끝 시간에서의 시침 - 초침
        // 둘이 서로 부호가 다르면, 만난 것이다
        if (startGapHour * endGapHour <= 0) answer++;

        // 0시 0분 0초나 12시 0분 0초에서 시작했다면, 셋다 만난 경우이므로 한 번 빼준다
        if (m1 === 0 && s1 === 0 && (h1 === 0 || h1 === 12)) answer--;

        return answer;
    }

    // 1. h1시 m1분 s1초 ~ h1시 m1분 60초 직전
    // 1-1. 분침이 초침보다 앞에 있었다면 무조건 만난다
    if (s1 > 0 && getAngle(h1, m1, s1, "minute") >= getAngle(h1, m1, s1, "second"))
        answer++;
    if (s1 === 0) answer++; // 0초인 경우, 무조건 만남

    // 1-2. 시침이 초침보다 앞에 있었다면 무조건 만난다
    if (s1 > 0 && getAngle(h1, m1, s1, "hour") >= getAngle(h1, m1, s1, "second"))
        answer++;
    if (s1 === 0) answer++; // 0초인 경우, 무조건 만남

    // 2. h1시 (m1 + 1)분 ~ h2시 m2분 직전 : 분마다 1번씩 만난다
    let passedMinutes = getMinute(h2, m2) - getMinute(h1, m1 + 1);
    answer += 2 * passedMinutes; // 시침 & 분침마다 한번씩 울린다
    // 2-2. 한번이라도 12시 0분 0초를 지났다면, 세 침이 모두 만난 것이므로 한 번 뺀다
    if (getMinute(h1, m1 + 1) <= getMinute(12, 0) && getMinute(h2, m2) >= getMinute(12, 0)) answer--;

    // 3. h2시 m2분 0초 ~ h2시 m2분 s2초 : 끝 시간의 초침 위치가 시침/분침보다 더 앞인지 확인
    if (getAngle(h2, m2, s2, "second") >= getAngle(h2, m2, s2, "minute")) answer++;
    if (getAngle(h2, m2, s2, "second") >= getAngle(h2, m2, s2, "hour")) answer++;

    // 4-1. 세 침이 한번에 만나는 시각인 0시 정각, 12시 정각에 대해 한번씩 빼준다
    if (m1 === 0 && s1 === 0 && h1 === 0) answer--;
    if (getSecond(h1, m1, s1) <= getSecond(12, 0, 0) && getSecond(12, 0, 0) <= getSecond(h2, m2, s2)) answer--;

    // 4-2. 초침과 분침이 0분에서 만나면 2분동안 1번 만나므로, 그만큼 1씩 빼준다(정각마다)
    let oClocks = getOClocks(h1, m1, s1, h2, m2, s2);
    answer -= oClocks;

    return answer;
}

// 특정 시, 분, 초에 대해 각 침이 나타내는 각도를 반환하는 함수
function getAngle(hour, min, sec, needleType) {
    switch (needleType) {
        case "hour":
            return ((hour % 12) * 3600 + min * 60 + sec) / 120;

        case "minute":
            return (min * 60 + sec) / 10;

        case "second":
            return 6 * sec;
    }
}

// 특정 시, 분을 분으로 환산하는 함수
function getMinute(hour, min) {
    return hour * 60 + min;
}

// 특정 시, 분, 초를 초로 환산하는 함수
function getSecond(hour, min, sec) {
    return hour * 3600 + min * 60 + sec;
}

// 시간 구간동안에 정각이 몇 번 존재하는지 반환하는 함수
function getOClocks(h1, m1, s1, h2, m2, s2) {
    return (h2 - h1);
}