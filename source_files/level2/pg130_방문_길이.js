/* 
[2단계] 방문 길이
(Summer/Winter Coding(~2018))
*/

function solution(dirs) {
    let position = [0, 0];
    let passed = {
        vert: [],
        horiz: []
    };

    for (let direction of dirs) {
        move(position, direction, passed);
    }

    // 지나온 길의 길이
    return passed.vert.length + passed.horiz.length;
}

// 두 좌표 사이의 길이 어느 타입의 몇번째 길인지 판단하는 함수(가능한 입력만 들어옴)
function getRoadInfo([x1, y1], [x2, y2]) {
    let result = {
        type: null,
        number: 0
    };

    // 수직 방향으로 이동하는 경우
    if (x1 === x2) {
        // 더 큰 y값 받아옴
        const standardY = Math.max(y1, y2);
        result.type = "vert";
        result.number = 10 * x1 + standardY;
    }
    // 수평 방향으로 이동하는 경우
    else {
        // 더 큰 x값 받아옴
        const standardX = Math.max(x1, x2);
        result.type = "horiz";
        result.number = 10 * y1 + standardX;
    }

    return result;
}

// 시작 좌표에서 명령어 방향대로 움직이는 함수
function move(position, direction, passed) {
    let nextPosition;

    switch (direction) {
        case "U":
            // 위로 올라갈 수 없는 경우
            if (position[1] === 5) return;
            nextPosition = [position[0], position[1] + 1];
            break;

        case "D":
            // 아래로 내려갈 수 없는 경우
            if (position[1] === -5) return;
            nextPosition = [position[0], position[1] - 1];
            break;

        case "R":
            // 오른쪽으로 이동할 수 없는 경우
            if (position[0] === 5) return;
            nextPosition = [position[0] + 1, position[1]];
            break;

        case "L":
            // 왼쪽으로 이동할 수 없는 경우
            if (position[0] === -5) return;
            nextPosition = [position[0] - 1, position[1]];
            break;

        default:
            return;
    }

    // path 갱신
    const roadInfo = getRoadInfo(position, nextPosition);
    if (!passed[roadInfo.type].includes(roadInfo.number))
        passed[roadInfo.type].push(roadInfo.number);
    [position[0], position[1]] = [...nextPosition];
}