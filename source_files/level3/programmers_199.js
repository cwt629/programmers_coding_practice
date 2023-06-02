/* 
[3단계] 표 병합
(2023 KAKAO BLIND RECRUITMENT)
*/

class Node {
    constructor() {
        this.value = null;
        this.next = this; // circular linked list 구현
    }

    // 값 업데이트
    grant(value) {
        this.value = value;
    }

    // 연결된 모든 노드 받아오기
    connectedNodes() {
        let nodes = [];
        let current = this;
        do {
            nodes = [...nodes, current];
            current = current.next;
        } while (current !== this);

        return nodes;
    }

    // 연결 끊기
    disconnect() {
        this.next = this;
        this.value = null;
    }
}

class Table {
    constructor() {
        this.contents = Array.from({ length: 50 }, () => (
            Array.from({ length: 50 }, () => (new Node()))
        )
        );
    }

    updateByIndex(r, c, value) {
        let nodes = this.contents[r][c].connectedNodes();
        for (let node of nodes)
            node.grant(value);
    }

    updateByValue(value1, value2) {
        for (let i = 0; i < 50; i++) {
            for (let j = 0; j < 50; j++) {
                if (this.contents[i][j].value === value1)
                    this.contents[i][j].grant(value2);
            }
        }
    }

    merge(r1, c1, r2, c2) {
        let node1 = this.contents[r1][c1], node2 = this.contents[r2][c2];
        // 무시1: 아예 같은 노드인 경우
        if (node1 === node2) return;

        // 무시2: 이미 병합된 경우
        let current = node1;
        do {
            if (current === node2) return;
            current = current.next;
        } while (current !== node1)

        // n2와 연결되었던 마지막 노드와, n1의 기존 next를 연결시켜야 하므로 둘을 저장
        let [tempFrom, tempTo] = [node2, node1.next];
        while (tempFrom.next !== node2) tempFrom = tempFrom.next;

        // 연결 작업
        node1.next = node2;
        tempFrom.next = tempTo;

        // 데이터 대입
        let data = (node1.value !== null) ? node1.value : node2.value;
        let mergedNodes = node1.connectedNodes();
        for (let node of mergedNodes)
            node.grant(data);
    }

    unmerge(r, c) {
        let stdNode = this.contents[r][c];
        let data = stdNode.value;
        let nodes = stdNode.connectedNodes();
        for (let node of nodes) {
            node.disconnect();
        }
        // r, c 셀만 값을 가져간다
        stdNode.grant(data);
    }

    printResult(r, c) {
        let data = this.contents[r][c].value;
        return (data !== null) ? data : "EMPTY";
    }
}

function solution(commands) {
    let answer = [];
    let table = new Table();

    commands.forEach((command) => {
        let [query, ...args] = command.split(" ");

        switch (query) {
            case "UPDATE":
                // 1. UPDATE r c value
                if (args.length === 3) {
                    args[0] = parseInt(args[0]) - 1;
                    args[1] = parseInt(args[1]) - 1;
                    table.updateByIndex(...args);
                    break;
                }

                // 2. UPDATE value1 value2
                table.updateByValue(...args);
                break;

            // 3. MERGE r1 c1 r2 c2
            case "MERGE":
                args = args.map((val) => (parseInt(val) - 1));
                table.merge(...args);
                break;

            // 4. UNMERGE r c
            case "UNMERGE":
                args = args.map((val) => (parseInt(val) - 1));
                table.unmerge(...args);
                break;

            // 5. PRINT r c
            case "PRINT":
                args = args.map((val) => (parseInt(val) - 1));
                answer = [...answer, table.printResult(...args)];
                break;
        }
    })

    return answer;
}