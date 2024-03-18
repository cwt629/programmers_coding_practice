/* 
[3단계] 블록 이동하기
(2020 KAKAO BLIND RECRUITMENT)
*/

// shift 연산을 대신하기 위해, 따로 큐를 위한 링크드 리스트 만들기
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class QueueList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // 요소가 비어있는지를 반환하는 함수
    isEmpty() {
        return (this.head === null);
    }

    // 큐에 새로운 요소 삽입
    insertBack(data) {
        let node = new Node(data);
        // head가 없으면, 이 노드가 head이자 tail로 시작한다
        if (!this.head) {
            this.head = node;
            this.tail = node;
        }
        else {
            // tail 뒤에 붙여준다
            this.tail.next = node;
            this.tail = node;
        }
    }

    // 큐에서 데이터를 빼오는 함수
    deleteFront() {
        let data = this.head.data;
        this.head = this.head.next;
        // head가 사라지면, tail도 같이 사라진다
        if (!this.head) this.tail = null;

        return data;
    }

    // (디버깅용) 모든 요소를 출력하는 함수
    printAll() {
        console.log("큐에 있는 모든 요소를 출력합니다.");
        for (let node = this.head; node; node = node.next) {
            console.log(node.data);
        }
    }
}

function solution(board) {
    let queue = new QueueList();
    queue.insertBack({
        /* 
        robot의 구성 원소
        [기준점의 행, 기준점의 열, 다른 칸의 방향]
        -> 다른 칸의 방향
        0: 오른쪽, 1: 아래쪽, 2: 왼쪽, 3: 위쪽
        */
        robot: [0, 0, 0],
        moved: 0
    });
    //console.log(rotatable([0, 2, 1], 1, 1, board));

    // 보드의 각 위치의 각 로봇이 방문한적 있는지를 저장하는 3차원 배열
    let visited = [];
    for (let i = 0; i < board.length; i++) {
        visited[i] = [];
        for (let j = 0; j < board.length; j++) {
            visited[i][j] = [false, false, false, false];
        }
    }
    visited[0][0][0] = true; // 시작점

    // BFS 방식으로 시도
    while (!queue.isEmpty()) {
        let current = queue.deleteFront();

        // 1. 오른쪽 이동
        if (movable(current.robot, "right", board)) {
            let nextRobot = moveRobot(current.robot, "right");
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;

            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }
        }

        // 2. 아래쪽 이동
        if (movable(current.robot, "down", board)) {
            let nextRobot = moveRobot(current.robot, "down");
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;
            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }

        }

        // 3. 왼쪽 이동
        if (movable(current.robot, "left", board)) {
            let nextRobot = moveRobot(current.robot, "left");
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;
            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }

        }

        // 4. 위쪽 이동
        if (movable(current.robot, "up", board)) {
            let nextRobot = moveRobot(current.robot, "up");
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;
            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }

        }

        // 5. 기준점 중심 시계 회전
        if (rotatable(current.robot, 0, 1, board)) {
            let nextRobot = rotateRobot(current.robot, 0, 1);
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;
            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }

        }

        // 6. 기준점 중심 반시계 회전
        if (rotatable(current.robot, 0, -1, board)) {
            let nextRobot = rotateRobot(current.robot, 0, -1);
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;
            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }

        }

        // 7. 다른점 중심 시계 회전
        if (rotatable(current.robot, 1, 1, board)) {
            let nextRobot = rotateRobot(current.robot, 1, 1);
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;
            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }

        }

        // 8. 다른점 중심 반시계 회전
        if (rotatable(current.robot, 1, -1, board)) {
            let nextRobot = rotateRobot(current.robot, 1, -1);
            // 목적지에 도달했는지 확인
            if (reachedGoal(nextRobot, board.length)) return current.moved + 1;
            // 방문했는지 확인
            if (!visited[nextRobot[0]][nextRobot[1]][nextRobot[2]]) {
                queue.insertBack({
                    robot: nextRobot,
                    moved: current.moved + 1
                });
                // 방문처리
                visited[nextRobot[0]][nextRobot[1]][nextRobot[2]] = true;
                let [otherRow, otherCol, otherDir] = getOtherRobot(nextRobot);
                visited[otherRow][otherCol][otherDir] = true; // 해당 로봇과 같은 로봇도 방문처리!
            }
        }
    }

    return -1;
}

// 현재 로봇의 기준점과 방향을 토대로 로봇의 다른 칸의 좌표를 반환하는 함수
function getOtherSpot([row, col, dir]) {
    switch (dir) {
        case 0:
            return [row, col + 1];

        case 1:
            return [row + 1, col];

        case 2:
            return [row, col - 1];

        case 3:
            return [row - 1, col];
    }
}

// 현재 로봇과 동일한 다른 로봇 정보를 가져오는 함수
function getOtherRobot([row, col, dir]) {
    return [...getOtherSpot([row, col, dir]), (dir + 2) % 4];
}

// 현재 로봇이 목적지에 있는지를 반환하는 함수
function reachedGoal([row, col, dir], n) {
    // 기준점
    if (row === n - 1 && col === n - 1) return true;

    // 다른 점
    let [r, c] = getOtherSpot([row, col, dir]);
    if (r === n - 1 && c === n - 1) return true;

    return false;
}

