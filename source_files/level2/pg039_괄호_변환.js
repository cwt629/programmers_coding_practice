/* 
[2단계] 괄호 변환
(2020 KAKAO BLIND RECRUITMENT)
*/

const p = "(()())()";
console.log(solution(p));

function solution(p) {
    // p를 conversion한 결과를 반환한다
    return conversion(p);
}

// 주어진 문자열이 올바른 괄호 문자열인지 판별하여 반환하는 함수
function isCorrectString(p) {
    const parenStack = [];
    const len = p.length;

    // 각 문자를 스택에 푸시하며 확인
    for (let i = 0; i < len; i++) {
        const temp = p.charAt(i);
        // 닫는 소괄호인 경우
        if (temp === ")") {
            // stack의 맨 위 문자가 여는 소괄호이면, 상쇄 가능
            if (parenStack[parenStack.length - 1] === "(")
                parenStack.pop();
            // 상쇄가 불가능하다면, 절대 올바른 괄호 문자열이 되지 않음
            else return false;
        }
        // 여는 소괄호인 경우
        else parenStack.push(temp);
    }

    // 마무리가 되었을 때, 스택이 비어있어야 올바른 괄호 문자열이다
    return (parenStack.length === 0) ? true : false;
}

function conversion(p) {
    // 1. 입력이 빈 문자열인 경우, 빈 문자열 반환
    if (p.length === 0) return "";

    // 2. 문자열 분리(u, v)
    var u = "";
    var i = 0, leftCount = 0, rightCount = 0;
    do {
        const temp = p.charAt(i);
        // 괄호 개수 카운트
        if (temp === "(") leftCount++;
        else rightCount++;

        u += temp;
        i++;
        // 두 괄호 개수가 같아지는 최초 시점까지 반복
    } while (leftCount !== rightCount)
    var v = p.substring(i);

    // 3. u가 올바른 괄호 문자열인 경우
    if (isCorrectString(u)) {
        // v에 대해 1단계부터 다시 수행하고, 그 결과를 u에 이어 붙인 뒤 반환
        return u + conversion(v);
    }
    // 4. u가 올바른 괄호 문자열이 아닌 경우
    else {
        // 4-1. 빈 문자열에 첫번째 문자로 "(" 붙이기
        var newString = "("
        // 4-2. v에 대해 1단계부터 수행한 결과 문자열 이어붙이기
        newString += conversion(v);
        // 4-3. ")" 다시 붙이기
        newString += ")";
        // 4-4. u의 양쪽 끝 문자 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 붙인다
        u = u.substring(1, u.length - 1);
        const uLen = u.length;
        for (let j = 0; j < uLen; j++) {
            newString += (u.charAt(j) === ")") ? "(" : ")";
        }
        // 4-5. 생성된 문자열 반환
        return newString;
    }
}