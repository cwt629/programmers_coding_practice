/* 
[3단계] 퍼즐 조각 채우기
(연습문제: 깊이/너비 우선 탐색(DFS/BFS))
*/

// 각 블록 정보
class Block {
    constructor(coords) {
        this.coords = coords;
        this.size = coords.length;
        this.saveByCoords(coords);
    }

    // 블록을 이루는 좌표들을 블록 데이터로 저장하는 함수
    saveByCoords(coords) {
        let minRow = coords[0][0], maxRow = coords[0][0];
        let minCol = coords[0][1], maxCol = coords[0][1];

        for (let i = 1; i < coords.length; i++) {
            const [r, c] = coords[i];
            if (r < minRow) minRow = r;
            if (r > maxRow) maxRow = r;
            if (c < minCol) minCol = c;
            if (c > maxCol) maxCol = c;
        }

        // 구한 최대/최소 행/열을 블록의 경계로 설정한다
        this.rowLength = maxRow - minRow + 1;
        this.colLength = maxCol - minCol + 1;

        // 그 경계에 따른 이차원 직사각행렬 구성
        this.elements = [];
        for (let i = 0; i < this.rowLength; i++) {
            this.elements[i] = Array.from({ length: this.colLength }, () => (0));
        }
        // 1 채우기(구성되는 블록 좌표들)
        for (let [r, c] of coords) {
            const [newRow, newCol] = [r - minRow, c - minCol];
            this.elements[newRow][newCol] = 1;
        }
    }

    // 시계방향으로 90도 회전하는 함수
    rotate() {
        let newCoords = [];
        for (let r = 0; r < this.rowLength; r++) {
            for (let c = 0; c < this.colLength; c++) {
                // 1이 되는 부분의 회전되는 좌표를 구한다
                if (this.elements[r][c] === 1) {
                    const newRow = c;
                    const newCol = this.rowLength - 1 - r;
                    newCoords.push([newRow, newCol]);
                }
            }
        }

        this.saveByCoords(newCoords);
    }

    // 이 블록을 다른 블록과 비교하여 맞춰지는지 판단하는 함수
    match(otherBlock) {
        // 사이즈가 안맞는 경우는 바로 패스한다
        if (!(this.rowLength === otherBlock.rowLength && this.colLength === otherBlock.colLength) && !(this.rowLength === otherBlock.colLength && this.colLength === otherBlock.rowLength)) return false;

        for (let rotated = 0; rotated < 4; rotated++) {
            // 사이즈가 맞는 경우만 판단
            if (this.rowLength === otherBlock.rowLength && this.colLength === otherBlock.colLength) {
                // 두 블록 사이 비교
                let matched = true;
                for (let i = 0; i < this.rowLength && matched; i++) {
                    for (let j = 0; j < this.colLength && matched; j++) {
                        if (this.elements[i][j] !== otherBlock.elements[i][j])
                            matched = false;
                    }
                }

                // 한 번이라도 매치되면 바로 가능
                if (matched) return true;
            }
            // 블록 회전
            this.rotate();
        }

        // 탈출할 때까지 매치가 안되면 그냥 안되는 거
        return false;
    }
}

function solution(game_board, table) {
    let answer = 0;

    // 방문 여부 배열
    let visited = [];
    for (let i = 0; i < table.length; i++) {
        visited[i] = Array.from({ length: table.length }, () => (false));
    }

    // 빈칸들이나 블록을 DFS 방식으로 탐색하는 함수(stack 활용)
    function dfs(x, y, checker, board) {
        let dfsStack = [[x, y]];
        let coords = [];

        visited[x][y] = true;
        while (dfsStack.length > 0) {
            const [r, c] = dfsStack.pop();
            coords = [...coords, [r, c]]; // 빼낼 때 해당 위치를 좌표로 저장해주자
            // 오른쪽
            if (c < table.length - 1 && !visited[r][c + 1] && board[r][c + 1] === checker) {
                visited[r][c + 1] = true;
                dfsStack.push([r, c + 1]);
            }

            // 아래쪽
            if (r < table.length - 1 && !visited[r + 1][c] && board[r + 1][c] === checker) {
                visited[r + 1][c] = true;
                dfsStack.push([r + 1, c]);
            }

            // 왼쪽
            if (c > 0 && !visited[r][c - 1] && board[r][c - 1] === checker) {
                visited[r][c - 1] = true;
                dfsStack.push([r, c - 1]);
            }

            // 위쪽
            if (r > 0 && !visited[r - 1][c] && board[r - 1][c] === checker) {
                visited[r - 1][c] = true;
                dfsStack.push([r - 1, c]);
            }
        }

        // 저장된 좌표들 반환
        return coords;
    }

    // 게임 보드에서 빈칸들을 블록 형태로 저장한다
    let empties = [];
    for (let i = 0; i < game_board.length; i++) {
        for (let j = 0; j < game_board.length; j++) {
            if (!visited[i][j] && game_board[i][j] === 0) {
                let coords = dfs(i, j, 0, game_board);
                empties.push(new Block(coords));
            }
        }
    }

    initVisited(visited);
    // 테이블에서 퍼즐 조각들을 블록 형태로 저장한다
    let puzzles = [];
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table.length; j++) {
            if (!visited[i][j] && table[i][j] === 1) {
                let coords = dfs(i, j, 1, table);
                puzzles.push(new Block(coords));
            }
        }
    }

    // 구한 퍼즐들을 빈 칸에 모두 대조해본다
    let matched = Array.from({ length: empties.length }, () => (false)); // 특정 빈칸이 매치되었는지 여부
    for (let block of puzzles) {
        for (let i = 0; i < empties.length; i++) {
            // 매치된 빈칸은 패스
            if (matched[i]) continue;

            // 블록과 해당 빈칸을 매치한다
            if (block.match(empties[i])) {
                matched[i] = true;
                answer += block.size;
                break;
            }
        }
    }

    return answer;
}

// visited 배열을 초기화하는 함수
function initVisited(visited) {
    for (let i = 0; i < visited.length; i++) {
        for (let j = 0; j < visited[i].length; j++) {
            visited[i][j] = false;
        }
    }
}