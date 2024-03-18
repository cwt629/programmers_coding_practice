/* 
[3단계] 기지국 설치
(Summer/Winter Coding(~2018))
*/

function solution(n, stations, w) {
    let answer = 0;

    // Array의 경우 js에선 2억개짜리 array를 만들 수가 없다!!
    // 그래서, array를 쓰지 않고 선형 탐색을 하려 한다.

    let stationIndex = 0, current = 1;
    while (stationIndex < stations.length && current <= n) {
        // current가 그 station에 포함되는 경우
        if (current >= stations[stationIndex] - w && current <= stations[stationIndex] + w) {
            // current와 station 이동
            current = stations[stationIndex] + w + 1;
            stationIndex++;
        }
        // current가 그 station에 포함되지 않는 경우
        else {
            // 이 경우 station은 current보다 오른쪽에 있을 수밖에 없음
            let len = stations[stationIndex] - w - current;
            answer += Math.ceil(len / (2 * w + 1));
            // current와 station 이동
            current = stations[stationIndex] + w + 1;
            stationIndex++;
        }
    }

    // 모든 station 탐색하고 남는 부분도 필요
    let finalLen = n - current + 1;
    answer += Math.ceil(finalLen / (2 * w + 1));

    return answer;
}