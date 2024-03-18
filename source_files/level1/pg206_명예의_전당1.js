/*
[1단계] 명예의 전당(1)
(연습문제)
*/

function solution(k, score) {
    var answer = [];
    let honored = [];
    
    score.forEach((point) => {
        if (honored.length < k){
            honored.push(point);
            honored.sort((a, b) => (a - b)); // 오름차순 정렬
            answer.push(honored[0]);
            return;
        }
        // honored는 오름차순 정렬된 상태 -> 최하점과 비교
        if (honored[0] < point){
            honored[0] = point;
            honored.sort((a, b) => (a - b)); // 오름차순 정렬
        }
        answer.push(honored[0]);
    })
    
    return answer;
}