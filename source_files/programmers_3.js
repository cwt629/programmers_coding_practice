/* 
[1단계] 신규 아이디 추천
(2021 KAKAO BLIND RECRUITMENT)
*/

function solution(new_id) {
    var answer = '';
    let currentChar, prevChar, len;
    var firstStep = '', secondStep = '', thirdStep = '';

    // 1단계: 모든 대문자를 소문자로 치환하기
    firstStep = new_id.toLowerCase();

    // 2단계: 사용 불가능한 문자 거르기(다른 함수 사용)
    len = firstStep.length;
    for (let i = 0; i < len; i++) {
        currentChar = firstStep.charAt(i);
        // 사용 가능한 문자만 고려하여 복사
        if (isValidChar(currentChar)) {
            secondStep = secondStep.concat(currentChar);
        }
    }

    // 3-4단계: 연속된 마침표를 제거하고, 시작과 끝에 있는 마침표 제거
    len = secondStep.length;
    for (let i = 0; i < len; i++) {
        currentChar = secondStep.charAt(i);
        // 이전 문자 받아옴(시작인 경우는 null)
        prevChar = (i > 0) ? secondStep.charAt(i - 1) : null;
        // '.'이 연속으로 나오지 않거나 '.'으로 시작하지 않는 경우, 새 문자열에 복사
        if (!(prevChar === '.' && currentChar === '.') && !(currentChar === '.' && thirdStep.length === 0)) {
            thirdStep = thirdStep.concat(currentChar);
        }
    }
    // 마지막에 있는 마침표 제거
    let rear = thirdStep.length - 1;
    while (thirdStep.charAt(rear) === '.') {
        rear--;
    }
    thirdStep = thirdStep.substring(0, rear + 1);

    // 5단계: 빈 문자열이면, "a" 대입
    if (thirdStep.length === 0) {
        thirdStep = "a";
    }

    // 6단계: 길이가 16 이상이면, 첫 15개의 문자만 남겨놓고 모두 제거. 그 후 끝에 있는 마침표는 제거
    if (thirdStep.length >= 16) {
        thirdStep = thirdStep.substring(0, 15);
    }
    // 마지막에 있는 마침표 제거
    rear = thirdStep.length - 1;
    while (thirdStep.charAt(rear) === '.') {
        rear--;
    }
    thirdStep = thirdStep.substring(0, rear + 1);

    // 7단계: 길이가 2 이하이면, 마지막 문자 복사
    while (thirdStep.length <= 2) {
        len = thirdStep.length;
        thirdStep = thirdStep.concat(thirdStep.charAt(len - 1));
    }

    // 완성된 아이디를 answer에 복사
    answer = thirdStep;

    return answer;
}

// 알파벳 소문자, 숫자, 빼기, 밑줄, 마침표가 아니라면 true를 반환하는 함수
function isValidChar(char) {
    return ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9') ||
        (char === '-') || (char === '_') || (char === '.'));
}