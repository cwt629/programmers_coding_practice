/* 
[2단계] 문자열 압축
(2020 KAKAO BLIND RECRUITMENT)
*/

// console.log(solution("aabbaccc"));
// console.log(solution("ababcdcdababcdcd"));
// console.log(solution("abcabcdede"));
// console.log(solution("abcabcabcabcdededededede"));
// console.log(solution("xababcdcdababcdcd"));


function solution(s) {
    var answer = 0;
    const len = s.length;
    // 쪼개는 것은 총 길이의 절반까지만 쪼개면 충분하다.
    const splitBoundary = Math.floor(len / 2);

    // 시작할 때는 기존 문자열의 전체 길이로 둔다
    answer = len;

    // 1개부터 차례대로 쪼개본다
    for (let i = 1; i <= splitBoundary; i++) {
        // 새로 만들 문자열 선언
        var newStr = "";
        // 중복될 수 있거나, 실제로 중복된 문자열을 임시로 저장할 배열
        var repeatPiece = [];
        // 중복 횟수와 인덱스 선언
        var repeated = 1, currentIndex = 0;

        // i개씩 쪼개기 시작한다
        while (currentIndex < len) {
            // 쪼개는 부분의 오른쪽 경계(마지막 남는 문자열을 위해 구분)
            const rightBoundary = (currentIndex + i <= len) ? currentIndex + i : len;
            // 쪼개어 나온 문자열
            const tempString = s.substring(currentIndex, rightBoundary);

            // 앞선 문자와 같은 문자열인 경우
            if (repeatPiece.length > 0 && repeatPiece[0] === tempString) {
                repeated++;
            }
            // 다른 문자열이면, 앞선 문자를 newStr에 추가
            else {
                // 처음이 아닌 경우
                if (repeatPiece.length > 0) {
                    // 중복이 됐다면, 횟수를 숫자로 더해준다
                    const newPiece = (repeated > 1) ? `${repeated}` + repeatPiece[0] : repeatPiece[0];
                    // 자리 비워주기
                    repeatPiece.pop();
                    // newStr에 문자열 추가
                    newStr = newStr.concat(newPiece);
                }

                // 지금 나온 문자열을 repeatPiece에 push
                repeatPiece.push(tempString);

                // 초기화
                repeated = 1;
            }

            // 마지막 부분까지 다다른 경우, 현재 부분까지를 newStr에 추가
            if (rightBoundary === len) {
                const newPiece = (repeated > 1) ? `${repeated}` + repeatPiece[0] : repeatPiece[0];
                newStr = newStr.concat(newPiece);
            }

            // 모든 과정 종료 후, 인덱스 이동
            currentIndex += i;
        }

        // 쪼갠 문자열의 길이를 기존 최소 길이와 비교
        answer = (newStr.length < answer) ? newStr.length : answer;

    }

    return answer;
}