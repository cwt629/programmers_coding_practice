/*
[1단계] 햄버거 만들기
(연습문제)
*/

function solution(ingredient) {
    var answer = 0;
    let stack = [];

    for (let number of ingredient) {
        stack.push(number);

        // 만들 수 있는 햄버거는 모두 만든다
        while (makable(stack)) {
            popFourTimes(stack);
            answer++;
        }
    }

    return answer;
}

// 현재 스택의 상태에서 햄버거를 만들 수 있는지 판단하는 함수
function makable(stack) {
    return (stack.length >= 4 && stack[stack.length - 1] === 1
        && stack[stack.length - 2] === 3 && stack[stack.length - 3] === 2
        && stack[stack.length - 4] === 1);
}

// 햄버거를 만들기 위해 재료를 4개 빼는 함수
function popFourTimes(stack) {
    for (let i = 0; i < 4; i++)
        stack.pop();
}