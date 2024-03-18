/* 
[1단계] 대충 만든 자판
(연습문제)
*/

function solution(keymap, targets) {
    const ALPHABET_MAX = 26;

    // 각 알파벳마다 최소 몇번 눌러서 입력할 수 있는지 횟수 저장하는 맵
    let alphabetMap = new Map();
    for (let i = 0; i < ALPHABET_MAX; i++) {
        const alphabet = getNthAlphabet(i);
        alphabetMap.set(alphabet, -1); // 초기값은 -1
    }

    // keymap을 보며 각 알파벳의 최소 횟수 저장
    keymap.forEach((key) => {
        for (let i = 0; i < key.length; i++) {
            const alphabet = key.charAt(i);
            updateAlphabetMap(alphabetMap, alphabet, i);
        }
    })

    // target마다 횟수 구하기
    const answer = targets.map((word) => {
        let count = 0;
        for (let i = 0; i < word.length; i++) {
            const pressing = alphabetMap.get(word.charAt(i));
            if (pressing < 0) return -1; // 입력 불가능한 경우
            count += pressing;
        }
        // 입력 가능한 경우
        return count;
    })

    return answer;
}

// A로부터 n번째 대문자 영어 알파벳을 반환하는 함수
function getNthAlphabet(n) {
    // ascii 코드값
    const newAscii = "A".charCodeAt(0) + n;
    return String.fromCharCode(newAscii);
}

// 특정 인덱스에서 등장한 알파벳에 대해 횟수를 갱신하는 함수
function updateAlphabetMap(map, alphabet, index) {
    const pressing = index + 1;
    const origin = map.get(alphabet);
    if (origin < 0 || pressing < origin) {
        map.set(alphabet, pressing);
    }
}