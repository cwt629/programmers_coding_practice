/* 
[3단계] 최고의 집합
(연습문제)
*/

function solution(n, s) {
    var answer = [];
    // 존재하지 않는 경우
    if (hasNoPerfection(n, s)) return [-1];

    // 산술-기하 원리에 의해, 원소들이 최대한 같고 차이가 적을 때 곱이 최대!
    const standardValue = Math.floor(s / n);
    for (let i = 0; i < n; i++) answer.push(standardValue);

    // 자연수이므로, 편차가 발생하는 부분은 뒤에서부터 1씩 더하여 해결
    const remainder = s - standardValue * n;

    for (let i = 0; i < remainder; i++) {
        answer[n - 1 - i]++;
    }

    return answer;
}

// 최고의 집합이 존재하지 않는 경우를 판별하는 함수
function hasNoPerfection(n, s) {
    // n보다 s가 작은 경우
    return (n > s);
}