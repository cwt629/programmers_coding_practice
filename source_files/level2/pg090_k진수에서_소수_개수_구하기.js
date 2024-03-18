/* 
[2단계] k진수에서 소수 개수 구하기
(2022 KAKAO BLIND RECRUITMENT)
*/

function solution(n, k) {
    var answer = 0;

    // 주어진 n을 k진수로 바꿔 문자열로 얻어오고, 이를 "0"을 기준으로 잘라 배열을 얻는다
    const array = n.toString(k).split("0");

    // array의 각 성분을 판별한다
    array.forEach((num) => {
        // 연속된 0에 의해 생긴 빈 문자열이면, 패스한다
        if (num.length === 0) return;

        // 만들어진 숫자에 대해 소수 판별
        if (isPrime(parseInt(num))) answer++;
    })

    return answer;
}

// 주어진 십진수가 소수인지 아닌지 판별하는 함수
function isPrime(number) {
    // 1은 소수가 아니다
    if (number === 1) return false;

    // 짝수인 경우, 2만 소수이다
    if (number % 2 === 0)
        return (number === 2) ? true : false;

    // 수의 제곱근 값까지 모든 홀수로 나눠본다
    const boundary = Math.sqrt(number);
    for (let i = 3; i <= boundary; i += 2) {
        // 약수가 발견되면, 절대 소수가 아니다
        if (number % i === 0) return false;
    }

    // 이 과정에서 약수가 발견되지 않으면 소수가 맞다
    return true;
}