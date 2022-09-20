/* 
[3단계] 단속카메라
(연습문제 - 탐욕법(Greedy))
*/

function solution(routes) {
    var answer = 0;

    // 각 route를 작은 것 -> 큰 것 순서대로 정렬
    for (let route of routes)
        route.sort((a, b) => (a - b));

    // 도착점에 대해 오름차순 정렬
    routes.sort((p1, p2) => {
        return p1[1] - p2[1];
    });

    let index = 0;
    while (index < routes.length) {
        // 현재 인덱스의 도착점에 카메라 설치
        const camera = routes[index][1];
        answer++;

        // 그 카메라를 만나는 차량 모두 패스
        while (index < routes.length && routes[index][0] <= camera) index++;
    }

    return answer;
}