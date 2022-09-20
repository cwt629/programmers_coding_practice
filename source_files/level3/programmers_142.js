/* 
[3단계] 가장 긴 팰린드롬
(연습문제)
*/

function solution(s) {
    let answer = 0;

    // 앞에서부터 팰린드롬 탐색
    for (let i = 0; i < s.length; i++) {
        answer = Math.max(answer, getMaxOddPal(i, s), getMaxEvenPal(i, s));
    }

    return answer;
}

// 한 개의 특정 글자에서 양옆으로 비교해가며 가장 긴 홀수 팰린드롬의 길이를 받는 함수
function getMaxOddPal(centerIndex, str) {
    let result = 1;
    for (let i = 1; centerIndex - i >= 0 && centerIndex + i < str.length; i++) {
        if (str.charAt(centerIndex - i) === str.charAt(centerIndex + i))
            result += 2;
        else break;
    }

    return result;
}

// 두 개의 특정 글자쌍에서 양옆으로 비교해가며 가장 긴 짝수 팰린드롬의 길이를 받는 함수
function getMaxEvenPal(pairLeftIndex, str) {
    let result = 0;

    // pairLeftIndex와 pairLeftIndex + 1을 중심으로 하는 가장 긴 팰린드롬 찾기
    for (let i = 0; pairLeftIndex - i >= 0 && pairLeftIndex + 1 + i < str.length; i++) {
        if (str.charAt(pairLeftIndex - i) === str.charAt(pairLeftIndex + 1 + i))
            result += 2;
        else break;
    }

    return result;
}