/* 
[2단계] 올바른 괄호
(연습문제)
*/

function solution(s) {
    // stack으로 구현(왼쪽 소괄호들이 저장될 배열)
    const stack = [];

    // s 탐색 시작
    for (let i = 0; i < s.length; i++) {
        // 해당 괄호 받아오기
        const paren = s.charAt(i);

        // ")"인 경우, 스택에서 "("와 짝지어주기
        if (paren === ")") {
            // 스택이 비어있는 경우, 절대 올바르지 않은 괄호
            if (stack.length === 0)
                return false;

            // 스택에서 "("와 짝지어, 하나 지워주기
            stack.pop();
        }

        // "("인 경우, 스택에 넣어주기
        else stack.push(paren);
    }

    // 왼쪽 소괄호가 아직 남아있으면, 올바르지 않은 괄호
    return (stack.length > 0) ? false : true;
}