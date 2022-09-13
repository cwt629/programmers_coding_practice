/* 
[1단계] 정수 제곱근 판별
(연습문제)
*/

function solution(n) {
    // n의 루트값
    const sqrtValue = Math.sqrt(n);

    return (sqrtValue === Math.floor(sqrtValue)) ? (sqrtValue + 1) ** 2 : -1;
}