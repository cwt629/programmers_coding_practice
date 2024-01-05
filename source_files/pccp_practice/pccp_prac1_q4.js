/*
[PCCP 모의고사1 > 1회 모의고사 4번]
4번 - 운영체제
*/

class MyProgram {
    constructor(score, calledTime, execTime){
        this.score = score;
        this.calledTime = calledTime;
        this.execTime = execTime;
    }
    
    // 프로그램 실행 후, 완료 여부를 반환하는 함수
    execute(){
        this.execTime--;
        return this.execTime <= 0;
    }
    
    // 대기 시간을 반환하는 함수
    getWaitingTime(startTime){
        return startTime - this.calledTime;
    }
    
    // 해당 프로그램이 다른 프로그램보다 우선순위가 높은지 판단하는 함수
    hasHigherPriority(program){
        // 점수가 같은 경우
        if (this.score === program.score)
            return this.calledTime < program.calledTime; // 더 일찍 호출되어야 우선순위 높음
        // 점수가 더 낮아야 우선순위 높음
        return this.score < program.score;
    }
}

// 프로그램들 중 다음으로 호출될 프로그램이 꼭대기에 있는 Heap 자료구조
class ProgramHeap {
    constructor(){
        this.content = [null]; // 1번 인덱스부터 시작해야 하므로, 0번은 비워둠
        this.length = 0; // heap에 든 프로그램의 개수
    }
    
    // 비어있는지 판단하는 함수
    isEmpty(){
        return this.length === 0;
    }
    
    // 프로그램 추가
    add(program){
        this.content[++this.length] = program;
        // 부모보다 우선순위가 높은 동안 계속 위로 올라감
        let i = this.length;
        let parentIndex = Math.floor(i / 2);
        while (i > 1 && this.content[i].hasHigherPriority(this.content[parentIndex])){
            // 두 요소 스왑
            [this.content[i], this.content[parentIndex]] = [this.content[parentIndex], this.content[i]];
            // 인덱스 이동
            i = parentIndex;
            parentIndex = Math.floor(i / 2);
        }
    }
    
    // 맨위에 있는 프로그램을 추출하고 반환하는 함수
    pop(){
        // 없는 경우
        if (this.isEmpty()) return null;
        
        let program = this.content[1];
        // Heapify
        this.content[1] = this.content[this.length--]; // 맨마지막 노드를 위로 끌어올림
        let i = 1, child = 2;
        while (child <= this.length){
            // 두 자식노드 중 더 우선순위 높은 것을 고른다
            if (child < this.length && this.content[child + 1].hasHigherPriority(this.content[child])) child++;
            
            // 그 자식보다 우선순위가 높으면 그대로
            if (this.content[i].hasHigherPriority(this.content[child])) break;
            
            // 그 자식보다 우선순위가 낮으면 swap
            [this.content[i], this.content[child]] = [this.content[child], this.content[i]];
            // 인덱스 조정
            i = child;
            child *= 2;
        }
        
        return program;
    }
    
}

function solution(program) {
    let answer = [0]; // [모든 프로그램이 종료되는 시각]
    for (let i = 1; i <= 10; i++){
        answer.push(0); // 점수가 i인 프로그램들의 대기시간 합
    }
    
    let heap = new ProgramHeap(); // 프로그램들을 담을 heap
    
    // 들어오는 시간 순으로 정렬된 배열
    let programsByTime = [...program].sort((p1, p2) => (p1[1] - p2[1]));
    
    let programPtr = 0;
    // 계속 수행한다
    let time = 0;
    let current = null;
    do {
        // 해당 시간 안에 들어온 프로그램들 먼저 저장해준다
        while (programPtr < programsByTime.length 
               && programsByTime[programPtr][1] <= time){
            let pg = new MyProgram(...programsByTime[programPtr++]);
            heap.add(pg);
        }
        
        // heap이 비어있는 경우, 아직 들어올 프로그램이 남은 것
        if (heap.isEmpty()){
            time++;
            continue;
        }
        
        current = heap.pop();
        answer[current.score] += current.getWaitingTime(time);
        time += current.execTime; // 해당 작업의 수행 시간만큼 시간 이동
        
    } while (!heap.isEmpty() || programPtr < programsByTime.length);
    
    answer[0] = time; // 최종 시간
    return answer;
}