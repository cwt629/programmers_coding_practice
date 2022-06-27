/* 
[2단계] 멀리 뛰기
(연습문제)
*/

function solution(n) {
    // dynamic programming 방식에 의거한 피보나치 수열을 이용한다
    var fib = [1n, 1n]; // 수가 매우 커질 수 있으므로, bigInt 사용!

    // 피보나치 수열에 의거하여 방법을 구해나간다
    // 이유: n번째 칸에 도달하는 방법은 n-2번째 칸까지 간 뒤 2칸 이동, n-1번째 칸까지 간뒤 1칸 이동이 있다!
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    // 결과값
    return fib[n] % 1234567n;
}