/* 
[3단계] 야근 지수
(연습문제)
*/

// 풀이법 및 설계가 복잡하다. 다시 볼때는 아이패드에서 151-152p를 확인하자.

function solution(n, works) {
    // 가능한한 큰 작업을 먼저 수행해야 야근 지수가 최소화되므로, 큰 순으로 정렬
    works.sort((a, b) => (b - a));

    // 총 작업량
    const total = works.reduce((acc, cur) => (acc + cur), 0);

    // 모든 작업을 다 할 수 있는 경우
    if (n >= total) return 0;

    // 큰 작업에서부터 여러 작업을 최대한 동일하게 남도록 할 때, 어디까지 동일하게 맞출 수 있는지 계산 후 반영(모두 0으로 맞추는 경우는 이미 거름)
    const compressInfo = getMaximumStep(works, n, total);
    for (let i = 0; i <= compressInfo.last; i++)
        works[i] = works[compressInfo.last + 1];
    // 작업량 반영
    n -= compressInfo.acc;

    // 다음부터 수행 시, 모두 1씩 할 수 있는 한 모두 수행
    let last = compressInfo.last + 1;
    while (last < works.length - 1 && works[last + 1] === works[last]) last++; // 같은 크기의 작업 고려

    if (n >= last + 1) {
        // 동시에 수행 가능한 작업 크기
        const availableSize = Math.floor(n / (last + 1));
        for (let i = 0; i <= last; i++) {
            works[i] -= availableSize;
            n -= availableSize;
        }
    }

    // 남은 양은 앞에서부터 1씩 분배
    for (let i = 0; i <= last && n > 0; i++) {
        works[i]--;
        n--;
    }

    // 야근 지수 계산하여 반환
    return works.reduce((acc, cur) => (acc + cur ** 2), 0);
}

// 여러 작업을 한번에 최대한 동일하게 맞춘다고 할때, 어느 단계까지 수행할 수 있는지 계산하는 함수
// 입력 배열은 내림차순 정렬된 배열
function getMaximumStep(works, n, total) {
    let result = {
        last: works.length - 1, // 첫 인덱스부터 어느 인덱스의 작업까지를 동일하게 맞출수 있는지
        acc: total // 그 인덱스까지 맞추면 얼마만큼의 작업을 수행할 수 있는지
    };

    while (n < result.acc && result.last >= 0) {
        // 현재 인덱스와 다음 인덱스 작업의 차이를 반영하여 total에서 제거
        if (result.last === works.length - 1)
            result.acc -= (result.last + 1) * works[result.last];
        else result.acc -= (result.last + 1) * (works[result.last] - works[result.last + 1]);

        result.last--;
    }

    return result;
}