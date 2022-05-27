/* 
[1단계] 음양 더하기
(월간 코드 챌린지 시즌2)
*/

function solution(absolutes, signs) {
    var answer = 0;
    const len = absolutes.length;

    for (let i = 0; i < len; i++) {
        // 양수인 경우
        if (signs[i]) {
            answer += absolutes[i];
        }
        // 음수인 경우
        else {
            answer -= absolutes[i];
        }
    }
    return answer;
}