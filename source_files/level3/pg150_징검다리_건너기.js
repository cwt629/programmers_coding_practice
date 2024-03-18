/* 
[3단계] 징검다리 건너기
(2019 카카오 개발자 겨울 인턴십)
*/

function solution(stones, k) {
    // 각 디딤돌에 적힌 숫자의 최대, 최소
    // 주의: Math.max와 Math.min이, 너무 큰 배열에서는 crash가 발생하거나 NaN를 반환하기도 한다.
    // 참고: https://stackoverflow.com/questions/42623071/maximum-call-stack-size-exceeded-with-math-min-and-math-max
    let data = getMinAndMax(stones);
    let start = data.min, end = data.max;

    // 이진 탐색 방법으로, 0의 연속횟수 >= k가 되는 최소 건너기 횟수를 구한다
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        // 그 횟수를 건너면 못 건너게 되는 최대 연속 디딤돌 길이
        const combo = getCombo(stones, mid);

        // 건널 수 없다면, 더 작은 부분 탐색
        if (combo >= k) end = mid - 1;

        // 건널 수 있다면, 더 큰 부분 탐색
        else start = mid + 1;
    }

    // 이진 탐색의 결과
    return start;
}

// (Math.min과 Math.max대용) 배열에서 최대, 최소값을 반환하는 함수
function getMinAndMax(arr) {
    let min = Infinity, max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    return {
        min: min,
        max: max
    };
}

// 주어진 징검다리에서 n 이하의 숫자가 몇개까지 연속으로 나오는지 반환하는 함수
function getCombo(stones, n) {
    let combo = 0, index = 0;
    while (index < stones.length) {
        // 현위치가 n 이하인 경우
        if (stones[index] <= n) {
            // 어디까지 이어지는지 찾기
            let len = 0;
            while (index < stones.length && stones[index] <= n) {
                len++;
                index++;
            }

            // 최대 콤보 갱신
            if (combo < len) combo = len;
        }

        else index++;
    }

    return combo;
}