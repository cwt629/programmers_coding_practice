/* 
[3단계] 입국심사
(연습: 이분탐색)
*/

console.log(solution(6, [7, 10]));

function solution(n, times) {
    var answer = 0;

    // 시간을 기준으로 이분탐색 : 몇분이 n명을 딱 수용할 최소 값이 되는가?

    // 시간의 lower bound와 upper bound 설정
    var left = 0, right = Math.max(...times) * n;

    // 이분탐색 시작
    while (left <= right) {
        // 중간값 구하기
        const mid = Math.floor((left + right) / 2);
        // 각 심사관들이 mid분동안 몇명을 검사할 수 있는지를 모두 더한다
        const sum = times.reduce((accumulator, time) => (accumulator + Math.floor(mid / time)), 0);

        // n명을 모두 심사하지 못했다면, 시간이 더 필요함
        if (sum < n)
            left = mid + 1;
        // n명 이상을 심사했다면, 시간을 더 줄일수 있는지 탐색
        else right = mid - 1;
    }

    // left가 right보다 커지면, 그 때의 left가 최소 시간!
    answer = left;

    return answer;
}