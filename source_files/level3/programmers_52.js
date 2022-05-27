/* 
[3단계] 가장 먼 노드
(연습문제: 그래프)
*/

class Node {
    constructor(num) {
        this.number = num;
        // 연결된 노드들
        this.connected = [];
        // 인덱스 0으로부터의 거리(초기값 0)
        this.distance = 0;
        // 탐색했는지 여부
        this.visited = false;
    }
}

function solution(n, vertex) {
    var answer = 0;
    // node 생성
    var nodes = [];
    for (let i = 0; i < n; i++)
        nodes[i] = new Node(i);

    // 연결고리 이어주기
    vertex.forEach(([a, b]) => {
        nodes[a - 1].connected.push(b - 1);
        nodes[b - 1].connected.push(a - 1);
    })

    // bfs 방식으로 탐색(요소: [인덱스, 거리])
    const bfsQueue = [];
    var maxLen = 0;
    // 시작점
    bfsQueue.push([0, 0]);
    // 시작점은 다시 방문하지 않는다
    nodes[0].visited = true;

    while (bfsQueue.length > 0) {
        const [currentIndex, currentLevel] = bfsQueue.shift();
        maxLen = currentLevel;
        // 정보 저장
        nodes[currentIndex].distance = currentLevel;
        // 이어져있는(방문하지 않은) 모든 수들을 큐에 삽입
        nodes[currentIndex].connected.forEach((i) => {
            if (!nodes[i].visited) {
                bfsQueue.push([i, currentLevel + 1]);
                // 방문처리 해준다(level 때문)
                nodes[i].visited = true;
            }
        })
    }
    // 최고 거리에 대해 탐색
    answer = nodes.filter((node) => (node.distance === maxLen)).length;

    return answer;
}