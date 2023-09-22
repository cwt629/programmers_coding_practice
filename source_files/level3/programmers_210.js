/* 
[3단계] 미로 탈출 명령어
(2023 KAKAO BLIND RECRUITMENT)
*/

function solution(n, m, x, y, r, c, k) {
    let answer = '';
    // 기준이 될 최단 루트로 초기화
    let base = getOptimalBasePath({maxRow: n, maxCol: m, start: [x - 1, y - 1], end: [r - 1, c - 1]});
    
    // 탈출 불가능한 경우: 최단 루트로 간 뒤 남은 횟수가 짝수가 아닌 경우
    if (k < base.length || (k - base.length) % 2 != 0) return "impossible";
    
    // 정답 문자열에 넣어주자
    answer = base;
    
    // 앞에서부터 마지막 d 다음 포인터를 받아옴
    let pointer = 0;
    while (pointer < answer.length && answer.charAt(pointer) == "d") pointer++;
    
    // 추가적으로 내려가거나 왼쪽으로 갈 수 있는 횟수
    let possibleMoreDowns = Math.min(n - r, n - x), possibleMoreLefts = Math.min(c - 1, y - 1);
    
    let additionalMoves = {
        down: 0,
        left: 0,
        right: 0,
        up: 0
    };
    // 1. 가능한만큼 d로 이동하기
    for (let i = 0; i < possibleMoreDowns && movableFurther(answer, additionalMoves, k); i++){
        additionalMoves.down++;
        additionalMoves.up++;
    }
    
    // 2. 가능한만큼 l로 이동하기
    for (let i = 0; i < possibleMoreLefts && movableFurther(answer, additionalMoves, k); i++){
        additionalMoves.left++;
        additionalMoves.right++;
    }
    
    // 중간과정: answer에 d, l, r 추가 이동 반영하기
    let repeatedD = getRepeatedString("d", additionalMoves.down),
        repeatedL = getRepeatedString("l", additionalMoves.left),
        repeatedR = getRepeatedString("r", additionalMoves.right),
        repeatedU = getRepeatedString("u", additionalMoves.up);
    
    answer = answer.substring(0, pointer) + repeatedD + repeatedL + answer.substring(pointer);
    // pointer는 마지막 l 다음의 위치로 이동해준다
    while (pointer < answer.length && (answer.charAt(pointer) == "d" || answer.charAt(pointer) == "l")) pointer++;
    // 마지막 l 다음 위치에 r과 u를 이어준다
    answer = answer.substring(0, pointer) + repeatedR + answer.substring(pointer) + repeatedU;
    
    // 남은 횟수만큼은 왼쪽아래에서 rl 이동을 반복한다.
    let cycle = 0;
    while (answer.length + cycle * 2 < k){
        cycle++;
    }
    let repeatedCycle = getRepeatedString("rl", cycle);
    
    // 왔다갔다한만큼 추가
    answer = answer.substring(0, pointer) + repeatedCycle + answer.substring(pointer);
    
    return answer;
}

function getOptimalBasePath({maxRow: n, maxCol: m, start: [x, y], end: [r, c]}){
    let path = "";
    // 1. d 고려
    if (r > x){
        path += getRepeatedString("d", r - x);
        
        // 1-1. l 고려
        if (y > c){
            path += getRepeatedString("l", y - c);
        }
        // 1-2. l 불가능 시 r
        else{
            path += getRepeatedString("r", c - y);
        }
    }
    // 2. d 불가능 시
    else{
        // 2-1. l 고려
        if (y > c){
            path += getRepeatedString("l", y - c);
        }
        // 2-2. l 불가능 시 r
        else{
            path += getRepeatedString("r", c - y);
        }
        
        // 이후 u 대입
        path += getRepeatedString("u", x - r);
    }
    
    return path;
}
         
// 추가 이동이 가능한지 판단하는 함수
function movableFurther(answer, additionalMoves, k){
    return (answer.length + additionalMoves.up + additionalMoves.left + additionalMoves.right + additionalMoves.down < k);        
}

// 특정 문자를 특정횟수 반복한 문자열을 반환하는 함수
function getRepeatedString(char, count){
    let result = "";
    for (let i = 0; i < count; i++) result += char;
    
    return result;
}