/*
[2단계] 소수 찾기
(연습문제: 완전탐색)
*/

console.log(solution("17"), solution("011"));


function solution(numbers) {
    var answer = 0;
    const len = numbers.length;
    // 주어진 문자열을 배열로 치환
    const numArray = numbers.split("");

    // 만들어진 숫자들을 저장할 배열
    var created = [];

    // 순열을 구하는 함수
    function permutations(array, selectionRemaining) {
        const result = [];
        // 마지막 선택의 경우
        if (selectionRemaining === 1) return array.map((num) => [num]);
        // 순열 구해나가기
        array.forEach(function (picked, index, origin) {
            // 해당 인덱스를 뽑고 나머지 배열
            const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
            // 나머지 배열에서 계속 뽑아나감
            const certainPerm = permutations(rest, selectionRemaining - 1);
            // 뽑은 것을 기존 배열과 합친다
            const conjoined = certainPerm.map((numbers) => [picked, ...numbers]);
            // 결과 저장
            result.push(...conjoined);
        })

        return result;
    }

    // 특정 길이씩 구해나가기
    for (let i = 1; i <= len; i++) {
        const certainPerm = permutations(numArray, i);
        // 문자열로 바꾸고, 그것을 정수로 바꾸어 created에 저장
        const pLen = certainPerm.length;
        for (let j = 0; j < pLen; j++)
            created.push(parseInt(certainPerm[j].join("")));
    }

    // 중복을 거르기 위해, 집합 객체로 걸러낸다
    created = [...new Set(created)];

    // 만들어진 수들에 대해 소수 판별
    for (const number of created) {
        if (isPrime(number)) answer++;
    }

    return answer;
}

function isPrime(num) {
    // 짝수인 경우, 2만 제외하고 모두 소수가 아니다
    if (num % 2 === 0)
        return (num === 2) ? true : false;
    // 1은 소수가 아니다
    else if (num === 1) return false;
    // 1이 아닌 홀수인 경우, 그 수의 제곱근값까지 모든 홀수들로 나눠본다
    else {
        const boundary = Math.floor(Math.sqrt(num));
        for (let i = 3; i <= boundary; i += 2) {
            if (num % i === 0)
                return false;
        }
    }

    // 다른 약수가 없다면 소수가 맞다
    return true;
}