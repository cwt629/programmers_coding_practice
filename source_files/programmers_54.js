/* 
[2단계] 카펫
(완전탐색)
*/

function solution(brown, yellow) {
    var answer = [];

    /* 
    yellow는 a*b이면,
    전체 카펫은 (a+2)*(b+2)이다.
    그러므로, a*b가 yellow가 되는 가능한 케이스를 모두 실행해보고
    brown의 개수와 합쳤을 때 (a+2) * (b+2)가 되는지 확인한다.
    */
    const yellowDivisors = divisors(yellow); // 세로로 잡을 길이들

    // 시작
    for (i in yellowDivisors) {
        const b = yellowDivisors[i];
        const a = yellow / b;

        // 확인
        if ((a + 2) * (b + 2) === brown + yellow) {
            // 전체 가로, 세로 길이를 담는다
            answer = [a + 2, b + 2];
            break;
        }
    }

    return answer;
}

// 특정 자연수의 약수를, 제곱근값보다 작거나 같은 수까지 반환해주는 함수
function divisors(num) {
    const margin = Math.sqrt(num);
    // 1은 기본으로 깐다
    const results = [1];

    // 탐색 시작
    for (let i = 2; i <= margin; i++) {
        if (num % i === 0)
            results.push(i);
    }

    return results;
}