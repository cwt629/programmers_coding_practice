/* 
[3단계] 양과 늑대
(2022 KAKAO BLIND RECRUITMENT)
*/


// 각 엣지에 대한 노드
class Node {
    constructor(index, animal) {
        this.index = index;
        this.animal = animal;
        this.siblings = [];
    }

    // 특정 노드를 이어주는 함수
    connect(node) {
        this.siblings.push(node);
    }
}

const infos = [[0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1], [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0]];
const edges = [[[0, 1], [1, 2], [1, 4], [0, 8], [8, 7], [9, 10], [9, 11], [4, 3], [6, 5], [4, 6], [8, 9]], [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 8], [6, 9], [9, 10]]];

for (let i = 0; i < infos.length; i++) console.log(solution(infos[i], edges[i]));


function solution(info, edges) {
    let answer = 0;
    let nodes = [];
    for (let i = 0; i < info.length; i++) {
        nodes[i] = new Node(i, info[i]);
    }

    // edges 정보 저장
    edges.forEach(([p1, p2]) => {
        nodes[p1].connect(nodes[p2]);
    })

    function dfs(current, sheeps, wolves, nextNodes) {
        // 새로운 nextNodes
        let next = [...nextNodes];
        next.splice(next.indexOf(current), 1);

        // 현재 노드에 따라 양과 늑대의 수 갱신
        (current.animal === 0) ? sheeps++ : wolves++;

        // 현재까지 구한 양의 최대값보다 더 많아지면 갱신
        if (answer < sheeps) answer = sheeps;

        // 늑대가 양의 수 이상이 되면 탐색 중지
        if (sheeps <= wolves) return;

        // 현재 노드의 자식 노드들 넣어주기
        next.push(...current.siblings);

        // 이후 들어갈 수 있는 요소들 순회
        for (let node of next) {
            dfs(node, sheeps, wolves, next);
        }
    }

    // DFS 식 완전탐색
    dfs(nodes[0], 0, 0, [nodes[0]]);

    return answer;
}

