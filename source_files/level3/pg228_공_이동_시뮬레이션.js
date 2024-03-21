/*
[3단계] 공 이동 시뮬레이션
(월간 코드 챌린지 시즌3)
*/

function solution(n, m, x, y, queries) {
    const [N, M, X, Y] = [BigInt(n), BigInt(m), BigInt(x), BigInt(y)];

    // 역순으로 따라가며, 가능한 영역을 표시해간다
    let data = { startRow: X, startCol: Y, endRow: X, endCol: Y };

    for (let i = queries.length - 1; i >= 0; i--) {
        let [direction, intlen] = queries[i];
        let len = BigInt(intlen);
        switch (direction) {
            // 왼쪽 이동 - 역순으로 오른쪽 이동해야 함
            case 0:
                // start가 벽끝에 있다면, col은 왼쪽벽끝 ~ end + len만큼이 가능 영역이다
                if (data.startCol === 0n) {
                    data.endCol = (data.endCol + len < M) ? data.endCol + len : M - 1n;
                    break;
                }

                // start가 벽끝에 있지 않다면, 그대로 오른쪽으로 len만큼 이동시킨다
                data.startCol += len; // 점이 없어지게 될 경우에 대비해 일부러 예외처리하지 않음
                data.endCol = (data.endCol + len < M) ? data.endCol + len : M - 1n;
                break;

            // 오른쪽 이동 - 역순으로 왼쪽 이동해야 함
            case 1:
                // end가 벽끝에 있다면, col은 start-len ~ 오른벽끝만큼이 가능 영역이다
                if (data.endCol === M - 1n) {
                    data.startCol = (data.startCol - len >= 0) ? data.startCol - len : 0n;
                    break;
                }
                // end가 벽끝에 있지 않다면, 그대로 왼쪽으로 len만큼 이동시킨다
                data.startCol = (data.startCol - len >= 0n) ? data.startCol - len : 0n;
                data.endCol -= len; // 점이 없어지게 될 경우에 대비해 일부러 예외처리하지 않음
                break;

            // 위쪽 이동 - 역순으로 아래로 이동해야 함
            case 2:
                // start가 벽끝에 있다면, row는 위쪽벽끝 ~ end + len만큼이 가능 영역이다
                if (data.startRow === 0n) {
                    data.endRow = (data.endRow + len < N) ? data.endRow + len : N - 1n;
                    break;
                }
                // start가 벽끝에 있지 않다면, 그대로 아래쪽으로 len만큼 이동시킨다
                data.startRow += len; // 점이 없어지게 될 경우에 대비해 일부러 예외처리하지 않음
                data.endRow = (data.endRow + len < N) ? data.endRow + len : N - 1n;
                break;

            // 아래쪽 이동 - 역순으로 위로 이동해야 함
            case 3:
                // end가 벽끝에 있다면, row는 start - len ~ 아래쪽벽끝만큼이 가능 영역이다
                if (data.endRow === N - 1n) {
                    data.startRow = (data.startRow - len >= 0n) ? data.startRow - len : 0n;
                    break;
                }
                // end가 벽끝에 있지 않다면, 그대로 위쪽으로 len만큼 이동시킨다
                data.startRow = (data.startRow - len >= 0n) ? data.startRow - len : 0n;
                data.endRow -= len; // 점이 없어지게 될 경우에 대비해 일부러 예외처리하지 않음
                break;
        }
        // 벗어난 뒤에 일부 이상현상이 생길 경우, 점이 아예 없는 경우이다
        if (data.startCol > data.endCol || data.startRow > data.endRow)
            return 0;
    }

    // 모두 완료되어도 영역은 사각형 형태로, 그 넓이를 구하면 시작점의 개수이다
    return (data.endRow - data.startRow + 1n) * (data.endCol - data.startCol + 1n);
}