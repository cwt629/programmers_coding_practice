/*
[3단계] 등산코스 정하기
(2022 KAKAO TECH INTERNSHIP)
*/

/* 1st try: summit마다 Prim's algorithm 돌리기 - 3시간초과*/
class Edge {
    constructor(from, to, time){
        this.from = from;
        this.to = to;
        this.time = time;
    }
}

class ListNode {
    constructor(edge){
        this.edge = edge;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
    }
    
    connect(edge){
        let newNode = new ListNode(edge);
        if (!this.head){
            this.head = newNode;
            this.tail = newNode;
            return;
        }
        else {
            this.tail.next = newNode;
            this.tail = this.tail.next;
        }
    }
}

class Heap {
    constructor(){
        this.elements = [null];
        this.size = 0;
    }
    
    add(edge){
        this.elements[++this.size] = edge;
        let current = this.size, parent = Math.floor(current / 2);
        
        while (current > 1 && this.elements[current].time < this.elements[parent].time)
        {
            [this.elements[current], this.elements[parent]] = [this.elements[parent], this.elements[current]]; // swap
            current = parent;
            parent = Math.floor(current / 2);
        }
    }
    
    pop(){
        // 루트 엣지를 뽑아낸다
        const result = this.elements[1];
        this.elements[1] = this.elements[this.size--];
        
        // heapify
        let current = 1, child = 2;
        while (child <= this.size){
            // child중 더 우선순위가 높은 노드를 찾음
            if (child < this.size && this.elements[child].time > this.elements[child + 1].time) child++;
            if (this.elements[current].time <= this.elements[child].time) break;
            
            [this.elements[current], this.elements[child]] = [this.elements[child], this.elements[current]]; // swap
            current = child;
            child *= 2;
        }
        
        return result;
    }
    
    isEmpty(){
        return this.size <= 0;
    }
}

function solution(n, paths, gates, summits) {
    let answer = [-1, -1];
    
    let isSummit = Array.from({length: n}, () => (false)),
        isGate = Array.from({length: n}, () => (false)),
        edges = Array.from({length: n}, () => (new LinkedList()));
    
    // 각 정보 저장
    for (let number of gates){
        isGate[number - 1] = true;
    }
    for (let number of summits){
        isSummit[number - 1] = true;
    }
    for (let [from, to, time] of paths){
        const edge = new Edge(from, to, time);
        edges[from - 1].connect(edge);
        edges[to - 1].connect(edge);
    }
    
    // 각 summit에서 시작하며 intensity 갱신
    summits.sort((a, b) => (a - b));
    for (let summit of summits){
        let visited = Array.from({length: n}, (v, i) => (summit === i + 1));
        let intensity = 0;
        const heap = new Heap();
        // 초기 summit에 연결된 path 정보 저장
        for (let current = edges[summit - 1].head; current; current = current.next){
            heap.add(current.edge);
        }
        
        while (!heap.isEmpty()){
            const currentEdge = heap.pop();
            
            // cycle 형성하는 경우 제거
            if (visited[currentEdge.from - 1] && visited[currentEdge.to - 1]) continue;
            // 양쪽 모두 출입구인 경우 제거
            if (isGate[currentEdge.from - 1] && isGate[currentEdge.to - 1]) continue;
            
            // 다른 산봉우리에 연결되는 경우 제거
            if (isSummit[currentEdge.from - 1] && summit !== currentEdge.from) continue;
            if (isSummit[currentEdge.to - 1] && summit !== currentEdge.to) continue;
            
            // intensity 갱신
            intensity = (intensity < currentEdge.time)? currentEdge.time : intensity;
            
            // 출입구에 다다른 경우, 바로 정답을 갱신하고 탐색을 중지한다
            if (isGate[currentEdge.from - 1] || isGate[currentEdge.to - 1]){
                if (answer[1] < 0 || intensity < answer[1]){
                    answer = [summit, intensity];
                }
                break;
            }
                        
            // 다음 갈수있는 영역을 넓힌다
            if (!visited[currentEdge.from - 1]){
                for (let current = edges[currentEdge.from - 1].head; current; current = current.next){
                    heap.add(current.edge);
                }
            }
            if (!visited[currentEdge.to - 1]){
                for (let current = edges[currentEdge.to - 1].head; current; current = current.next){
                    heap.add(current.edge);
                }
            }
            
            visited[currentEdge.from - 1] = true;
            visited[currentEdge.to - 1] = true;
        }
    }
    
    return answer;
}