// 현재 로봇을 특정 방향으로 움직일 수 있는지를 반환하는 함수
function movable([row, col, dir], direction, board) {
    let [otherRow, otherCol] = getOtherSpot([row, col, dir]);

    switch (direction) {
        case "right":
            return (col < board.length - 1 && otherCol < board.length - 1
                && board[row][col + 1] === 0 && board[otherRow][otherCol + 1] === 0);

        case "down":
            return (row < board.length - 1 && otherRow < board.length - 1
                && board[row + 1][col] === 0 && board[otherRow + 1][otherCol] === 0);

        case "left":
            return (col > 0 && otherCol > 0 && board[row][col - 1] === 0
                && board[otherRow][otherCol - 1] === 0);

        case "up":
            return (row > 0 && otherRow > 0 && board[row - 1][col] === 0
                && board[otherRow - 1][otherCol] === 0);
    }
}

// 현재 로봇을 특정 방향으로 회전할 수 있는지 반환하는 함수
function rotatable([row, col, dir], center, direction, board) {
    // 기준점을 중심으로 회전
    if (center === 0) {
        // 시계
        if (direction === 1) {
            switch (dir) {
                case 0:
                    return (row < board.length - 1 && board[row + 1][col] === 0 && board[row + 1][col + 1] === 0);
                case 1:
                    return (col > 0 && board[row][col - 1] === 0 && board[row + 1][col - 1] === 0);
                case 2:
                    return (row > 0 && board[row - 1][col] === 0 && board[row - 1][col - 1] === 0);
                case 3:
                    return (col < board.length - 1 && board[row][col + 1] === 0 && board[row - 1][col + 1] === 0);
            }
        }
        else if (direction === -1) {
            switch (dir) {
                case 0:
                    return (row > 0 && board[row - 1][col] === 0 && board[row - 1][col + 1] === 0);
                case 1:
                    return (col < board.length - 1 && board[row][col + 1] === 0 && board[row + 1][col + 1] === 0);
                case 2:
                    return (row < board.length - 1 && board[row + 1][col] === 0 && board[row + 1][col - 1] === 0);
                case 3:
                    return (col > 0 && board[row][col - 1] === 0 && board[row - 1][col - 1] === 0);
            }
        }
    }

    // 다른점 기준으로 회전
    else if (center === 1) {
        // 시계
        if (direction === 1) {
            switch (dir) {
                case 0:
                    return (row > 0 && board[row - 1][col] === 0 && board[row - 1][col + 1] === 0);
                case 1:
                    return (col < board.length - 1 && board[row][col + 1] === 0 && board[row + 1][col + 1] === 0);
                case 2:
                    return (row < board.length - 1 && board[row + 1][col] === 0 && board[row + 1][col - 1] === 0);
                case 3:
                    return (col > 0 && board[row][col - 1] === 0 && board[row - 1][col - 1] === 0);
            }
        }
        // 반시계
        else if (direction === -1) {
            switch (dir) {
                case 0:
                    return (row < board.length - 1 && board[row + 1][col] === 0 && board[row + 1][col + 1] === 0);
                case 1:
                    return (col > 0 && board[row][col - 1] === 0 && board[row + 1][col - 1] === 0);
                case 2:
                    return (row > 0 && board[row - 1][col] === 0 && board[row - 1][col - 1] === 0);
                case 3:
                    return (col < board.length - 1 && board[row][col + 1] === 0 && board[row - 1][col + 1] === 0);
            }
        }
    }
}

// 현재 로봇을 움직인 결과 좌표 정보를 반환하는 함수
function moveRobot([row, col, dir], direction) {
    switch (direction) {
        case "right":
            return [row, col + 1, dir];

        case "down":
            return [row + 1, col, dir];

        case "left":
            return [row, col - 1, dir];

        case "up":
            return [row - 1, col, dir];
    }
}

// 현재 로봇을 회전한 결과 좌표 정보를 반환하는 함수
function rotateRobot([row, col, dir], center, direction) {
    // 로봇의 기준점을 중심으로 회전하는 경우
    if (center === 0) {
        if (direction === 1)
            return [row, col, (dir + 1) % 4];

        else if (direction === -1)
            return [row, col, (dir + 3) % 4];
    }
    // 로봇의 다른점을 중심으로 회전하는 경우
    else if (center === 1) {
        // 시계방향
        if (direction === 1) {
            switch (dir) {
                case 0:
                    return [row - 1, col + 1, 1];

                case 1:
                    return [row + 1, col + 1, 2];

                case 2:
                    return [row + 1, col - 1, 3];

                case 3:
                    return [row - 1, col - 1, 0];
            }
        }

        // 반시계 방향
        else if (direction === -1) {
            switch (dir) {
                case 0:
                    return [row + 1, col + 1, 3];

                case 1:
                    return [row + 1, col - 1, 0];

                case 2:
                    return [row - 1, col - 1, 1];

                case 3:
                    return [row - 1, col + 1, 2];
            }
        }
    }
}