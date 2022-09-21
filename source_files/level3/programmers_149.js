/* 
[3단계] 기둥과 보 설치
(2020 KAKAO BLIND RECRUITMENT)
*/

function solution(n, build_frame) {
    // 각 교차점에서의 기둥
    let pillars = [];
    for (let x = 0; x <= n; x++) {
        pillars[x] = [];
        for (let y = 0; y <= n; y++) {
            pillars[x][y] = false;
        }
    }

    // 각 교차점에서의 보
    let beams = [];
    for (let x = 0; x <= n; x++) {
        beams[x] = [];
        for (let y = 0; y <= n; y++) {
            beams[x][y] = false;
        }
    }

    // build_frame에 따라 진행
    build_frame.forEach(([x, y, structure, job]) => {
        if (structure === 0) {
            if (job === 0)
                removePillar([x, y], pillars, beams, n);
            else if (job === 1)
                insertPillar([x, y], pillars, beams, n);
        }
        else if (structure === 1) {
            if (job === 0)
                removeBeam([x, y], pillars, beams, n);
            else if (job === 1)
                insertBeam([x, y], pillars, beams, n);
        }
    })

    return getResult(pillars, beams, n);
}

// 주어진 좌표에 기둥을 삽입하는 함수
function insertPillar([x, y], pillars, beams, n) {
    // 바닥 위인 경우
    if (y === 0) {
        pillars[x][y] = true;
    }

    // 보의 한쪽끝 위인 경우
    else if ((x > 0 && beams[x - 1][y]) || beams[x][y]) {
        pillars[x][y] = true;
    }

    // 다른 기둥 위인 경우
    else if (pillars[x][y - 1]) {
        pillars[x][y] = true;
    }
}

// 주어진 좌표에서 기둥을 삭제하는 함수
function removePillar([x, y], pillars, beams, n) {
    // 1. 위에 있던 기둥: 밑에 최소한 하나의 보라도 있어야 함
    if (pillars[x][y + 1]) {
        if (!((x > 0 && beams[x - 1][y + 1]) || beams[x][y + 1])) return;
    }

    // 2. 위에 있던 왼쪽 보: 왼쪽 아래에 기둥이 있거나, 양옆에 보가 있어야 함
    if (x > 0 && beams[x - 1][y + 1]) {
        if (!(pillars[x - 1][y] || (x - 1 > 0 && beams[x - 2][y + 1] && beams[x][y + 1]))) return;
    }

    // 3. 위에 있던 오른쪽 보: 오른쪽 아래에 기둥이 있거나, 양옆에 보가 있어야 함
    if (beams[x][y + 1]) {
        if (!(pillars[x + 1][y] || (x > 0 && beams[x - 1][y + 1] && beams[x + 1][y + 1]))) return;
    }

    // 모두 확인했다면 삭제 진행
    pillars[x][y] = false;
}

// 주어진 좌표에 보를 삽입하는 함수
function insertBeam([x, y], pillars, beams, n) {
    // 한쪽 끝이 기둥 위인 경우
    if (y > 0 && (pillars[x][y - 1] || pillars[x + 1][y - 1])) {
        beams[x][y] = true;
    }

    // 양쪽 끝이 다른 보와 동시에 연결된 경우
    else if (x > 0 && x < n - 1 && beams[x - 1][y] && beams[x + 1][y]) {
        beams[x][y] = true;
    }
}

// 주어진 좌표에서 보를 삭제하는 함수
function removeBeam([x, y], pillars, beams, n) {
    // 1. 위에 있던 왼쪽 기둥: 아래에 기둥이 있거나 왼쪽에 보가 있어야 함
    if (pillars[x][y]) {
        if (!((y > 0 && pillars[x][y - 1]) || (x > 0 && beams[x - 1][y]))) return;
    }

    // 2. 위에 있던 오른쪽 기둥: 아래에 기둥이 있거나 오른쪽에 보가 있어야 함
    if (pillars[x + 1][y]) {
        if (!((y > 0 && pillars[x + 1][y - 1]) || beams[x + 1][y])) return;
    }

    // 3. 왼쪽에 있던 보: 아래에 기둥이 하나라도 있어야 함
    if (x > 0 && beams[x - 1][y]) {
        if (!(pillars[x - 1][y - 1] || pillars[x][y - 1])) return;
    }

    // 4. 오른쪽에 있던 보: 아래에 기둥이 하나라도 있어야 함
    if (beams[x + 1][y]) {
        if (!(pillars[x + 1][y - 1] || (x + 2 <= n && pillars[x + 2][y - 1]))) return;
    }

    // 모두 확인하면, 삭제 진행
    beams[x][y] = false;
}

// 주어진 pillars와 beams 배열을 바탕으로 결과를 반환하는 함수
function getResult(pillars, beams, n) {
    let result = [];
    for (let x = 0; x <= n; x++) {
        for (let y = 0; y <= n; y++) {
            // 기둥
            if (pillars[x][y]) result.push([x, y, 0]);
            // 보
            if (beams[x][y]) result.push([x, y, 1]);
        }
    }

    return result;
}