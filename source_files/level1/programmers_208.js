/* 
[1단계] 과일 장수
(연습문제)
*/

function solution(k, m, score) {
    var answer = 0;
    // 사과를 점수 높은 것부터 오름차순 정렬
    score.sort((a, b) => (b - a));
    
    for (let i = 0; i + m - 1 < score.length; i += m){
        answer += score[i + m - 1] * m; // 그 구간에서 제일 낮은 점수는 제일 오른쪽 인덱스이다
    }
    
    return answer;
}