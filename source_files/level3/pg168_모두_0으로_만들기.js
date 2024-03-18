/* 
[3단계] 모두 0으로 만들기
(월간 코드 챌린지 시즌2)
*/

// 2nd try: iterative DFS 방식
class Node {
    constructor(num) {
        this.data = num;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = new Node(-1); // 시작은 빈 노드
        this.length = 0; // 저장된 노드가 몇개인지(시작 제외)
    }

    // 연결된 포인트들을 모두 가져오는 함수
    connectedPoints() {
        let points = [];
        for (let current = this.head.next; current; current = current.next) {
            points.push(current.data);
        }

        return points;
    }

    // 특정 노드를 더해주는 함수
    insert(num) {
        let newNode = new Node(num);

        // 가장 앞에 붙여주기
        newNode.next = this.head.next;
        this.head.next = newNode;
        this.length++;
    }
}

function solution(a, edges) {
    if (isZeroEverywhere(a)) return 0;

    let answer = 0n;
    let weights = a.map((num) => (BigInt(num)));
    if (impossible(weights)) return -1;

    let visited = Array.from({ length: a.length }, () => (false));

    const connection = new Map();
    initMap(connection, weights, edges);

    // iterative DFS로 구현
    let dfsStack = [[-1, 0]];

    while (dfsStack.length > 0) {
        const [parent, current] = dfsStack.pop();
        // 방문한 적이 있다면, 돌아가야 할 때이다
        if (visited[current]) {
            answer += bigAbs(weights[current]);
            if (parent >= 0) weights[parent] += weights[current];
            continue;
        }

        // 방문한 적이 없다면, 방문처리 및 새 루트 추가
        visited[current] = true;
        dfsStack.push([parent, current]); // 다시 돌아올 경우 대비해 다시 넣어준다

        const connectedPoints = connection.get(current).connectedPoints();
        for (let next of connectedPoints) {
            if (!visited[next])
                dfsStack.push([current, next]);
        }
    }

    return answer;
}

// 모든 가중치가 0이 되었는지 판별하는 함수
function isZeroEverywhere(a) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== 0) return false;
    }

    return true;
}

// 가중치 0 만들기가 불가능한 경우를 판별하는 함수
function impossible(a) {
    const sum = a.reduce((acc, cur) => (acc + cur), 0n);

    // 모두 합했을 때 0이 되지 않으면 불가능
    return (sum !== 0n);
}

// 초기 edge 정보를 map에 저장하는 함수
function initMap(connection, a, edges) {
    for (let i = 0; i < a.length; i++) {
        connection.set(i, new LinkedList()); // 각 정점마다 연결점을 저장할 연결 리스트
    }

    // edge 정보 저장
    edges.forEach(([p1, p2]) => {
        connection.get(p1).insert(p2);
        connection.get(p2).insert(p1);
    })
}

// BigInt의 절대값 함수
function bigAbs(num) {
    return (num >= 0n) ? num : -num;
}




// 1st try: leaf부터 하나씩 떼어가기 using map and linked list(시간 초과)
// class Node {
//     constructor(num) {
//         this.data = num;
//         this.next = null;
//     }
// }

// class LinkedList {
//     constructor() {
//         this.head = new Node(-1); // 시작은 빈 노드
//         this.length = 0; // 저장된 노드가 몇개인지(시작 제외)
//     }

//     // 첫 노드 숫자를 반환하는 함수
//     initialNumber() {
//         if (!this.head.next)
//             throw new Error("저장된 숫자가 없어요");
//         return this.head.next.data;
//     }

//     // 해당 노드가 리프 노드인지 여부를 반환하는 함수
//     isLeaf() {
//         return (this.length === 1);
//     }

//     // 특정 노드를 더해주는 함수
//     insert(num) {
//         let newNode = new Node(num);

//         // 가장 앞에 붙여주기
//         newNode.next = this.head.next;
//         this.head.next = newNode;
//         this.length++;
//     }

//     // 특정 숫자에 해당하는 노드를 삭제하는 함수
//     delete(num) {
//         let prev = this.head, current = this.head.next;
//         while (current && current.data !== num) {
//             prev = current;
//             current = current.next;
//         }

//         if (current) {
//             prev.next = current.next;
//             this.length--;
//         }
//     }
// }

// function solution(a, edges) {
//     if (impossible(a)) return -1;
//     if (isZeroEverywhere(a)) return 0;

//     let answer = 0n;
//     let weights = a.map((num) => (BigInt(num)));
//     // 각 정점마다 연결되어 있는 정점을 저장하는 맵
//     const connection = new Map();
//     initMap(connection, weights, edges);
//     let leaves = getLeaves(connection);

//     // leaf node에서부터 다 끌어모아간다
//     while (connection.size > 2) {
//         let nextLeaves = [];
//         // leaf에서 이어진 노드로 모두 넘기는 과정
//         leaves.forEach((leaf) => {
//             const next = getPointConnectedToLeaf(leaf, connection);
//             answer += bigAbs(weights[leaf]);
//             weights[next] += weights[leaf];

//             cutLeaf(leaf, next, connection);
//             // 해당 next가 새로운 leaf가 될 수 있으면 leaf로 추가
//             if (connection.get(next).isLeaf()) {
//                 nextLeaves.push(next);
//             }
//         })

//         leaves = nextLeaves;
//     }

//     // 마지막 2개만 남은 경우, 남은 두 정점의 각 가중치의 절대값만큼 더한다
//     const remainingOne = (Array.from(connection.keys()))[0];
//     answer += bigAbs(weights[remainingOne]);

//     return answer;
// }

// // 모든 가중치가 0이 되었는지 판별하는 함수
// function isZeroEverywhere(a) {
//     for (let i = 0; i < a.length; i++) {
//         if (a[i] !== 0) return false;
//     }

//     return true;
// }

// // 가중치 0 만들기가 불가능한 경우를 판별하는 함수
// function impossible(a) {
//     const sum = a.reduce((acc, cur) => (acc + cur), 0);

//     // 모두 합했을 때 0이 되지 않으면 불가능
//     return (sum !== 0);
// }

// // 초기 edge 정보를 map에 저장하는 함수
// function initMap(connection, a, edges) {
//     for (let i = 0; i < a.length; i++) {
//         connection.set(i, new LinkedList()); // 각 정점마다 연결점을 저장할 연결 리스트
//     }

//     // edge 정보 저장
//     edges.forEach(([p1, p2]) => {
//         connection.get(p1).insert(p2);
//         connection.get(p2).insert(p1);
//     })
// }

// // map에서 leaf node들의 인덱스를 받아오는 함수
// function getLeaves(connection) {
//     let leaves = [];
//     connection.forEach((points, index) => {
//         if (points.length === 1) leaves.push(index);
//     })

//     return leaves;
// }

// // leaf node에 이어진 node의 인덱스를 받아오는 함수
// function getPointConnectedToLeaf(index, connection) {
//     return connection.get(index).initialNumber();
// }

// // 특정 leaf node를 꺾어내는 함수
// function cutLeaf(leaf, next, connection) {
//     connection.delete(leaf);
//     connection.get(next).delete(leaf);
// }

// // BigInt의 절대값 함수
// function bigAbs(num) {
//     return (num >= 0n) ? num : -num;
// }