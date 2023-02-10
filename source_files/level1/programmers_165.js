/* 
[1단계] 최대공약수와 최소공배수
(연습문제)
*/

function solution(n, m) {
    // 더 큰 수가 앞에 오도록 조정
    if (n < m) [n, m] = [m, n];

    return [gcd(n, m), lcm(n, m)];
}

// 최대공약수를 구하는 함수(a > b) : 유클리드 호제법 활용
function gcd(a, b) {
    if (b === 0) return a;

    const r = a % b;
    return gcd(b, r);
}

// 최소공배수를 구하는 함수(a > b)
function lcm(a, b) {
    return a * b / gcd(a, b);
}