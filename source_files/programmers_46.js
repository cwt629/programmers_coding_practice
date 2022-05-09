/* 
[2단계] 빛의 경로 사이클
(월간 코드 챌린지 시즌3)
*/

console.log(solution(["SL", "LR"]), solution(["S"]), solution(["R", "R"]));

function solution(grid) {
    var answer = [];
    const rows = grid.length, cols = grid[0].length;
    const directions = ["up", "right", "down", "left"];

    // 빛이 특정 경로를 지났는지 여부 초기화
    var lighted = [];
    for (let i = 0; i < rows; i++) {
        lighted[i] = [];
        for (let j = 0; j < cols; j++) {
            lighted[i][j] = [];
            lighted[i][j]["up"] = false;
            lighted[i][j]["right"] = false;
            lighted[i][j]["down"] = false;
            lighted[i][j]["left"] = false;
        }
    }

    // 모든 경로 탐색
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (let dir = 0; dir < 4; dir++) {
                // 지나가지 않은 경우만 탐색
                if (!lighted[i][j][directions[dir]]) {
                    var count = 0;
                    var currentState = [i, j, directions[dir]];
                    // 현재 빛의 위치와 같은 위치가 될 때까지 반복
                    do {
                        // 1번 이동
                        count++;
                        // 이동했음을 표시한다
                        lighted[currentState[0]][currentState[1]][currentState[2]] = true;
                        // 해당 위치로 이동하고, 어디로 가야하는지 결정
                        const nextIndices = toward(...currentState, rows, cols);
                        const nextDirection = changeDirection(currentState[2], grid[nextIndices[0]].charAt(nextIndices[1]), directions);

                        currentState = [...nextIndices, nextDirection];
                    } while (JSON.stringify(currentState) !== JSON.stringify([i, j, directions[dir]]));

                    // 결과값 저장
                    answer.push(count);
                }
            }
        }
    }

    // 결과 오름차순 정렬
    answer.sort((a, b) => {
        return a - b;
    })

    return answer;
}

// 특정 격자를 만났을 때, 해당 방향에서 어느 방향으로 바뀌는지 반환하는 함수
function changeDirection(going, signal, directions) {
    var current;

    switch (signal) {
        // S는 그대로
        case "S":
            return going;

        // L은 왼쪽
        case "L":
            // 현재 방향의 인덱스
            current = directions.indexOf(going);
            // 인덱스를 왼쪽으로 이동시키면 가야할 방향이 나온다
            return directions[(current + 3) % 4];

        // R은 오른쪽
        case "R":
            current = directions.indexOf(going);
            // 인덱스를 오른쪽으로 이동시키면 가야할 방향이 나온다
            return directions[(current + 1) % 4];
    }
}

// 현위치에서 특정 방향으로 이동 시 이동할 위치를 반환하는 함수
function toward(i, j, dir, rows, cols) {
    switch (dir) {
        case "up":
            return [(i - 1 + rows) % rows, j];

        case "right":
            return [i, (j + 1) % cols];

        case "down":
            return [(i + 1) % rows, j];

        case "left":
            return [i, (j - 1 + cols) % cols];
    }
}

