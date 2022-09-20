/* 
[3단계] 자물쇠와 열쇠
(2020 KAKAO BLIND RECRUITMENT)
*/

function solution(key, lock) {
    const totalHoles = countHoles(lock);

    for (let rotation = 0; rotation < 4; rotation++) {
        // 위치를 움직여가며 맞춰본다
        for (let row = - key.length + 1; row < lock.length; row++) {
            for (let col = - key.length + 1; col < lock.length; col++) {
                if (matchBoth([row, col], key, lock, totalHoles)) return true;
            }
        }
        // key 회전
        key = rotateKey(key);
    }

    return false;
}

// 자물쇠의 홈의 개수를 세주는 함수
function countHoles(lock) {
    let result = 0;
    for (let i = 0; i < lock.length; i++) {
        for (let j = 0; j < lock[0].length; j++) {
            if (lock[i][j] === 0) result++;
        }
    }

    return result;
}

// 열쇠를 시계 방향으로 회전하는 함수
function rotateKey(key) {
    let result = [];
    for (let i = 0; i < key.length; i++)
        result[i] = [];

    for (let i = 0; i < key.length; i++) {
        for (let j = 0; j < key[0].length; j++) {
            result[j][key.length - 1 - i] = key[i][j];
        }
    }

    return result;
}

// key를 특정 지점에 놓았을 때, 자물쇠에 대어보는 함수
function matchBoth([startRow, startCol], key, lock, count) {
    let matched = 0;
    for (let row = startRow; row < startRow + key.length; row++) {
        for (let col = startCol; col < startCol + key[0].length; col++) {
            // 자물쇠의 범위에 드는 경우에만 비교
            if (row >= 0 && row < lock.length && col >= 0 && col < lock[0].length) {
                // 자물쇠의 돌기와 열쇠의 돌기가 만나는 경우
                if (key[row - startRow][col - startCol] * lock[row][col] === 1)
                    return false;

                // 자물쇠의 홈
                if (lock[row][col] === 0) {
                    // 열쇠의 돌기와 맞는 경우
                    if (key[row - startRow][col - startCol] === 1) {
                        matched++;
                    }
                    // 맞지 않으면 더 할 필요 없음
                    else return false;
                }
            }
        }
    }

    // 맞춘 홈이 실제 필요한 홈과 같은지 다른지에 따라 결과 반환
    return (matched === count)
}