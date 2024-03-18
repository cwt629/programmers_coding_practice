/* 
[3단계] 이중우선순위큐
(연습문제: 힙(Heap))
*/

// 이진 탐색 트리(binary search tree) 구성
class Node {
    constructor(number) {
        this.data = number;
        this.smaller = null; // 더 작은 노드(왼쪽)
        this.larger = null; // 더 큰 노드(오른쪽)
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    // 새로운 데이터를 삽입하는 함수
    insert(number) {
        let node = new Node(number);
        // root가 비어있는 경우
        if (!this.root) {
            this.root = node;
            return;
        }

        // root가 존재하면, 포인터를 따라가며 적당한 위치에 삽입
        let ptr = this.root;
        while (ptr) {
            // 더 작은 경우
            if (number < ptr.data) {
                // 왼쪽 노드가 비어있으면 그 위치에 저장
                if (!ptr.smaller) {
                    ptr.smaller = node;
                    break;
                }
                ptr = ptr.smaller;
            }
            // 더 크거나 같은 경우
            else {
                // 오른쪽 노드가 비어있으면 그 위치에 저장
                if (!ptr.larger) {
                    ptr.larger = node;
                    break;
                }
                ptr = ptr.larger;
            }
        }
    }

    // 최소값 노드를 제거하는 함수
    removeMin() {
        let prev = null, ptr = this.root;
        // root가 존재하지 않으면 아무 일도 수행하지 않는다
        if (!ptr) return;

        // smaller 포인터를 쭉 따라 내려가면 최소값을 만난다
        while (ptr.smaller) {
            prev = ptr;
            ptr = ptr.smaller;
        }

        // 삭제 대상이 root인 경우
        if (ptr === this.root) {
            this.root = this.root.larger;
            return;
        }

        // 해당 노드 삭제
        prev.smaller = null;
    }

    // 최대값 노드를 삭제하는 함수
    removeMax() {
        let prev = null, ptr = this.root;
        // root가 존재하지 않으면 아무 일도 수행하지 않는다
        if (!ptr) return;

        // larger 포인터를 쭉 따라 내려가면 최대값을 만난다
        while (ptr.larger) {
            prev = ptr;
            ptr = ptr.larger;
        }

        // 삭제 대상이 root인 경우
        if (ptr === this.root) {
            this.root = this.root.smaller;
            return;
        }

        // 해당 노드 삭제
        prev.larger = null;
    }

    // 최소값을 구하는 함수
    getMin() {
        let ptr = this.root;
        while (ptr.smaller) ptr = ptr.smaller;

        return ptr.data;
    }

    // 최대값을 구하는 함수
    getMax() {
        let ptr = this.root;
        while (ptr.larger) ptr = ptr.larger;

        return ptr.data;
    }

    // 반환값을 구하는 함수
    getResult() {
        // 큐가 비어있는 경우
        if (!this.root) return [0, 0];

        // 큐가 비어있지 않은 경우
        return [this.getMax(), this.getMin()];
    }
}

function solution(operations) {
    const bst = new BST();

    // 연산 수행
    operations.forEach((op) => {
        // 명령어 요소: [작업, 숫자]
        const query = op.split(" ");

        switch (query[0]) {
            // 삽입 작업
            case "I":
                bst.insert(parseInt(query[1]));
                break;

            // 삭제 작업
            case "D":
                // 최댓값 삭제
                if (query[1] === "1")
                    bst.removeMax();
                // 최솟값 삭제
                else if (query[1] === "-1")
                    bst.removeMin();
                break;
        }
    })

    // 모든 연산 수행 후 결과 반환
    return bst.getResult();
}