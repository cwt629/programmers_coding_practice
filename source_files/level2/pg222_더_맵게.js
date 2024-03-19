/*
[2단계] 더 맵게
(연습문제: 힙(Heap))
*/

class MinHeap{
    constructor(){
        this.contents = [null];
        this.length = 0;
    }
    
    add(num){
        this.contents[++this.length] = num;
        // Heapify
        let current = this.length, parent = Math.floor(current / 2);
        while (current > 1 && this.contents[parent] > this.contents[current]){
            // swap
            [this.contents[parent], this.contents[current]] = [this.contents[current], this.contents[parent]];
            current = parent;
            parent = Math.floor(parent / 2);
        }
    }
    
    pop(){
        if (this.length === 0) return -1;
        
        let element = this.contents[1]; // 최소값 배출
        this.contents[1] = this.contents[this.length--];
        
        // Heapify
        let parent = 1, child = 2;
        while (child <= this.length){
            // 둘 중 더 작은 요소랑 비교한다
            if (child + 1 <= this.length && this.contents[child] > this.contents[child + 1]) child++;
            
            // 이미 Heap인 경우
            if (this.contents[parent] < this.contents[child]) break;
            
            // swap
            [this.contents[parent], this.contents[child]] = [this.contents[child], this.contents[parent]];
            
            parent = child;
            child *= 2;
        }
        
        return element;
    }
    
    // 개수 반환
    getCount(){
        return this.length;
    }
    
    // 제일 안 매운 음식의 지수 반환
    getMin(){
        return this.contents[1];
    }
}

function solution(scoville, K) {
    let answer = 0;
    let minHeap = new MinHeap();
    
    // 순서대로 heap에 저장
    for (let num of scoville){
        minHeap.add(num);
    }
    
    // 섞기 시작
    while (minHeap.getCount() > 1 && minHeap.getMin() < K){
        let first = minHeap.pop(), second = minHeap.pop();
        minHeap.add(first + second * 2);
        answer++;
    }
    
    return minHeap.getMin() >= K? answer : -1;
}