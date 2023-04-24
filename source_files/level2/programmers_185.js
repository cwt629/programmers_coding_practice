/* 
[2단계] 택배상자
(연습문제)
*/

// 스택
class Stack {
    constructor() {
        this.contents = [];
    }

    isEmpty() {
        return this.contents.length === 0;
    }

    top() {
        // 없는 경우 따로 빼줌
        if (this.contents.length === 0) return null;
        return this.contents[this.contents.length - 1];
    }

    push(number) {
        this.contents.push(number);
    }

    pop() {
        return this.contents.pop();
    }
}

function solution(order) {
    let answer = 0;
    let mainPin = 1; // 메인 컨테이너 벨트의 인덱스
    let lastNumber = order.length; // 길이가 곧 마지막 상자 번호
    let subContainer = new Stack(); // stack 형태의 보조 컨테이너 벨트

    // 컨테이너에서 빼내기
    for (let i = 0; i < order.length; i++) {
        // 1. 서브 먼저 보기
        if (subContainer.top() === order[i]) {
            subContainer.pop();
            answer++;
            continue;
        }
        // 서브가 아님을 확인하고, 메인에서 더 꺼낼 것이 없으면 종료
        if (mainPin > lastNumber) break;

        // 2. 메인에서 계속 꺼내기
        while (mainPin <= lastNumber) {
            // 오더에 맞는 번호를 찾은 경우
            if (mainPin === order[i]) {
                answer++;
                mainPin++;
                break;
            }
            subContainer.push(mainPin);
            mainPin++;
        }
    }

    return answer;
}