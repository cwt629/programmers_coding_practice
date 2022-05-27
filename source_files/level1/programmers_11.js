/* 
[1단계] 소수 만들기
(Summer/Winter Coding(~2018))
*/

function solution(nums) {
    var answer = 0;

    const len = nums.length;

    // 세 개를 임의로 골라 모두 더한다
    for (let i = 0; i < len - 2; i++) {
        for (let j = i + 1; j < len - 1; j++) {
            for (let k = j + 1; k < len; k++) {
                let result = nums[i] + nums[j] + nums[k];
                // 소수 판별
                if (isPrime(result)) {
                    answer++;
                }
            }
        }
    }

    return answer;
}

// 자연수에 대해 소수 여부 판별하는 함수
function isPrime(number) {
    // 짝수
    if (number % 2 === 0) {
        // 2는 소수, 그 외는 소수가 아니다
        return (number === 2) ? true : false;
    }

    // 홀수는 그 수의 제곱근 값까지를 나눠보며 판별한다
    const boundary = Math.floor(Math.sqrt(number));
    for (let i = 3; i <= boundary; i += 2) {
        if (number % i === 0) {
            return false;
        }
    }

    // 모두 통과했다면 소수가 맞다
    return true;
}