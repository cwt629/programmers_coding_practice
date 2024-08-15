/*
[2단계] [PCCP 기출문제] 2번/석유 시추
(PCCP 기출문제)
*/

function solution(land) {
    let oilSpot = Array.from({ length: land[0].length }, () => (0));
    let visited = Array.from({ length: land.length }, () => (
        Array.from({ length: land[0].length }, () => (false))
    ));

    // 탐색 시작
    for (let i = 0; i < land.length; i++) {
        for (let j = 0; j < land[i].length; j++) {
            if (!visited[i][j] && land[i][j] > 0) {
                // DFS 방식으로 탐색 시작
                let dfsStack = [[i, j]], amount = 0;
                let minCol = j, maxCol = j; // 좌우 경계
                visited[i][j] = true;

                while (dfsStack.length > 0) {
                    let [row, col] = dfsStack.pop();
                    amount++;
                    if (col < minCol) minCol = col;
                    if (col > maxCol) maxCol = col;

                    // 오른쪽
                    if (col < land[i].length - 1 && !visited[row][col + 1] && land[row][col + 1] > 0) {
                        dfsStack.push([row, col + 1]);
                        visited[row][col + 1] = true;
                    }
                    // 아래쪽
                    if (row < land.length - 1 && !visited[row + 1][col] && land[row + 1][col] > 0) {
                        dfsStack.push([row + 1, col]);
                        visited[row + 1][col] = true;
                    }
                    // 왼쪽
                    if (col > 0 && !visited[row][col - 1] && land[row][col - 1] > 0) {
                        dfsStack.push([row, col - 1]);
                        visited[row][col - 1] = true;
                    }
                    // 위쪽
                    if (row > 0 && !visited[row - 1][col] && land[row - 1][col] > 0) {
                        dfsStack.push([row - 1, col]);
                        visited[row - 1][col] = true;
                    }
                }

                // 구해진 경계에 대해서 oilSpot 저장
                for (let index = minCol; index <= maxCol; index++) {
                    oilSpot[index] += amount;
                }
            }
        }
    }

    return getMax(oilSpot);
}

// 주어진 배열에서 최대값을 구하는 함수(Math.max의 대체)
function getMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) max = arr[i];
    }

    return max;
}