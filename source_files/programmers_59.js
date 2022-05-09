/* 
[2단계] 게임 맵 최단거리
(찾아라 프로그래밍 마에스터)
*/

function solution(maps) {
    const cols = maps[0].length;
    const rows = maps.length;

    // 방문 여부를 저장할 이차원 배열
    var visited = [];
    for (let i = 0; i < rows; i++) {
        visited[i] = [];
        for (let j = 0; j < cols; j++) {
            visited[i].push(false);
        }
    }

    // BFS 방식으로 찾아나간다(성분: row, column, 거리)
    const bfsQueue = [];
    // 시작점 저장
    bfsQueue.push([0, 0, 1]);
    visited[0][0] = true;

    while (bfsQueue.length > 0) {
        // 큐에서 다음 탐색 지점 빼온다
        const [currentRow, currentCol, level] = bfsQueue.shift();
        // 빼온 지점이 도착점이면, 거기까지 다다른 거리가 최단거리!
        if (currentRow === rows - 1 && currentCol === cols - 1)
            return level;
        // 오른쪽
        if (currentCol < cols - 1 && !visited[currentRow][currentCol + 1]
            && maps[currentRow][currentCol + 1] === 1) {
            bfsQueue.push([currentRow, currentCol + 1, level + 1]);
            visited[currentRow][currentCol + 1] = true;
        }
        // 아래
        if (currentRow < rows - 1 && !visited[currentRow + 1][currentCol]
            && maps[currentRow + 1][currentCol] === 1) {
            bfsQueue.push([currentRow + 1, currentCol, level + 1]);
            visited[currentRow + 1][currentCol] = true;
        }
        // 왼쪽
        if (currentCol > 0 && !visited[currentRow][currentCol - 1]
            && maps[currentRow][currentCol - 1] === 1) {
            bfsQueue.push([currentRow, currentCol - 1, level + 1]);
            visited[currentRow][currentCol - 1] = true;
        }
        // 위
        if (currentRow > 0 && !visited[currentRow - 1][currentCol]
            && maps[currentRow - 1][currentCol] === 1) {
            bfsQueue.push([currentRow - 1, currentCol, level + 1]);
            visited[currentRow - 1][currentCol] = true;
        }
    }

    // 그동안 찾지 못한 경우는, 길이 없는 것
    return -1;
}