/* 
[3단계] 아이템 줍기
(연습문제: 깊이/너비 우선 탐색(DFS/BFS))
*/

/* 
본 문제는 DFS/BFS 연습문제이지만, 나같은 경우
단순 시뮬레이션 형태로 구현했다.
그러다보니, 예외처리 과정이 너무 복잡해지고
각 이동 과정에 복잡한 코드가 작성되었다.
DFS/BFS로 탐색하는 방법도 익힐 필요가 있겠다.
*/

class Rectangle {
    constructor(ldX, ldY, ruX, ruY) {
        this.leftDown = [ldX, ldY];
        this.rightUp = [ruX, ruY];
    }

    // 특정 좌표가 이 사각형 위에 있는지 판단
    contains([x, y]) {
        if (this.leftDown[0] === x || this.rightUp[0] === x) {
            // y의 범위 체크
            return y >= this.leftDown[1] && y <= this.rightUp[1];
        }
        if (this.leftDown[1] === y || this.rightUp[1] === y) {
            return x >= this.leftDown[0] && x <= this.rightUp[0];
        }
        // x, y가 전혀 안맞으면
        return false;
    }

    // 특정 좌표가 코너에 있는지 판단
    atCorner([x, y]) {
        return corresponds([x, y], this.leftDown) || corresponds([x, y], this.rightUp) || corresponds([x, y], [this.leftDown[0], this.rightUp[1]]) || corresponds([x, y], [this.rightUp[0], this.leftDown[1]]);
    }

    // (좌표가 이 사각형 위에 있어서 갈아탈 때) 어느 방향으로 움직일지 판단하는 함수
    indicateDirection([x, y]) {
        // 코너에 있는 경우
        if (this.atCorner([x, y])) {
            // 좌하단 코너
            if (corresponds([x, y], this.leftDown)) return "up";
            // 좌상단 코너
            if (corresponds([x, y], [this.leftDown[0], this.rightUp[1]])) return "right";
            // 우상단 코너
            if (corresponds([x, y], this.rightUp)) return "down";
            // 우하단 코너
            return "left";
        }
        // 사각형을 시계방향으로 돈다고 가정하고 방향을 정한다
        if (this.leftDown[0] === x) return "up";
        if (this.leftDown[1] === y) return "left";
        if (this.rightUp[0] === x) return "down";
        if (this.rightUp[1] === y) return "right";
    }

    // 특정 좌표가 사각형 내부로 들어가버리는지 판단하는 함수
    goingInside([x, y], [prevX, prevY]) {
        const [midX, midY] = [(x + prevX) / 2, (y + prevY) / 2]; // 이동하는 중간을 본다
        if (midX > this.leftDown[0] && midX < this.rightUp[0] && midY > this.leftDown[1] && midY < this.rightUp[1]) return true;

        return false;
    }
}

function solution(rectangle, characterX, characterY, itemX, itemY) {
    let answer = 0;
    let totalLength = 0;

    // 사각형 객체들 생성
    let rects = rectangle.map((rectData) => (new Rectangle(...rectData)));

    let currentRectangle;
    // 현재 점이 어느 사각형에 있는지 찾는다
    for (let rect of rects) {
        if (rect.contains([characterX, characterY])) {
            let expectingDir = rect.indicateDirection([characterX, characterY]);
            let nextPoint = moveToward([characterX, characterY], expectingDir);
            // 이동할 다음 점이 특정 사각형의 내부로 들어가버리는 경우를 걸러야 한다.
            // 이는 시작점이 두 사각형의 교점인 경우 발생 가능
            let makesTrouble = false;
            for (let otherRect of rects) {
                if (otherRect.goingInside(nextPoint, [characterX, characterY])) {
                    makesTrouble = true;
                    break;
                }
            }
            if (!makesTrouble) {
                currentRectangle = rect;
                break;
            }
        }
    }
    if (!currentRectangle) {
        throw new Error("사각형을 못찾았어요!");
    }

    // 현재 점에서 출발할 방향 설정
    let direction = currentRectangle.indicateDirection([characterX, characterY]);

    let [x, y] = [characterX, characterY];

    do {
        // 이동
        [x, y] = moveToward([x, y], direction);
        totalLength++;
        // 아이템 위치에 도달한 경우(그래도 전체 길이를 구하기 위해 break하진 않는다)
        if (corresponds([x, y], [itemX, itemY])) {
            answer = totalLength;
        }
        // 다른 사각형으로 갈아타야하는지 확인
        for (let rect of rects) {
            if (currentRectangle === rect) continue;
            if (rect.contains([x, y])) {
                currentRectangle = rect;
                break;
            }
        }
        // 현재 사각형에서 방향 정하기
        if (currentRectangle.atCorner([x, y])) {
            direction = rotateClockwise(direction);
        }
        else direction = currentRectangle.indicateDirection([x, y]);
    } while (!corresponds([x, y], [characterX, characterY]));

    // 지금 구한 길이와, 전체 길이에서 뺀 길이 중 최소를 취한다
    answer = Math.min(answer, totalLength - answer);
    return answer;
}

// 방향에 따라 좌표를 움직이는 함수
function moveToward([x, y], direction) {
    switch (direction) {
        case "right":
            return [x + 1, y];

        case "up":
            return [x, y + 1];

        case "left":
            return [x - 1, y];

        case "down":
            return [x, y - 1];
    }
}

// 방향을 바꾸는 함수
function rotateClockwise(direction) {
    switch (direction) {
        case "up":
            return "right";

        case "right":
            return "down";

        case "down":
            return "left";

        case "left":
            return "up";
    }
}

// 두 좌표가 일치하는지 판단하는 함수
function corresponds([x1, y1], [x2, y2]) {
    return x1 === x2 && y1 === y2;
}