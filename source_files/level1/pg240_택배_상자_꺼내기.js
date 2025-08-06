/*
[1단계] 택배 상자 꺼내기
(2025 프로그래머스 코드챌린지 2차 예선)
*/

function solution(n, w, num) {
    var answer = 0;
    
    let currentBoxNumber = num;
    while (currentBoxNumber <= n){
        answer++;
        currentBoxNumber += (currentBoxNumber % w > 0?
                             (w - currentBoxNumber % w) : 0
                            ) * 2 + 1;
    }
    
    return answer;
}