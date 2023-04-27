/* 
[2단계] 숫자 변환하기
(연습문제)
*/

function solution(x, y, n) {
    // x = y인 경우
    if (x === y) return 0;

    let convertible = true; // 중간에 연산 가능 여부를 판단하는 플래그

    let candidates = [y];

    // 역추적하면서, 각 숫자가 x보다 작아지기 전까지 탐색한다
    for (let level = 1; convertible; level++) {
        let newCands = [];
        convertible = false;
        // 각 후보에서 역추적 시작
        for (let cand of candidates) {
            // 1. 3 나누기
            if (cand % 3 === 0 && cand / 3 >= x) {
                let element = cand / 3;
                convertible = true;
                if (element === x) return level;
                newCands.push(element);
            }
            // 2. 2 나누기
            if (cand % 2 === 0 && cand / 2 >= x) {
                let element = cand / 2;
                convertible = true;
                if (element === x) return level;
                newCands.push(element);
            }
            // 3. n 빼기
            if (cand - n >= x) {
                let element = cand - n;
                convertible = true;
                if (element === x) return level;
                newCands.push(element);
            }
        }

        // 새 후보들 저장
        candidates = [...newCands];
    }

    // 벗어난 경우는 convertible하지 않은 경우이다
    return -1;
}