/* 
[1단계] 나머지가 1이 되는 수 찾기
(월간 코드 챌린지 시즌3)
*/

console.log(solution(10), solution(12));

function solution(n) {
    // 2부터 나눠나간다
    for (let x = 2; x < n; x++) {
        if (n % x === 1)
            return x;
    }
}