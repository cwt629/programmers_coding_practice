/* 
[2단계] 두 큐 합 같게 만들기
(2022 KAKAO TECH INTERNSHIP)
*/

const testCases = [[[3, 2, 7, 2], [4, 6, 5, 1]], [[1, 2, 1, 2], [1, 10, 1, 2]], [[1, 1], [1, 5]], [[6, 5], [6, 1]]];

testCases.forEach((c) => {
    console.log(solution(...c));
})

// 이중 링크드 리스트 구현
class Node {
    constructor(number) {
        this.data = number;
        this.prev = null;
        this.next = null;
    }
}

class LinkedList {
    constructor(queue) {
        this.sum = 0n;
        this.head = new Node(null);
        this.tail = new Node(null);
        this.head.next = this.tail;
        this.tail.prev = this.head;

        this.init(queue);
    }

    // 받은 queue로 초기 링크드 리스트 및 합 설정
    init(queue) {
        for (let number of queue) {
            this.insertBack(BigInt(number));
        }
    }

    // 삽입: 리스트 맨 뒤
    insertBack(number) {
        let newNode = new Node(number);
        // tail의 앞에 넣어준다
        this.tail.prev.next = newNode;
        newNode.prev = this.tail.prev;
        newNode.next = this.tail;
        this.tail.prev = newNode;
        this.sum += number;
    }

    // 제거: 리스트 맨 앞
    deleteFront() {
        // 아무 요소도 없었다면 에러 반환
        if (!this.head.next.next)
            throw new Error("deleteFront Error: no Node to delete");

        let element = this.head.next.data;
        this.head.next = this.head.next.next;
        this.head.next.prev = this.head;
        this.sum -= element;
        return element;
    }
}

function solution(queue1, queue2) {
    let answer = 0;
    // 받은 queue로 링크드 리스트 구성
    let dll1 = new LinkedList(queue1);
    let dll2 = new LinkedList(queue2);

    // 큐에 있는 모든 요소가 2번 이동하고도 같아지지 않으면, 서로 같아질 수 없음.
    while (answer < queue1.length * 4) {
        // 이미 서로 합이 같은 경우
        if (dll1.sum === dll2.sum) return answer;

        // 합이 더 큰 큐에서 작은 큐로 요소 이동
        if (dll1.sum > dll2.sum) {
            let element = dll1.deleteFront();
            dll2.insertBack(element);
        }
        else {
            let element = dll2.deleteFront();
            dll1.insertBack(element);
        }
        answer++;
    }

    // 실패 시
    return -1;
}