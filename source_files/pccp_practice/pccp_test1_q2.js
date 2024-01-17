/*
[PCCP 기출문제 > PCCP 기출 2번]
2번 / 석유 시추
*/

class OilSpot {
    constructor(size, minCol, maxCol) {
        this.size = size;
        this.minCol = minCol;
        this.maxCol = maxCol;
    }
}

function solution(land) {
    let visited = []; // DFS 탐색에 필요한 방문 여부 배열
    for (let i = 0; i < land.length; i++) {
        visited[i] = [];
        for (let j = 0; j < land[i].length; j++) {
            visited[i][j] = false;
        }
    }

    // 모든 부분을 탐색하며 석유 덩어리들을 담는다
    let oilSpots = [];
    for (let i = 0; i < land.length; i++) {
        for (let j = 0; j < land[i].length; j++) {
            // 방문하지 않은 석유 땅을 찾은 경우
            if (land[i][j] === 1 && !visited[i][j]) {
                visited[i][j] = true;
                let minCol = j, maxCol = j; // 석유지가 포함되는 영역표시
                let dfsStack = [[i, j]]; // 좌표를 담을 배열: DFS용
                let size = 1;

                // DFS 방식으로, stack을 활용해 탐색
                while (dfsStack.length > 0) {
                    let [row, col] = dfsStack.pop();

                    // 아래쪽 이동
                    if (row < land.length - 1 && land[row + 1][col] === 1 && !visited[row + 1][col]) {
                        visited[row + 1][col] = true;
                        size++;

                        dfsStack.push([row + 1, col]);
                    }

                    // 오른쪽 이동
                    if (col < land[0].length - 1 && land[row][col + 1] === 1 && !visited[row][col + 1]) {
                        visited[row][col + 1] = true;
                        size++;
                        // 영역표시 갱신
                        if (maxCol < col + 1) maxCol = col + 1;

                        dfsStack.push([row, col + 1]);
                    }

                    // 위쪽 이동
                    if (row > 0 && land[row - 1][col] === 1 && !visited[row - 1][col]) {
                        visited[row - 1][col] = true;
                        size++;

                        dfsStack.push([row - 1, col]);
                    }

                    // 왼쪽 이동
                    if (col > 0 && land[row][col - 1] === 1 && !visited[row][col - 1]) {
                        visited[row][col - 1] = true;
                        size++;
                        // 영역표시 갱신
                        if (minCol > col - 1) minCol = col - 1;

                        dfsStack.push([row, col - 1]);
                    }
                }

                // 최종 데이터 저장
                oilSpots.push(new OilSpot(size, minCol, maxCol));
            }
        }
    }

    let oilByCol = Array.from({ length: land[0].length }, () => (0)) // 열마다 뽑을 수 있는 석유량을 나타내는 배열

    for (let spot of oilSpots) {
        // 열에 대해서 석유량 측정
        for (let col = spot.minCol; col <= spot.maxCol; col++) {
            oilByCol[col] += spot.size;
        }
    }

    return getMax(oilByCol);
}

// 배열에서 최대값을 구하는 함수
function getMax(arr) {
    let max = -1;
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i])
            max = arr[i];
    }

    return max;
}