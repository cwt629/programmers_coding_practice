/* 
[2단계] 프린터
(연습: 스택/큐)
*/

function solution(priorities, location) {
    var answer = 0;

    // priorities 배열을 계속해서 돌려본다
    while (1) {
        // 맨 앞 원소 빼내기
        const currentPriority = deleteQueue(priorities);
        // 남은 대기목록들과 중요도 비교 후, 인쇄 가능한 경우
        if (canPrint(currentPriority, priorities)) {
            answer++;
            // 내가 인쇄를 요청한 문서가 인쇄된 경우
            if (location === 0) break;
        }
        // 인쇄 불가능한 경우
        else {
            // 대기 목록의 마지막에 넣는다
            priorities.push(currentPriority);
        }
        // location 반영
        location = (location > 0) ? location - 1 : priorities.length - 1;
    }
    return answer;
}

// priorities를 queue 방식으로 접근하여, 맨앞 원소를 빼고 그 원소를 반환하는 함수
function deleteQueue(q) {
    const element = q[0];
    q.splice(0, 1);
    return element;
}

// 남은 대기 목록의 중요도를 비교하여, 인쇄 가능한지 여부를 반환하는 함수
function canPrint(current, priorities) {
    const len = priorities.length;
    for (let i = 0; i < len; i++) {
        if (current < priorities[i])
            return false;
    }
    return true;
}