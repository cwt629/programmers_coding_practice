/* 
[2단계] 뒤에 있는 큰 수 찾기
(연습문제)
*/

class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    top() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return (this.items.length === 0);
    }
}

function solution(numbers) {
    let answer = Array.from({ length: numbers.length }, () => (-1));

    let stack = new Stack();
    // 뒤에서부터 체크
    let index = numbers.length - 1;
    while (index >= 0) {
        let start = index, end = index - 1;
        stack.push(numbers[start]); // 시작점 넣어두기

        // 뒤에서부터, 숫자가 감소형인 구간 구하기
        while (end >= 0 && numbers[end + 1] > numbers[end]) {
            stack.push(numbers[end]); // 현재 숫자 넣어두기
            end--;
        }

        // start부터 end 직전까지는 뒤에서부터 한칸씩 앞으로 당겨옴
        for (let i = start - 1; i > end; i--) {
            answer[i] = numbers[i + 1];
        }

        // end 부분은 해당 구간 중 end 아이템보다 큰 숫자를 스택에서 찾는다
        if (end >= 0) {
            while (!stack.isEmpty()) {
                const item = stack.top();
                // 스택에 더 큰 숫자를 찾은 경우, pop 없이 해당 아이템만 저장하고 끝
                if (item > numbers[end]) {
                    answer[end] = item;
                    break;
                }
                // 스택 숫자가 크지 않으면, 저장할 이유 없으므로 제거
                stack.pop();
            }
        }

        // 해당 구간에 대해 완료하면, index 이동
        index = end;
    }

    return answer;
}