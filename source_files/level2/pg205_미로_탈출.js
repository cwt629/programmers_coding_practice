/*
[2단계] 미로 탈출
(연습문제)
*/

function solution(maps) {
    let start = {row: -1, col: -1, moves: 0};
    let visited = [];
    let curData;
    // 시작점 찾기
    for (let i = 0; i < maps.length; i++){
        let ind = maps[i].indexOf("S");
        if (ind >= 0){
            start = {row: i, col: ind, moves: 0};
            break;
        }
    }
    // visited 초기화
    for (let i = 0; i < maps.length; i++){
        visited[i] = [];
        for (let j = 0; j < maps[i].length; j++){
            visited[i][j] = false;
        }
    }
    visited[start.row][start.col] = true;
    
    // 1. 시작점에서 레버까지 이동
    curData = bfs(start, "L", maps, visited);
    // 레버에 닿지 못하는 경우
    if (curData.moves === -1) return -1;
    
    // 방문 여부 초기화
    initVisited(visited);
    visited[curData.row][curData.col] = true;
    
    // 2. 레버에서 탈출 지점으로 이동
    curData = bfs(curData, "E", maps, visited);
    // 도착지에 닿지 못하는 경우
    if (curData.moves === -1) return -1;
    
    return curData.moves;
}

// visited 배열을 초기화하는 함수
function initVisited(visited){
    for (let i = 0; i < visited.length; i++){
        for (let j = 0; j < visited[i].length; j++){
            visited[i][j] = false;
        }
    }
}
    
// BFS 방식으로 시작점에서 목표 지점까지 최소로 이동한 후 그 정보를 반환하는 함수
function bfs(start, goal, maps, visited){
    let bfsQueue = [start];
    while (bfsQueue.length > 0){
        let current = bfsQueue.shift();
        // 오른쪽
        if (current.col + 1 < maps[0].length && !visited[current.row][current.col + 1] && maps[current.row][current.col + 1] !== "X"){
            visited[current.row][current.col + 1] = true;
            let nextData = {row: current.row, col: current.col + 1, moves: current.moves + 1}
            // 목적지 도착 시
            if (maps[current.row][current.col + 1] === goal) 
                return nextData;
            bfsQueue.push(nextData);
        }
        
        // 왼쪽
        if (current.col - 1 >= 0 && !visited[current.row][current.col - 1] && maps[current.row][current.col - 1] !== "X"){
            visited[current.row][current.col - 1] = true;
            let nextData = {row: current.row, col: current.col - 1, moves: current.moves + 1}
            // 목적지 도착 시
            if (maps[current.row][current.col - 1] === goal) 
                return nextData;
            bfsQueue.push(nextData);
        }
        
        // 아래쪽
        if (current.row + 1 < maps.length && !visited[current.row + 1][current.col] && maps[current.row + 1][current.col] !== "X"){
            visited[current.row + 1][current.col] = true;
            let nextData = {row: current.row + 1, col: current.col, moves: current.moves + 1}
            // 목적지 도착 시
            if (maps[current.row + 1][current.col] === goal) 
                return nextData;
            bfsQueue.push(nextData);
        }
        
        // 위쪽
        if (current.row - 1 >= 0 && !visited[current.row - 1][current.col] && maps[current.row - 1][current.col] !== "X"){
            visited[current.row - 1][current.col] = true;
            let nextData = {row: current.row - 1, col: current.col, moves: current.moves + 1}
            // 목적지 도착 시
            if (maps[current.row - 1][current.col] === goal) 
                return nextData;
            bfsQueue.push(nextData);
        }
    }
    
    return {row: -1, col: -1, moves: -1};
}