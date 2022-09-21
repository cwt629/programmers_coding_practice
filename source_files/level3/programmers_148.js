/* 
[3단계] 섬 연결하기
(연습문제: 탐욕법(Greedy))
*/

// Kruskal 알고리즘 기반!
function solution(n, costs) {
    var answer = 0;
    // costs를 비용에 대해 오름차순 정렬
    costs.sort(([a, b, cost1], [c, d, cost2]) => cost1 - cost2);

    let connected = new Set(); // 연결된 점들 리스트
    // 시작할 변을 정한다(가장 짧은 변)
    connected.add(costs[0][0]); connected.add(costs[0][1]);
    answer += costs[0][2];

    for (let i = 1; i < n - 1; i++) { // n-1개의 변으로 이을 수 있다
        let index = 1;
        while (index < costs.length && !connectable(costs[index][0], costs[index][1], connected)) index++;
        // 선택된 변 이어준다
        connected.add(costs[index][0]); connected.add(costs[index][1]);
        answer += costs[index][2];
    }

    return answer;
}

// 해당 변이 한쪽은 connected에 존재하고, 다른쪽은 존재하지 않는지 판별하는 함수
function connectable(a, b, connected) {
    return (connected.has(a) ^ connected.has(b)) === 1;
}