/* 
[2단계] [1차] 프렌즈4블록
(2018 KAKAO BLIND RECRUITMENT)
*/

function solution(m, n, board) {
    var answer = 0;

    // 제거될 블록을 표시할 배열
    var marker = [];
    // 보드 정보를 이차원 배열에 저장
    var boards = [];
    for (let i = 0; i < m; i++) {
        boards[i] = [];
        marker[i] = [];
        for (let j = 0; j < n; j++) {
            boards[i].push(board[i].charAt(j));
            marker[i].push(false);
        }
    }

    // 탐색 시작
    var keepGoing = true;
    while (keepGoing) {
        // 초기화
        keepGoing = false;
        // 탐색
        for (let i = 0; i < m - 1; i++) {
            for (let j = 0; j < n - 1; j++) {
                // 네 칸 중 하나라도 빈 공간이 있다면, 패스한다
                if (boards[i][j] === "." || boards[i][j + 1] === "." ||
                    boards[i + 1][j] === "." || boards[i + 1][j + 1] === ".") continue;
                // 네 칸이 모두 같은 경우, 지워질 후보로 등록
                if (boards[i][j] === boards[i][j + 1] && boards[i][j] === boards[i + 1][j] && boards[i][j] === boards[i + 1][j + 1]) {
                    // 더 탐색할 필요가 있다
                    keepGoing = true;
                    // 해당 부분들에 대해 mark
                    marker[i][j] = true;
                    marker[i + 1][j] = true;
                    marker[i][j + 1] = true;
                    marker[i + 1][j + 1] = true;
                }
            }
        }

        // 탐색한 부분들 지워나가기
        if (keepGoing) {
            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    if (marker[i][j]) {
                        boards[i][j] = ".";
                        answer++;
                        // 마커 초기화
                        marker[i][j] = false;
                    }
                }
            }
            // 터진 공간 위에 있는 블록들을 모두 아래로 끌어내린다
            for (let i = 0; i < n; i++) {
                // 쌓일 위치와 탐색중인 부분
                var target = m - 1, pin = m - 1;
                while (pin >= 0) {
                    // 빈공간이 있을 때까지 타겟 이동
                    while (pin >= 0 && boards[target][i] !== ".") {
                        target--;
                        pin--;
                    }
                    // 빈공간을 모두 패스
                    while (pin >= 0 && boards[pin][i] === ".") pin--;
                    // 타겟이 있다면, 두 공간을 서로 swap해준다
                    if (pin >= 0) {
                        [boards[target][i], boards[pin][i]] = [boards[pin][i], boards[target][i]];
                        // target과 pin 위치 조정
                        target--;
                        pin = target;
                    }
                }
            }
        }
    }

    return answer;
}