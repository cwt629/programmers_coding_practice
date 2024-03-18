/* 
[3단계] 표 편집
(2021 카카오 채용연계형 인턴십)
*/

class Node {
    constructor(index) {
        this.index = index;
        this.prev = null;
        this.next = null;
    }

    // 현재 노드를 다음 노드와 연결
    connect(nextNode) {
        this.next = nextNode;
        if (nextNode) nextNode.prev = this;
    }

    // 현재 노드에서 k칸 앞으로 가면 어느 인덱스로 가는지 반환하는 함수
    moveUpTo(len) {
        let current = this;
        for (let i = 0; i < len; i++) {
            current = current.prev;
        }

        return current.index;
    }

    // 현재 노드에서 k칸 뒤로 가면 어느 인덱스로 가는지 반환하는 함수
    moveDownTo(len) {
        let current = this;
        for (let i = 0; i < len; i++) {
            current = current.next;
        }

        return current.index;
    }
}

class StackElement {
    constructor(index, prevNode, nextNode) {
        this.index = index;
        this.prev = prevNode;
        this.next = nextNode;
    }
}

class MyArray {
    constructor(n, k, nodeMap) {
        this.contents = nodeMap;
        this.head = 0; // 이중 연결 리스트의 맨앞 인덱스
        this.selected = k;
        this.deleted = Array.from({ length: n }, () => (false));
        this.delStack = []; // 삭제된 요소들의 인덱스를 담는 스택
    }

    // 행 이동
    moveUp(len) {
        // 현재 데이터에 대한 노드
        const currentNode = this.contents.get(this.selected);
        this.selected = currentNode.moveUpTo(len);
    }

    moveDown(len) {
        const currentNode = this.contents.get(this.selected);
        this.selected = currentNode.moveDownTo(len);
    }

    // 현재 행 삭제
    cut() {
        this.deleted[this.selected] = true;
        const cutNode = this.contents.get(this.selected);
        this.delStack.push(new StackElement(this.selected, cutNode.prev, cutNode.next)); // 삭제되는 시점에 연결되었던 전후 노드들을 같이 저장해준다

        // head를 삭제한 경우
        if (this.head === this.selected) this.head = cutNode.next.index;
        // head가 아닌 곳인 경우, 이전과 서로 이어준다
        else cutNode.prev.connect(cutNode.next); // 이전 노드와 다음 노드를 서로 연결
        // 다음 행 받기
        const nextNode = cutNode.next;
        this.selected = (nextNode) ? nextNode.index : cutNode.prev.index;

        // 잘린 노드는 연결을 아예 끊어주자.
        cutNode.prev = cutNode.next = null;
    }

    // 행 복구
    restore() {
        const restoreData = this.delStack.pop();
        const restoreIndex = restoreData.index;
        this.deleted[restoreIndex] = false;

        let restoredNode = this.contents.get(restoreIndex);

        // 이전에 연결되었던 노드들을 다시 연결해줌
        if (!restoreData.prev) {
            // 맨앞에 붙는 경우이다
            this.head = restoreIndex;
            restoredNode.connect(restoreData.next);
            return;
        }
        restoreData.prev.connect(restoredNode);
        restoredNode.connect(restoreData.next);
    }

    // 정답 추출
    generateAnswer() {
        return this.deleted.map((del) => ((del) ? "X" : "O")).join("");
    }
}

function solution(n, k, cmd) {
    let nodeMap = new Map();
    // 각 node 만들어서 맵에 저장
    for (let i = 0; i < n; i++) {
        nodeMap.set(i, new Node(i));
    }
    // 초기 node끼리 연결해주기
    for (let i = 0; i < n - 1; i++) {
        nodeMap.get(i).connect(nodeMap.get(i + 1));
    }

    // 표 정보
    let arr = new MyArray(n, k, nodeMap);

    // cmd 수행
    for (let command of cmd) {
        // 띄어쓰기 구분
        const queries = command.split(" ");
        let amount; // 이동 횟수

        switch (queries[0]) {
            case "U":
                amount = parseInt(queries[1]);
                arr.moveUp(amount);
                break;

            case "D":
                amount = parseInt(queries[1]);
                arr.moveDown(amount);
                break;

            case "C":
                arr.cut();
                break;

            case "Z":
                arr.restore();
                break;
        }
    }

    // 정답 추출
    return arr.generateAnswer();
}