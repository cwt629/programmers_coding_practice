/* 
[2단계] 괄호 회전하기
(월간 코드 챌린지 시즌2)
*/


console.log(solution("[](){}"), solution("}]()[{"), solution("[)(]"), solution("}}}"));

function solution(s) {
    var answer = 0;
    const len = s.length;

    // 주어진 문자열을 x번 왼쪽으로 돌려가며 판별
    for (let i = 0; i < len; i++) {
        if (parenJudgment(s))
            answer++;
        s = leftRotate(s);
    }

    return answer;
}

function parenJudgment(s) {
    const len = s.length;

    // 빈 문자열이라면 true 반환(recursive 함수 구현을 위함)
    if (len === 0) return true;

    const parenStack = [];
    var i = 1;
    // 시작하는 문자가 닫는 괄호이면, 절대 올바른 괄호 문자열이 아니다
    var temp = s.charAt(0);
    if (isRightParen(temp))
        return false;
    // 여는 괄호로 시작한다면, 스택에 push
    parenStack.push(temp);

    // 앞에서부터 가장 작은 올바른 괄호 문자열 추려내기
    while (parenStack.length > 0 && i < len) {
        temp = s.charAt(i);
        // 오른쪽 괄호인 경우, 스택의 맨 위 괄호와 상쇄 가능한지 확인
        if (isRightParen(temp)) {
            if (isTwin(parenStack[parenStack.length - 1], temp)) {
                // 상쇄
                parenStack.pop();
            }
            // 상쇄 불가능하면, 절대 올바른 괄호 문자열이 아니다
            else return false;
        }
        // 왼쪽 괄호인 경우, 그대로 스택에 넣어주기
        else parenStack.push(temp);

        // 다음 문자 받아오기
        i++;
    }

    // stack이 비어있지 않다는건, 끝까지 상쇄하지 못한 것이므로 올바른 괄호 문자열이 아니다
    if (parenStack.length > 0) return false;

    // 남은 문자에 대해 올바른 괄호 문자열 판별(B가 올바른 괄호 문자열이면, AB도 올바른 괄호 문자열이다)
    return parenJudgment(s.substring(i));
}

// 특정 괄호가 닫는 괄호인지 판별하는 함수
function isRightParen(paren) {
    return paren === ")" || paren === "}" || paren === "]";
}

// 두 괄호가 상쇄 가능한지 판별하는 함수
function isTwin(prev, current) {
    return (prev === "(" && current === ")") ||
        (prev === "{" && current === "}") || (prev === "[" && current === "]");
}

function leftRotate(s) {
    // 왼쪽으로 돌리기 위해, 맨 왼쪽 문자 받아오기
    const temp = s.charAt(0);

    // 남은 문자열의 끝에 해당 문자 붙여서 반환
    return s.substring(1) + temp;
}