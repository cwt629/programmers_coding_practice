/*
[2단계] 무인도 여행
(연습문제)
*/

function solution(maps) {
    let answer = [];
    let visited = [];
    for (let i = 0; i < maps.length; i++) {
        visited[i] = [];
        for (let j = 0; j < maps[0].length; j++) {
            visited[i][j] = false;
        }
    }

    for (let i = 0; i < maps.length; i++) {
        for (let j = 0; j < maps[0].length; j++) {
            if (!visited[i][j] && maps[i].charAt(j) !== 'X') {
                // 해당 위치에서부터 DFS 방식으로 탐색을 시작한다
                let dfsStack = [];
                let days = Number(maps[i].charAt(j));
                dfsStack.push({ row: i, col: j });
                visited[i][j] = true;

                while (dfsStack.length > 0) {
                    let current = dfsStack.pop();

                    // 오른쪽 이동
                    if (current.col < maps[0].length - 1 && !visited[current.row][current.col + 1]
                        && maps[current.row].charAt(current.col + 1) !== 'X') {
                        visited[current.row][current.col + 1] = true;
                        days += Number(maps[current.row].charAt(current.col + 1));
                        dfsStack.push({ row: current.row, col: current.col + 1 });
                    }

                    // 아래쪽 이동
                    if (current.row < maps.length - 1 && !visited[current.row + 1][current.col]
                        && maps[current.row + 1].charAt(current.col) !== 'X') {
                        visited[current.row + 1][current.col] = true;
                        days += Number(maps[current.row + 1].charAt(current.col));
                        dfsStack.push({ row: current.row + 1, col: current.col });
                    }

                    // 왼쪽 이동
                    if (current.col > 0 && !visited[current.row][current.col - 1]
                        && maps[current.row].charAt(current.col - 1) !== 'X') {
                        visited[current.row][current.col - 1] = true;
                        days += Number(maps[current.row].charAt(current.col - 1));
                        dfsStack.push({ row: current.row, col: current.col - 1 });
                    }

                    // 위쪽 이동
                    if (current.row > 0 && !visited[current.row - 1][current.col]
                        && maps[current.row - 1].charAt(current.col) !== 'X') {
                        visited[current.row - 1][current.col] = true;
                        days += Number(maps[current.row - 1].charAt(current.col));
                        dfsStack.push({ row: current.row - 1, col: current.col });
                    }
                }

                // DFS 탐색 마친 뒤, 합쳐진 값 반영
                answer.push(days);
            }
        }
    }

    // 지낼 수 있는 무인도가 없는 경우
    if (answer.length === 0) return [-1];

    // 무인도 정보를 오름차순으로 담기
    answer.sort((a, b) => (a - b));

    return answer;
}