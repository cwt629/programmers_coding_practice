/* 
[2단계] 숫자 블록
(연습문제)
*/

function solution(begin, end) {
    var answer = [];

    // begin부터 end까지 블록 숫자들 구하기
    for (let i = begin; i <= end; i++)
        answer.push(block(i));

    return answer;
}

// n번 블록에 어떤 수가 나오는지 반환하는 함수
function block(number) {
    // Idea: 점점 증가하는 자연수에 자연수를 곱해가며 블록을 갱신하고, 자기 자신과 같은 숫자의 블록에는 설치하지 않으므로, 자기 자신을 제외한 가장 큰 약수를 찾으면 된다!(단, 10000000 이하!)

    // 1인 경우는 약수가 자기 자신밖에 없으므로, 0 반환
    if (number === 1) return 0;

    // 짝수인 경우
    if (number % 2 === 0) {
        // 2부터 나눠가며 10000000 이하의 가장 큰 약수를 찾아간다
        const evenBound = Math.floor(Math.sqrt(number));
        for (let i = 2; i <= evenBound; i++) {
            if (number % i === 0 && number / i <= 10000000) return number / i;
        }
    }

    // 홀수인 경우는 소수 판별하듯이 약수를 찾아가고, 찾은 가장 작은 약수로 나눠준다
    const boundary = Math.floor(Math.sqrt(number));
    for (let i = 3; i <= boundary; i += 2) {
        // 가장 작은 약수를 찾은 경우, 그 수로 나눈 값이 가장 큰 약수이다
        if (number % i === 0 && number / i <= 10000000) return number / i;
    }

    // for문을 벗어난 경우는 소수인 경우이므로, 블록은 1이다
    return 1;
}