/*
[1단계] 둘만의 암호
(연습문제)
*/

function solution(s, skip, index) {
    let answer = "";
    
    for (let i = 0; i < s.length; i++){
        let alpha = s.charAt(i);
        for (let count = 0; count < index; count++){
            alpha = nextAlphabetWithSkip(alpha, skip);
        }
        answer += alpha;
    }
    
    return answer;
}

// 다음 알파벳을 구하는 함수
function nextAlphabet(alphabet){
    if (alphabet === "z") return "a";
    return String.fromCharCode(alphabet.charCodeAt(0) + 1);
}

// skip을 고려해 1칸 뒤의 알파벳을 구하는 함수
function nextAlphabetWithSkip(alphabet, skip){
    let next = nextAlphabet(alphabet);
    if (skip.indexOf(next) >= 0) return nextAlphabetWithSkip(next, skip);
    return next;
}