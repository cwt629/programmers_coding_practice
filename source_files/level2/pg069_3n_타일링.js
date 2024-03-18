/* 
[2단계] 3*n 타일링
(연습문제)
*/

function solution(n) {
    // 가로 길이가 홀수이면, 블록 크기가 짝수이기 때문에 절대 채울 수 없음
    if (n % 2 === 1) return 0;

    /* 
    바닥을 가로 2씩 쪼갠다고 가정했을 때,
    각 피스가 딱딱 맞춰지는 경우와,
    두 개 이상의 피스가 특정 가로 배치 타일에 의해 구분지을 수 없는 경우를 분리한다.
    */

    // dynamic programming 구현을 위해, 결과를 저장할 배열(가로의 길이는 index * 2)
    var arranges = [];
    // 초기값 저장(n=0, n=2)
    arranges[0] = 0; arranges[1] = 3;

    /* 타일을 (n-2) * 2, (n-4) * 4, ... , 2 * (n-2)로 쪼개되, 
    (n-4) * 4 부터는 오른쪽 피스에서 예외가 발생할(바닥을 가로 2로 쪼갤수 없는) 경우에 대해서만
    카운트하면 되며, 그런 예외가 발생하는 배치는 단 2개씩이다. */

    for (let i = 2; i <= n / 2; i++) {
        // (n-2) * 2로 쪼갰을 때
        arranges[i] = arranges[i - 1] * arranges[1];
        // 이후로 더 쪼개는 경우
        for (let j = i - 2; j > 0; j--)
            arranges[i] += arranges[j] * 2;
        // 전체 바닥이 예외인 케이스
        arranges[i] += 2;

        // 나머지 처리
        arranges[i] %= 1000000007;
    }

    return arranges[n / 2];
}