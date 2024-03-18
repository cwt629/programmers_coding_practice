/* 
[2단계] 줄 서는 방법
(연습문제)
*/

function solution(n, k) {
    var answer = [];
    // 각 숫자들을 대입했는지를 나타내는 배열
    var picked = [];
    for (let i = 0; i < n; i++)
        picked[i] = false;

    // 앞에서부터 몇번이 들어갈지 계산
    for (let i = 0; i < n; i++) {
        // 앞에서부터 몇번째 숫자가 와야하는지 계산
        // tip: BigInt에서의 나눗셈에서는 소수점이 생략된다
        const passed = Number(BigInt(k - 1) / factorial(n - i - 1));
        // 몇번이 들어가야 하는지 받아온다
        const onLine = person(passed, picked);
        // 그 번호 저장 후, picked 갱신
        answer.push(onLine);
        picked[onLine - 1] = true;
        // 해당 번호가 정해져 있을 때 몇번째 방법인지 adjust
        k = Number(BigInt(k - 1) % factorial(n - i - 1)) + 1;
    }
    return answer;
}

// 주어진 자연수의 팩토리얼 값을 반환하는 함수(19!까지 계산해야 하므로 BigInt 사용하자)
function factorial(n) {
    // 브레이크 포인트
    if (n === 0 || n === 1) return 1n;
    // recursive 방식
    return BigInt(n) * factorial(n - 1);
}

// 주어진 picked 배열을 기반으로, 몇 번 사람이 해당 자리에 들어가야 하는지 반환하는 함수
function person(passed, picked) {
    var result = 0;
    // 시작점(인덱스) : 인덱스를 벗어나는 일은 없다
    while (picked[result]) result++;
    // 앞번호에서부터 탐색
    while (passed > 0 || picked[result]) {
        // 현재 번호가 아직 줄에 없는 번호인 경우
        if (!picked[result])
            passed--;
        // 다음 번호
        result++;
    }

    // 실제 번호는 인덱스 + 1
    return result + 1;
}