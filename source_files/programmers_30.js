/* 
[1단계] 2016년
(연습문제)
*/

console.log(solution(5, 24));

function solution(a, b) {
    var answer = '';
    // 1월 1일을 인덱스 1로 하고, 요일을 순서대로 나열한 배열
    const day = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED'];
    // 월별로 며칠까지 있는지를 1월부터 순서대로 나열한 배열
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 오늘이 2016년의 며칠째인지 계산
    var totalDay = 0;
    // 다 지나간 달에 대한 계산
    for (let i = 0; i < a - 1; i++) {
        totalDay += daysInMonth[i];
    }
    // 이번 달의 며칠인지 더해주기
    totalDay += b;

    // 7로 나눈 나머지를 통해 요일 계산
    answer = day[totalDay % 7];

    return answer;
}