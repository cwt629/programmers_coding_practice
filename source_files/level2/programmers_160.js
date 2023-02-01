/* 
[2단계] 디펜스 게임
(연습문제)
*/

class MaxHeap {
    constructor() {
        this.elements = [null]; // index 1부터 시작하기 위해, 0은 비워둠
        this.lastIndex = 0; // 마지막 인덱스
        this.total = 0; // 요소들의 총합
    }

    // 특정 인덱스의 부모 노드 인덱스 반환
    parentIndex(index) {
        return Math.floor(index / 2);
    }

    // heap에 요소 추가
    add(num) {
        this.elements[++this.lastIndex] = num;
        this.total += num;

        // heapify
        for (let index = this.lastIndex; index > 1 && this.elements[index] > this.elements[this.parentIndex(index)]; index = this.parentIndex(index)) {
            [this.elements[index], this.elements[this.parentIndex(index)]] = [this.elements[this.parentIndex(index)], this.elements[index]]; // swap
        }
    }

    // heap에서 최대값 제거
    delete() {
        const maxElement = this.elements[1];
        this.total -= maxElement;
        this.elements[1] = this.elements[this.lastIndex--];

        // heapify
        let index = 1;
        while (index * 2 <= this.lastIndex) {
            let nextIndex = index * 2; // 자식 노드 중 왼쪽
            if (nextIndex + 1 <= this.lastIndex && this.elements[nextIndex] < this.elements[nextIndex + 1]) nextIndex++; // 자식 노드 중 오른쪽이 왼쪽보다 크다면 오른쪽 선택

            // 교환 필요가 없다면 그대로 종료
            if (this.elements[index] >= this.elements[nextIndex]) break;

            // 두 노드 교환
            [this.elements[index], this.elements[nextIndex]] = [this.elements[nextIndex], this.elements[index]];

            index = nextIndex;
        }

        return maxElement;
    }

    // 총합이 n을 넘는지 여부
    exceeds(number) {
        return (this.total > number);
    }
}

function solution(n, k, enemy) {
    const heap = new MaxHeap(); // 최대 힙 구성

    for (let round = 0; round < enemy.length; round++) {
        heap.add(enemy[round]);
        // 못 버티는 경우
        if (heap.exceeds(n)) {
            // 무적권을 모두 쓴 경우
            if (k === 0) return round; // 직전 라운드 = 현재 라운드 인덱스

            heap.delete();
            k--; // 무적권 사용
        }
    }

    // 모두 버틴 경우
    return enemy.length;
}