/*
[2단계] 유사 칸토어 비트열
(연습문제)
*/

function solution(n, l, r) {
    var answer = 0;
    for (let i = l; i <= r; i++){
        if (getBit(i - 1, n) === 1) answer++;
    }
    return answer;
}

// (재귀) level n의 특정 digit의 자리수를 반환하는 함수
function getBit(digit, level){
    if (level === 1){
        return (digit === 2)? 0 : 1;
    }
    
    let parent = getBit(Math.floor(digit / 5), level - 1);
    if (parent === 0)
        return 0;
    
    return (digit % 5 === 2)? 0 : 1;
}