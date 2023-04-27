/* 
[3단계] 연속 펄스 부분 수열의 합
(연습문제)
*/

function solution(sequence) {

    // +, -, +, - ... 라고 생각하는 누적합을 구한다.(짝수인덱스에 +)
    // 반대의 경우는 이 누적합에 -를 붙인 것이므로 굳이 안구해도 됨!

    let partialSum = [0]; // 맨 처음에는 0으로 시작해준다! (시작부터 다 더해야 최대인 경우 고려)
    for (let i = 0; i < sequence.length; i++) {
        partialSum[i + 1] = (i % 2 === 0) ? partialSum[i] + sequence[i] : partialSum[i] - sequence[i];
    }

    // 최대와 최소 누적합을 구해 그 차이를 구한다.
    // 최소가 최대보다 오른쪽에 있는 경우도, (-, +, -, + ...)의 경우에 관계가 역전되기 때문에 그냥 그대로 최대 - 최소 해줘도 같은 결과가 나온다!
    const result = getMaxAndMin(partialSum);
    return result.max - result.min;
}

// 누적합에서 최대, 최소를 구하는 함수
function getMaxAndMin(partialSum) {
    let result = { max: partialSum[0], min: partialSum[0] };
    for (let i = 1; i <= partialSum.length; i++) {
        if (result.max < partialSum[i]) result.max = partialSum[i];
        if (result.min > partialSum[i]) result.min = partialSum[i];
    }

    return result;
}