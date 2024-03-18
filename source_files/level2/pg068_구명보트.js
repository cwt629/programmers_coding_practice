/* 
[2단계] 구명보트
(연습문제: 탐욕법(Greedy))
*/

function solution(people, limit) {
    var answer = 0;

    // 사람을 몸무게 순으로 내림차순 정렬
    people.sort((a, b) => (b - a));

    // 구명보트에 태워주기
    let heavier = 0, lighter = people.length - 1;
    while (heavier <= lighter) {
        answer++;
        // 더 무거운 사람 태우고, 남은 사람 중 가장 가벼운 사람 태우기
        if (people[heavier] + people[lighter] <= limit)
            lighter--;
        heavier++;
    }
    return answer;
}