/* 
[3단계] 네트워크
(연습문제: 깊이/너비 우선 탐색(DFS/BFS))
*/

function solution(n, computers) {
    var answer = 0;
    // bfs 방식 구현을 위한 큐
    var bfsQueue = [];
    // 각 컴퓨터들에 대해, 탐색했는지 여부를 저장하는 배열
    var done = [];
    for (let i = 0; i < n; i++)
        done.push(false);

    // bfs로 탐색 시작
    for (let i = 0; i < n; i++) {
        // 탐색하지 않은 경우
        if (!done[i]) {
            // 시작을 위해 큐에 현위치 삽입
            bfsQueue.push(i);
            done[i] = true;
            // queue가 빌 때까지 탐색
            while (bfsQueue.length > 0) {
                // 큐에서 위치 받아오기
                const current = bfsQueue.shift();

                // 다른 컴퓨터들과 연결되었는지 확인(더 작은 수는 앞서 이미 판단되었을 것)
                for (let j = i + 1; j < n; j++) {
                    // 연결된 경우(이미 탐색했다면 통과)
                    if (!done[j] && computers[current][j] === 1) {
                        // 탐색을 위해 큐에 삽입
                        bfsQueue.push(j);
                        done[j] = true;
                    }
                }
            }
            // 해당 네트워크에 대한 탐색이 완료된 경우, 한 번 세준다
            answer++;
        }
    }
    return answer;
}