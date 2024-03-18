/* 
[2단계] 호텔 대실
(연습문제)
*/

function solution(book_time) {
    const chargeTimes = book_time.map(([start, end]) => ([convertToMinute(start), convertToMinute(end) + 10])); // 종료 시간은 청소시간을 더해줌

    // 구간합 활용
    let temp = Array.from({ length: 1440 }, () => (0)); // 0~1439분까지 확인
    chargeTimes.forEach(([start, end]) => {
        temp[start]++;
        temp[end]--;
    })

    // 구간합을 더해가며, 각 분에 몇개의 방이 charge되어 있는지 확인
    let charged = [temp[0]];
    for (let i = 1; i < 1440; i++) {
        charged[i] = charged[i - 1] + temp[i];
    }

    // 최대로 charge된 방의 개수를 구하면 된다!
    return Math.max(...charged);
}

// 각 시간 문자열을 몇분째인지로 반환하는 함수
function convertToMinute(time) {
    const [hour, minute] = time.split(":").map((w) => (parseInt(w)));
    return hour * 60 + minute;
}