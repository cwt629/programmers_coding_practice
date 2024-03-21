/*
[3단계] 부대복귀
(연습문제)
*/

/* 2nd try: destination에서 길을 한꺼번에 다 찾아 기록하는 BFS 방식 */
class Node {
    constructor(num){
        this.num = num;
        this.connected = []; // 연결된 다른 지점들
    }
    
    connect(num){
        this.connected.push(num);
    }
}

function solution(n, roads, sources, destination) {
    let nodes = Array.from({length: n}, (d, i) => new Node(i + 1));
    
    // 초기 길 데이터 저장
    for (let road of roads){
        nodes[road[0] - 1].connect(road[1]);
        nodes[road[1] - 1].connect(road[0]);
    }
    
    // destination에서 시작해서 각 node로 이동하며, 최단거리를 계속 기록해간다(BFS 방식)
    let minPath = Array.from({length: n}, () => (-1));
    minPath[destination - 1] = 0;
    
    let bfsQueue = [destination];
    while (bfsQueue.length > 0){
        let current = bfsQueue.shift();
        for (let next of nodes[current - 1].connected){
            // 아직 -1 상태로 그대로인 경우, 방문하지 않은 점
            if (minPath[next - 1] < 0){
                bfsQueue.push(next);
                minPath[next - 1] = minPath[current - 1] + 1; // 현위치에서 1걸음 더 이동한 거리
            }
        }
    }
    
    return sources.map((source) => (minPath[source - 1]));
}



/* 1st try: source마다 길을 일일이 찾는 BFS 방식(당연하게도 시간 초과가 뜸) */
// class Node {
//     constructor(num){
//         this.num = num;
//         this.connected = []; // 연결된 다른 지점들
//     }
    
//     connect(num){
//         this.connected.push(num);
//     }
// }

// function solution(n, roads, sources, destination) {
//     let nodes = Array.from({length: n}, (d, i) => new Node(i + 1));
    
//     // 초기 길 데이터 저장
//     for (let road of roads){
//         nodes[road[0] - 1].connect(road[1]);
//         nodes[road[1] - 1].connect(road[0]);
//     }
    
//     let answer = sources.map((source) => {
//         // 이미 도착점에 있는 경우
//         if (source === destination) return 0;
        
//         // BFS 방식으로 탐색 시작
//         let bfsQueue = [{point: source, count: 0}];
//         let visited = Array.from({length: n}, () => false);
//         visited[source - 1] = true;
        
//         while (bfsQueue.length > 0){
//             let {point, count} = bfsQueue.shift();
            
//             // 이 지점에 연결된 각 위치들에 대해서도 탐색
//             for (let nextPoint of nodes[point - 1].connected){
//                 // 목적지와 일치하면, 여기서 바로 반환해준다
//                 if (nextPoint === destination)
//                     return count + 1;
                
//                 if (!visited[nextPoint - 1]){
//                     visited[nextPoint - 1] = true;
//                     bfsQueue.push({point: nextPoint, count: count + 1});
//                 }
//             }
            
//         }
//         // while문을 탈출할 때까지 벗어나지 못한 경우 -1
//         return -1;
//     });
    
//     return answer;
// }