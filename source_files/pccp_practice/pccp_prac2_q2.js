/*
[PCCP 모의고사 2 > 2회 모의고사 2번]
2번 - 신입사원 교육
*/

// 2nd try: Min Heap 활용 (정답)
class MinHeap {
    constructor() {
        this.contents = [null];
        this.length = 0;
    }

    // 새로운 값 추가
    add(num) {
        this.contents[++this.length] = num;
        // 부모보다 작으면 더 위로 올라간다 (Heapify)
        let child = this.length, parent = Math.floor(child / 2);
        while (child > 1 && this.contents[child] < this.contents[parent]) {
            [this.contents[child], this.contents[parent]] = [this.contents[parent], this.contents[child]]; // swap
            child = parent;
            parent = Math.floor(child / 2);
        }
    }

    // 최대값 제거
    pop() {
        let result = this.contents[1];
        this.contents[1] = this.contents[this.length--]; // 최상위 노드 제거 및 맨마지막 노드를 최상위로 이동

        // 자식보다 크면 더 아래로 내려간다 (Heapify)
        let parent = 1, child = 2;
        while (child < this.length) {
            // 두 자식 노드 중 더 작은 노드로 비교한다
            if (child + 1 < this.length && this.contents[child] > this.contents[child + 1]) child++;

            // 자식보다 부모가 더 작으면 그대로 종료
            if (this.contents[parent] <= this.contents[child])
                break;

            // 자식보다 부모가 더 크면, 서로 위치 바꾸기
            [this.contents[parent], this.contents[child]] = [this.contents[child], this.contents[parent]];
            parent = child;
            child = parent * 2;
        }

        return result;
    }

    // 모든 능력치 합을 반환하는 함수
    getSum() {
        let result = 0;
        for (let i = 1; i < this.contents.length; i++) {
            result += this.contents[i];
        }

        return result;
    }
}

function solution(ability, number) {
    // greedy algorithm: 제일 능력치 작은 둘끼리 계속붙인다
    // Min Heap 구성
    let heap = new MinHeap();
    ability.forEach((a) => {
        heap.add(a);
    })

    // 해당 횟수만큼 교육
    for (let i = 0; i < number; i++) {
        // 제일 능력치 낮은 신입사원 두명
        let edu1 = heap.pop();
        let edu2 = heap.pop();

        // 둘다 heap에 삽입
        heap.add(edu1 + edu2);
        heap.add(edu1 + edu2);
    }

    return heap.getSum();
}

// 1st try: 링크드 리스트 활용 (11번 케이스 시간초과)
// class Node {
//     constructor(num) {
//         this.data = num;
//         this.next = null;
//     }

//     setData(num) {
//         this.data = num;
//     }
// }

// class AbilityLinkedList {
//     // 오름차순 정렬된 배열을 인자로 받아옴
//     constructor(ability) {
//         this.head = null;

//         // 초기 세팅
//         this.init(ability);
//     }

//     // 초기에만 불리는 함수: 초기 상태
//     init(ability) {
//         this.head = new Node(ability[0]);

//         let current = this.head;
//         for (let i = 1; i < ability.length; i++) {
//             let node = new Node(ability[i]);
//             current.next = node;
//             current = current.next;
//         }
//     }

//     // 첫 두 노드에 대해 교육 처리하고, 적당한 위치로 보내는 함수
//     educate() {
//         let educatedNodes = [this.head, this.head.next];
//         let finalAbility = educatedNodes[0].data + educatedNodes[1].data;
//         educatedNodes[0].setData(finalAbility);
//         educatedNodes[1].setData(finalAbility);

//         // 이미 더했음에도 다음 노드보다 뛰어나지 않으면 그대로 반환
//         if (!educatedNodes[1].next || finalAbility <= educatedNodes[1].next.data)
//             return;

//         // current와 그 다음 노드 사이에 들어가게끔 하는 current를 찾는다
//         let current = educatedNodes[1].next;
//         this.head = current; // 한번은 이동하므로, 3번째 있던 노드가 헤드가 된다
//         while (current.next && current.next.data < finalAbility)
//             current = current.next;

//         // 찾은 current와 그 다음 노드 사이에 두 노드들을 연결한다
//         let rightBound = current.next;
//         current.next = educatedNodes[0];
//         educatedNodes[1].next = rightBound;
//     }

//     // 모든 능력치들의 합을 반환하는 함수
//     getSum() {
//         let result = 0;
//         for (let current = this.head; current; current = current.next) {
//             result += current.data;
//         }

//         return result;
//     }
// }

// function solution(ability, number) {
//     // greedy algorithm: 제일 능력치 작은 둘끼리 계속붙인다
//     // 초기에는 한번 오름차순 정렬한다
//     ability.sort((a, b) => (a - b));
//     let list = new AbilityLinkedList(ability); // 정렬된 배열을 토대로 링크드 리스트 생성

//     for (let i = 0; i < number; i++) {
//         list.educate();
//     }

//     return list.getSum();
// }