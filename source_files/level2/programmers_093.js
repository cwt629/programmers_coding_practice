/* 
[2단계] 가장 큰 정사각형 찾기
(연습문제)
*/

function solution(board) {
    // Idea: 각 보드의 성분을 해당 성분을 포함해 만들 수 있는 정사각형의 한 변의 길이 최대값으로 저장하며, 이는 해당 성분의 위, 왼대각, 왼쪽까지 만든 정사각형에서 확장하는 식으로 진행한다
    var myBoard = [];

    // 1행과 1열은 구석자리로, 기본 값으로 지정
    myBoard[0] = [];
    for (let i = 0; i < board[0].length; i++) // 1행
        myBoard[0][i] = board[0][i];
    for (let i = 1; i < board.length; i++) // 1열
        myBoard[i] = [board[i][0]];

    // 이차원 배열 탐색
    for (let i = 1; i < board.length; i++) {
        for (let j = 1; j < board[0].length; j++) {
            // 해당 칸이 0이면, 0으로 입력
            if (board[i][j] === 0)
                myBoard[i][j] = 0;
            // 해당 칸이 1이면, 왼대각, 위, 왼쪽에서 만든 정사각형 중 가장 작은 정사각형 크기에 +1 하여 해당 칸을 잇는다
            else myBoard[i][j] = Math.min(myBoard[i - 1][j - 1], myBoard[i - 1][j], myBoard[i][j - 1]) + 1;
        }
    }

    // 구해진 정사각형 크기들 중 가장 큰 값을 찾는다
    const maxLen = Math.max(...myBoard.map((row) => (Math.max(...row))));

    return maxLen * maxLen;
}



// 1st try: 찾은 0의 위치를 기반으로 정사각형 크기 조율하고, 크기를 줄여가며 완전탐색(시간초과)
//
// function solution(board) {
//     // 찾아볼 정사각형의 한 변의 길이(시작은 board의 가로 세로 중 더 짧은 길이)
//     var len = Math.min(board.length, board[0].length);
//     // 직전에 찾은 "0"의 좌표(탐색 시에 시간 단축을 위함)
//     var recentZero = [-1, -1];

//     // 길이를 줄여가며 정사각형 탐색
//     while (len > 0) {
//         var lenChanged = false;
//         // 정사각형의 좌측 상단 꼭지점을 기준으로 탐색
//         for (let i = 0; i <= board.length - len; i++) {
//             for (let j = 0; j <= board[0].length - len; j++) {
//                 // 직전에 찾은 0의 좌표가 해당 범위 안에 있으면 패스한다
//                 if (insideSquare(recentZero, [i, j], len)) continue;

//                 var needBreak = false;
//                 // 현재 좌상단 꼭지점에서 len * len만큼의 정사각형 탐색
//                 for (let a = i; a < i + len; a++) {
//                     for (let b = j; b < j + len; b++) {
//                         // 0이 발견되는 경우
//                         if (board[a][b] === 0) {
//                             // 해당 0의 위치 저장
//                             recentZero = [a, b];
//                             // 해당 0을 무조건 포함하지 않을 정도까지 len을 줄인다(board의 각 꼭지점에서 만드는 정사각형이 0을 포함하게 되는 가장 큰 변의 길이를 구하고 1 줄여주기)
//                             const nextLen = Math.max(Math.max(a + 1, b + 1), Math.max(a + 1, board[0].length - b), Math.max(board.length - a, b + 1), Math.max(board.length - a, board[0].length - b)) - 1;
//                             if (nextLen < len) {
//                                 len = nextLen;
//                                 lenChanged = true;
//                             }
//                             needBreak = true;
//                             break;
//                         }
//                     }
//                     if (needBreak) break;
//                 }
//                 // 0이 발견되어 break되지 않은 경우는 해당 길이가 최대!
//                 if (!needBreak) return len * len;
//                 // 길이가 바뀐 경우, 바뀐 길이로 처음부터 다시 탐색한다
//                 if (lenChanged) break;
//             }
//             if (lenChanged) break;
//         }

//         // 모든 사각형을 탐색하고도 찾지 못했다면, 길이를 1 줄인다
//         if (!lenChanged) len--;
//     }

//     // while문을 벗어날 때까지 찾지 못한 경우는 모두 0인 경우이다
//     return 0;
// }

// // 특정 좌표가 주어진 좌상단 꼭지점에서 만들어지는 주어진 길이의 정사각형 내에 포함되는지 반환하는 함수
// function insideSquare(target, leftCorner, len) {
//     return (target[0] >= leftCorner[0] && target[0] < leftCorner[0] + len
//         && target[1] >= leftCorner[1] && target[1] < leftCorner[1] + len)
// }