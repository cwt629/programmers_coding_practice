/*
[2단계] 리코쳇 로봇
(연습문제)
*/

function solution(board) {
    let visited = [];
    let robot, goal;
    // 로봇의 시작 위치 찾기
    for (let i = 0; i < board.length; i++){
        let ind = board[i].indexOf("R");
        if (ind >= 0){
            robot = {
                row: i,
                col: ind,
                moves: 0
            };
            break;
        }
    }
    // 골인 지점 찾기
    for (let i = 0; i < board.length; i++){
        let ind = board[i].indexOf("G");
        if (ind >= 0){
            goal = {row: i, col: ind};
            break;
        }
    }
    
    for (let i = 0; i < board.length; i++){
        visited[i] = [];
        for (let j = 0; j < board[0].length; j++){
            visited[i][j] = false;
        }
    }
    
    // 로봇의 현위치
    visited[robot.row][robot.col] = true;
    
    // BFS로 돌린다
    let bfsQueue = [robot];
    while (bfsQueue.length > 0){
        let curRobot = bfsQueue.shift();
        let dest;
        // 왼쪽 이동
        dest = headTo(curRobot, board, "left");
        if (!visited[dest.row][dest.col] && !corresponds(curRobot, dest)){
            // 이 경우에 목적지라면 바로 return
            if (corresponds(dest, goal)) return curRobot.moves + 1;
            visited[dest.row][dest.col] = true;
            bfsQueue.push({
                row: dest.row, col: dest.col, moves: curRobot.moves + 1
            });
        }
        
        // 오른쪽 이동
        dest = headTo(curRobot, board, "right");
        if (!visited[dest.row][dest.col] && !corresponds(curRobot, dest)){
            // 이 경우에 목적지라면 바로 return
            if (corresponds(dest, goal)) return curRobot.moves + 1;
            visited[dest.row][dest.col] = true;
            bfsQueue.push({
                row: dest.row, col: dest.col, moves: curRobot.moves + 1
            });
        }
        
        // 위쪽 이동
        dest = headTo(curRobot, board, "up");
        if (!visited[dest.row][dest.col] && !corresponds(curRobot, dest)){
            // 이 경우에 목적지라면 바로 return
            if (corresponds(dest, goal)) return curRobot.moves + 1;
            visited[dest.row][dest.col] = true;
            bfsQueue.push({
                row: dest.row, col: dest.col, moves: curRobot.moves + 1
            });
        }
        
        // 아래쪽 이동
        dest = headTo(curRobot, board, "down");
        if (!visited[dest.row][dest.col] && !corresponds(curRobot, dest)){
            // 이 경우에 목적지라면 바로 return
            if (corresponds(dest, goal)) return curRobot.moves + 1;
            visited[dest.row][dest.col] = true;
            bfsQueue.push({
                row: dest.row, col: dest.col, moves: curRobot.moves + 1
            });
        }
    }
    // 마지막까지 구하지 못한 경우
    return -1;
}

// 두 위치가 일치하는지 반환하는 함수
function corresponds(pos1, pos2){
    return (pos1.row === pos2.row) && (pos1.col === pos2.col);
}

// 특정 방향으로 이동된 위치의 좌표를 반환하는 함수
function headTo(curRobot, board, direction){
    let [row, col] = [curRobot.row, curRobot.col];
    switch(direction){
        case "left":
            while (col - 1 >= 0 && board[row][col - 1] !== "D") col--;
            break;
            
        case "right":
            while (col + 1 < board[0].length && board[row][col + 1] !== "D") col++;
            break;
            
        case "up":
            while (row - 1 >= 0 && board[row - 1][col] !== "D") row--;
            break;
            
        case "down":
            while (row + 1 < board.length && board[row + 1][col] !== "D") row++;
            break;
    }
    
    return {row: row, col: col};
}