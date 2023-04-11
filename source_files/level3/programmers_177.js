/* 
[3단계] 길 찾기 게임
(2019 KAKAO BLIND RECRUITMENT)
*/

class Node {
    constructor(i, x, y) {
        this.i = i;
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor(node) {
        this.root = node;
    }

    // 새로운 노드 이어주기
    add(node) {
        let current = this.root;
        while (current) {
            // x값에 따라 좌우로 이동
            if (node.x < current.x) {
                // 왼쪽이 없는 경우 거기에 넣어준다
                if (!current.left) {
                    current.left = node;
                    return;
                }
                // 왼쪽 이동
                current = current.left;
                continue;
            }
            // 오른쪽이 없는 경우
            if (!current.right) {
                current.right = node;
                return;
            }
            // 오른쪽 이동
            current = current.right;
        }
    }

    // 전위 순회
    preorderSearch(currentNode, visited) {
        // 없는 경우 그대로 반환
        if (!currentNode) return visited;

        // 먼저 기록
        visited.push(currentNode.i);
        // 좌우 탐색
        visited = this.preorderSearch(currentNode.left, visited);
        visited = this.preorderSearch(currentNode.right, visited);

        return visited;
    }

    // 후위 순회
    postorderSearch(currentNode, visited) {
        // 없는 경우 그대로 반환
        if (!currentNode) return visited;

        // 좌우 탐색
        visited = this.postorderSearch(currentNode.left, visited);
        visited = this.postorderSearch(currentNode.right, visited);
        // 이후 기록
        visited.push(currentNode.i);

        return visited;
    }
}

function solution(nodeinfo) {
    // 각 노드들 생성
    let nodes = nodeinfo.map(([x, y], index) => {
        return new Node(index + 1, x, y);
    });

    // 노드를 y에 대해 내림차순 정렬(이 순서대로 넣을 거임)
    nodes.sort((n1, n2) => {
        return n2.y - n1.y;
    })

    // 트리 생성
    let tree = new BST(nodes[0]);
    for (let i = 1; i < nodes.length; i++) {
        tree.add(nodes[i]);
    }

    // 순회 결과
    return [tree.preorderSearch(tree.root, []), tree.postorderSearch(tree.root, [])];
}