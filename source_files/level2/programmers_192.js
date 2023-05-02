/* 
[2단계] 혼자서 하는 틱택토
(연습문제)
*/

function solution(board) {
    // 1. 빙고 개수 체크
    const bingo = checkBingo(board);
    if (!bingo.available) return 0;

    // 2. O와 X의 개수 체크
    if (!isPossibleQuantity(board, bingo)) return 0;

    // 유효
    return 1;
}

// O와 X의 개수가 올바른지 보는 함수
function isPossibleQuantity(board, bingo) {
    // O와 X의 개수를 센다
    let countO = 0, countX = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            switch (board[i][j]) {
                case "O":
                    countO++;
                    break;

                case "X":
                    countX++;
                    break;
            }
        }
    }

    /* 
    다음 경우에 대해 유효하다
    1. O가 빙고가 됐다 -> O = X + 1
    2. X가 빙고가 됐다 -> O = X
    3. 빙고가 없다 -> O = X or O = X + 1
    */
    if (bingo["O"] > 0) return (countO === countX + 1);
    if (bingo["X"] > 0) return (countO === countX);
    return (countO === countX + 1) || (countO === countX);
}

// 빙고 여부 업데이트 함수
function updateBingo(bingo, mark) {
    if (mark === ".") return;
    bingo[mark]++;
}

// 빙고가 1개 이하인지 보는 함수
function checkBingo(board) {
    let bingo = { "O": 0, "X": 0, available: true };
    // 1. 가로 체크
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            updateBingo(bingo, board[i][0]);
        }
    }
    // 2. 세로 체크
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            updateBingo(bingo, board[0][i]);
        }
    }
    // 3-1. 대각선 체크(기울기 음수)
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        updateBingo(bingo, board[0][0]);
    }
    // 3-2. 대각선 체크(기울기 양수)
    if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
        updateBingo(bingo, board[1][1]);
    }

    // 빙고가 둘 중 하나만 돼야만 가능(O는 빙고 2개까지 가능. 이 외는 개수에서 걸러짐)
    if (bingo["O"] * bingo["X"] > 0) bingo.available = false;

    return bingo;
}