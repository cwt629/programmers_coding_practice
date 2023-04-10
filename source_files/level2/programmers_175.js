/* 
[2단계] 마법의 엘리베이터
(연습문제)
*/

function solution(storey) {
    let answer = 100000001; // 최소값
    const storeLength = storey.toString().length; // 층수

    // DFS 방식으로 모두 탐색하는 함수
    function dfs(currentNumber, currentPower, accCount) {
        if (currentNumber === 0) {
            answer = (accCount < answer) ? accCount : answer; // 갱신
            return;
        }

        // 현재 숫자 자릿수를 넘는 층으로 가면(예: 천 단위 층에서 만 단위 층(10000층)으로 이동 시) 바로 내려가준다
        if (currentNumber === 10 ** storeLength) {
            answer = (accCount + 1 < answer) ? accCount + 1 : answer;
            return;
        }

        const curDigit = getDigitByPower(currentNumber, currentPower); // 현재 자리의 숫자
        // 위, 아래로 이동한 결과층
        const upper = currentNumber + (10 - curDigit) * (10 ** currentPower);
        const lower = currentNumber - curDigit * (10 ** currentPower);

        // 각각마다 이동 및 탐색
        dfs(upper, currentPower + 1, accCount + 10 - curDigit);
        dfs(lower, currentPower + 1, accCount + curDigit);
    }

    // DFS 탐색
    dfs(storey, 0, 0);

    return answer;
}

// 특정 숫자의 10^power 자리 숫자를 반환하는 함수
function getDigitByPower(number, power) {
    const str = number.toString();
    if (power >= str.length) return 0;
    return parseInt(str.charAt(str.length - power - 1));
}