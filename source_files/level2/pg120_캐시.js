/* 
[2단계] [1차] 캐시
(2018 KAKAO BLIND RECRUITMENT)
*/

// 이중 연결 리스트로 LRU 캐시 구현
class Node {
    constructor(name) {
        this.name = name?.toLowerCase();
        this.prev = null;
        this.next = null;
    }
}

class Cache {
    constructor(cacheSize) {
        // 각 도시 이름이 어느 노드에 해당하는지 총괄하는 자료구조: 맵
        this.list = new Map();
        this.capacity = cacheSize;
        this.head = new Node(null);
        this.tail = new Node(null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    // 맨 뒤에 특정 노드를 삽입하는 함수
    insertBack(node) {
        node.prev = this.tail.prev;
        node.next = this.tail;
        this.tail.prev.next = node;
        this.tail.prev = node;
        // 맵에 따로 저장
        this.list.set(node.name, node);
    }

    // 맨 앞의 노드를 삭제하는 함수
    deleteFront() {
        let deletedNode = this.head.next;
        // tail은 삭제 불가
        if (deletedNode === this.tail) {
            throw new Error("Cannot delete from empty list");
        }

        this.head.next = deletedNode.next;
        this.head.next.prev = this.head;

        // map에서도 삭제
        this.list.delete(deletedNode.name);
        return deletedNode;
    }

    // 특정 노드를 제거하고 맨 뒤에 다시 넣어주는 함수
    moveToBack(node) {
        // 제거
        node.prev.next = node.next;
        node.next.prev = node.prev;

        // 맨 뒤에 삽입
        this.insertBack(node);
    }

    // 새 이름의 노드를 추가하는 함수
    insertName(name) {
        // size가 꽉 찼다면, 맨 앞 요소 제거
        if (this.list.size >= this.capacity)
            this.deleteFront();

        // 새 이름의 노드 추가
        const node = new Node(name);
        this.insertBack(node);
    }

    // 특정 이름의 노드를 갱신하는 함수
    update(name) {
        const node = this.list.get(name.toLowerCase());
        this.moveToBack(node);
    }

    // cache에 해당 이름이 존재하는지 반환하는 함수
    hit(name) {
        return this.list.has(name.toLowerCase());
    }

    // (디버깅용) 순서대로 도시이름을 출력해주는 함수
    printAll() {
        for (let ptr = this.head.next; ptr !== this.tail; ptr = ptr.next)
            console.log(ptr.name);
    }
}

function solution(cacheSize, cities) {
    var answer = 0;
    const cache = new Cache(cacheSize);

    // 도시이름 순회
    for (let city of cities) {
        // cache hit
        if (cache.hit(city)) {
            answer += 1;
            cache.update(city);
        }

        // cache miss
        else {
            answer += 5;
            // cache size가 0이 아닌 경우만 넣어준다
            if (cache.capacity > 0) cache.insertName(city);
        }
    }

    return answer;
}