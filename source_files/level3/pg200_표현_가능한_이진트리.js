/* 
[3단계] 표현 가능한 이진트리
(2023 KAKAO BLIND RECRUITMENT)
*/

class Node {
    constructor() {
        this.data = 0;
        this.left = null;
        this.right = null;
    }
}

function solution(numbers) {
    return numbers.map((n) => {
        const bin = convertToBinary(n); // 이진수(zero-fill 완료)
        const height = getMinimumLevel(bin);

        let root = buildTree(bin, height);

        return (inconstructable(root)) ? 0 : 1;
    })
}

// 숫자를 이진수 문자열로 반환하는 함수
function convertToBinary(num) {
    let result = num.toString(2);
    let level = getMinimumLevel(result);
    let additionRequired = nodeQty(level) - result.length;
    for (let i = 0; i < additionRequired; i++) result = "0" + result;

    return result;
}

// 특정 level의 node 개수를 반환하는 함수
function nodeQty(level) {
    return 2 ** level - 1;
}

// 특정 이진수를 담을 포화 이진트리의 최소 필요 레벨을 반환하는 함수
function getMinimumLevel(bin) {
    return Math.floor(Math.log2(bin.length)) + 1;
}

// 특정 level의 tree를 구성하는 함수
function buildTree(bin, height) {
    let root = new Node();
    let index = 0;

    // inorder 방식으로 트리 구성 및 요소 대입하는 함수
    const treeDFS = (node, curLevel) => {
        if (curLevel < height) {
            node.left = new Node();
            treeDFS(node.left, curLevel + 1);
        }

        node.data = bin.charAt(index++);

        if (curLevel < height) {
            node.right = new Node();
            treeDFS(node.right, curLevel + 1);
        }
    }

    treeDFS(root, 1);

    return root;
}

// tree를 순회하며, 구성 불가능 여부를 판단하는 함수
function inconstructable(node) {
    // 현재 노드 값이 0인 경우 판단
    if (node.data === "0") {
        // 부모 노드가 0인데 자식 노드가 1인 경우가 생기면 표현 불가능이다
        if (node.left && node.left.data === "1") return true;
        if (node.right && node.right.data === "1") return true;
    }

    // 리프 노드인 경우
    if (!node.left) return false;

    // 리프 노드가 아니라면, 더 내려가본다
    return inconstructable(node.left) || inconstructable(node.right);
}