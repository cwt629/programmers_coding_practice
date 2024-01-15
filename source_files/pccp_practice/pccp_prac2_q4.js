/*
[PCCP 모의고사2 > 2회 모의고사 4번]
4번 - 보물 지도
*/

function solution(n, m, hole) {
    // 방문 여부
    let visitedWithShoesOff = []; // 신비로운 신발 사용하지 않고 방문
    let visitedWithShoesOn = []; // 신비로운 신발 사용한 채 방문
    let isTrap = []; // 함정 여부

    for (let i = 1; i <= n; i++) {
        visitedWithShoesOff[i] = [];
        visitedWithShoesOn[i] = [];
        isTrap[i] = [];
        for (let j = 1; j <= m; j++) {
            visitedWithShoesOff[i][j] = false;
            visitedWithShoesOn[i][j] = false;
            isTrap[i][j] = false;
        }
    }

    // 함정 정보들 저장
    for (let [x, y] of hole) {
        isTrap[x][y] = true;
    }

    visitedWithShoesOff[1][1] = true;
    visitedWithShoesOn[1][1] = true;
    let bfsQueue = [{ x: 1, y: 1, moves: 0, usedShoes: false }];
    while (bfsQueue.length > 0) {
        let data = bfsQueue.shift();

        // 1. 오른쪽 이동: 걸어서
        if (data.x < n && !isTrap[data.x + 1][data.y] &&
            (!visitedWithShoesOff[data.x + 1][data.y] && (!data.usedShoes || !visitedWithShoesOn[data.x + 1][data.y]))) {
            // 여기서 목적지 도달한 경우, 바로 횟수 리턴
            if (data.x + 1 === n && data.y === m)
                return data.moves + 1;

            if (!data.usedShoes)
                visitedWithShoesOff[data.x + 1][data.y] = true;
            visitedWithShoesOn[data.x + 1][data.y] = true; // 신발을 안신고 더 빨리 도착했으면, 신고 올 필요 없음
            bfsQueue.push({ x: data.x + 1, y: data.y, moves: data.moves + 1, usedShoes: data.usedShoes });
        }

        // 2. 위쪽 이동: 걸어서
        if (data.y < m && !isTrap[data.x][data.y + 1] &&
            (!visitedWithShoesOff[data.x][data.y + 1] && (!data.usedShoes || !visitedWithShoesOn[data.x][data.y + 1]))) {
            // 여기서 목적지 도달한 경우, 바로 횟수 리턴
            if (data.x === n && data.y + 1 === m)
                return data.moves + 1;

            if (!data.usedShoes)
                visitedWithShoesOff[data.x][data.y + 1] = true;
            visitedWithShoesOn[data.x][data.y + 1] = true; // 신발을 안신고 더 빨리 도착했으면, 신고 올 필요 없음
            bfsQueue.push({ x: data.x, y: data.y + 1, moves: data.moves + 1, usedShoes: data.usedShoes });
        }

        // 3. 왼쪽 이동: 걸어서
        if (data.x > 1 && !isTrap[data.x - 1][data.y] &&
            (!visitedWithShoesOff[data.x - 1][data.y] && (!data.usedShoes || !visitedWithShoesOn[data.x - 1][data.y]))) {
            if (!data.usedShoes)
                visitedWithShoesOff[data.x - 1][data.y] = true;
            visitedWithShoesOn[data.x - 1][data.y] = true; // 신발을 안신고 더 빨리 도착했으면, 신고 올 필요 없음
            bfsQueue.push({ x: data.x - 1, y: data.y, moves: data.moves + 1, usedShoes: data.usedShoes });
        }

        // 4. 아래쪽 이동: 걸어서
        if (data.y > 1 && !isTrap[data.x][data.y - 1] &&
            (!visitedWithShoesOff[data.x][data.y - 1] && (!data.usedShoes || !visitedWithShoesOn[data.x][data.y - 1]))) {
            if (!data.usedShoes)
                visitedWithShoesOff[data.x][data.y - 1] = true;
            visitedWithShoesOn[data.x][data.y - 1] = true; // 신발을 안신고 더 빨리 도착했으면, 신고 올 필요 없음
            bfsQueue.push({ x: data.x, y: data.y - 1, moves: data.moves + 1, usedShoes: data.usedShoes });
        }

        // 5. 오른쪽 이동: 신발 사용
        if (data.x < n - 1 && !data.usedShoes && !isTrap[data.x + 2][data.y] && !visitedWithShoesOn[data.x + 2][data.y]) {
            // 여기서 목적지 달성한 경우, 횟수 리턴
            if (data.x + 2 === n && data.y === m)
                return data.moves + 1;

            visitedWithShoesOn[data.x + 2][data.y] = true;
            bfsQueue.push({ x: data.x + 2, y: data.y, moves: data.moves + 1, usedShoes: true });
        }

        // 6. 위쪽 이동: 신발 사용
        if (data.y < m - 1 && !data.usedShoes && !isTrap[data.x][data.y + 2] && !visitedWithShoesOn[data.x][data.y + 2]) {
            // 여기서 목적지 달성한 경우, 횟수 리턴
            if (data.x === n && data.y + 2 === m)
                return data.moves + 1;

            visitedWithShoesOn[data.x][data.y + 2] = true;
            bfsQueue.push({ x: data.x, y: data.y + 2, moves: data.moves + 1, usedShoes: true });
        }

        // 7. 왼쪽 이동: 신발 사용
        if (data.x > 2 && !data.usedShoes && !isTrap[data.x - 2][data.y] && !visitedWithShoesOn[data.x - 2][data.y]) {
            visitedWithShoesOn[data.x - 2][data.y] = true;
            bfsQueue.push({ x: data.x - 2, y: data.y, moves: data.moves + 1, usedShoes: true });
        }

        // 8. 아래쪽 이동: 신발 사용
        if (data.y > 2 && !data.usedShoes && !isTrap[data.x][data.y - 2] && !visitedWithShoesOn[data.x][data.y - 2]) {
            visitedWithShoesOn[data.x][data.y - 2] = true;
            bfsQueue.push({ x: data.x, y: data.y - 2, moves: data.moves + 1, usedShoes: true });
        }
    }

    return -1;
}