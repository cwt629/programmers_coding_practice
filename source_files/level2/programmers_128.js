/* 
[2단계] 피보나치 수
(연습문제)
*/

function solution(n) {
    // fibonacci 결과값들을 저장할 배열
    let data = [0, 1];
    
    // n번째를 구할때까지 앞의 피보나치 수를 모두 구함
    for (let i = 2; i <= n; i++)
        data[i] = (data[i - 1] + data[i - 2]) % 1234567;
    
    return data[n];
}

// dynamic programming을 이용해 피보나치 수열 값을 구하는 재귀함수
// Problem: 재귀함수 깊이 제한 때문에 런타임 에러가 뜬다. dp로 풀어보자.
// function fibonacci(n, data){
//     // data에 있는 결과값은 그대로 반환
//     if (data[n] !== undefined) return data[n];
    
//     // data에 없다면, 구해서 저장 후 반환
//     const result = (fibonacci(n - 1, data) + fibonacci(n - 2, data)) % 1234567;
//     data[n] = result;
    
//     return result;
// }