/* 
[2단계] [3차] 압축
(2018 KAKAO BLIND RECRUITMENT)
*/

function solution(msg) {
    let answer = [];
    let dict = initDictionary(); // 사전

    // 문자 앞에서부터 탐색 시작
    let index = 0;
    while (index < msg.length) {
        // 현재 인덱스에서 사전에 존재하는 가장 긴 문자열 탐색
        let baseWord = getLongestWord(msg, "", index, dict);
        answer.push(dict.indexOf(baseWord) + 1); // 색인 번호 = 실제 인덱스 + 1

        // 다음 글자가 존재하면, 그 단어 추가
        const nextIndex = index + baseWord.length;
        if (nextIndex < msg.length) {
            dict.push(baseWord + msg.charAt(nextIndex));
        }

        index = nextIndex;
    }

    return answer;
}

// 초기 사전을 반환하는 함수
function initDictionary() {
    let dict = [];
    for (let i = 0; i < 26; i++) {
        dict.push(getAlphabet(i));
    }

    return dict;
}

// 0~25번 알파벳을 반환하는 함수
function getAlphabet(number) {
    // base: "A"
    const baseAscii = "A".charCodeAt(0);

    return String.fromCharCode(baseAscii + number);
}


/**
 * 현재 시작 위치에서부터, 사전에 존재하는 가장 긴 문자열을 찾는 함수
 * @param {*} input 입력 문자열
 * @param {*} acc 지금까지 탐색한 문자열
 * @param {*} currentIndex 문자열에서의 현재 인덱스
 * @param {*} dict 사전
 * @returns acc 문자열에서부터 존재하는, 사전에 존재하는 가장 긴 문자열
 */
function getLongestWord(input, acc, currentIndex, dict) {
    // 현재 시작 위치가 마지막을 지나간 경우, 지금까지 탐색한 문자열 반환
    if (currentIndex === input.length) return acc;

    // 다음 글자와 합친 단어가 dict에 존재하는 경우, 그 뒤로 더 탐색
    const newAcc = acc + input.charAt(currentIndex);
    if (dict.includes(newAcc)) {
        return getLongestWord(input, newAcc, currentIndex + 1, dict);
    }

    // 다음 글자와 합친 단어가 dict에 존재하지 않는 경우, 현재까지 받은 문자열 반환
    return acc;
}