/*
[2단계] 도넛과 막대 그래프
(2024 KAKAO WINTER INTERNSHIP)
*/

/* 2nd try: 그래프의 특성을 out 간선 개수로 추출 */

class Node {
    constructor(num){
        this.num = num;
        this.in = 0;
        this.out = 0;
    }
}

function solution(edges) {
    let answer = [0, 0, 0, 0];
    const VERTEX_SIZE = getMaxVertex(edges);
    
    // 간선 정보 저장(index + 1번 점에 대해, 연결된 점을 링크드 리스트 형태로 관리)
    let edgeData = Array.from({length: VERTEX_SIZE}, (d, i) => new Node(i + 1));
    
    for (let edge of edges){
        let [from, to] = edge;
        edgeData[from - 1].out++;
        edgeData[to - 1].in++;
    }
    
    // 나가는 간선만 2개 이상 있고 들어오는 간선이 없는 유일한 정점이 바로 추가한 정점이다.
    answer[0] = edgeData.filter((data) => (data.out >= 2 && data.in === 0))[0].num;
        
    // 문제의 조건에 따르면, 막대 모양 그래프의 개수는 out이 0인 점의 개수와 같아짐
    // 그리고 8자 모양 그래프의 개수는 out이 2인 점의 개수와 같아짐
    for (let i = 0; i < VERTEX_SIZE; i++){
        if (i === answer[0] - 1) continue; // 추가 정점 제외
        
        // 숫자가 아예 없는 경우를 대비하여, in도 함께 체크해준다
        if (edgeData[i].out === 0 && edgeData[i].in > 0){
            answer[2]++;
        } 
        if (edgeData[i].out >= 2){
            answer[3]++;
        }
    }
    
    // 도넛 모양 그래프는 전체 그래프 수(추가정점에서의 out) - 막대 그래프 수 - 8자 그래프 수 이다
    answer[1] = edgeData[answer[0] - 1].out - answer[2] - answer[3];
    
    return answer;
}

// edges에서 가장 큰 정점 번호를 반환하는 함수
function getMaxVertex(edges){
    let max = 1;
    for (let edge of edges){
        if (max < edge[0])
            max = edge[0];
        if (max < edge[1])
            max = edge[1];
    }
    
    return max;
}



/* 1st try: 그래프 탐색(9번 테스트케이스에서 시간 초과) */
// class Node {
//     constructor(num){
//         this.data = num;
//         this.next = null;
//     }
// }

// class LinkedList {
//     constructor(num){
//         this.head = new Node(num);
//     }
    
//     link(num){
//         let lastNode = this.head;
//         while (lastNode.next) lastNode = lastNode.next;
        
//         lastNode.next = new Node(num);
//     }
    
//     length(){
//         let count = 0;
//         for (let current = this.head.next; current; current = current.next)
//             count++;
        
//         return count;
//     }
    
//     // for debugging
//     printContent(){
//         let data = [this.head.data];
//         for (let current = this.head.next; current; current = current.next)
//             data.push(current.data);
        
//         console.log(data.join(" -> "));
//     }
// }

// function solution(edges) {
//     let answer = [0, 0, 0, 0];
//     const VERTEX_SIZE = getMaxVertex(edges);
    
//     // 간선 정보 저장(index + 1번 점에 대해, 연결된 점을 링크드 리스트 형태로 관리)
//     let edgeData = Array.from({length: VERTEX_SIZE}, (d, i) => new LinkedList(i));
//     let hasIncomingEdge = Array.from({length: VERTEX_SIZE}, () => false);
    
//     for (let edge of edges){
//         let [from, to] = edge;
//         edgeData[from - 1].link(to - 1);
//         hasIncomingEdge[to - 1] = true;
//     }
    
//     // 나가는 간선만 2개 이상 있고 들어오는 간선이 없는 유일한 정점이 바로 추가한 정점이다.
//     for (let i = 0; i < VERTEX_SIZE; i++){
//         if (!hasIncomingEdge[i] && edgeData[i].length() >= 2){
//             answer[0] = i + 1;
//             break;
//         }
//     }
    
//     // for (let d of edgeData){
//     //     d.printContent();
//     // }
    
//     // DFS 방식으로, 정점에서부터 하나씩 출발점을 세워 그래프를 판별한다
//     let visited = Array.from({length: VERTEX_SIZE}, () => false);
//     visited[answer[0] - 1] = true;
    
//     for (let current = edgeData[answer[0] - 1].head.next; current; current = current.next){
//         let cycle = 0;
//         let path = [];
//         let dfsStack = [current];
        
//         while (dfsStack.length > 0){
//             let innerCurrent = dfsStack.pop();
//             path.push(innerCurrent.data + 1);
//             if (visited[innerCurrent.data]){
//                 cycle++;
//                 continue;
//             }
//             visited[innerCurrent.data] = true;
            
//             for (let ptr = edgeData[innerCurrent.data].head.next; ptr; ptr = ptr.next){
//                 dfsStack.push(ptr);
//             }
//         }
//         /*
//         cycle 1개 이상 & path에 같은 숫자가 3번 이상 등장: 8자(answer[3])
//         cycle 1개 & path에 같은 숫자가 2번 등장: 도넛(answer[1])
//         cycle 0개: 막대(answer[2])
//         */
//         if (cycle > 0){
//             let tempSet = new Set(path);
//             if (path.length === tempSet.size + 1) answer[1]++;
//             else answer[3]++;
//         }
//         else answer[2]++;
//     }
    
//     return answer;
// }

// // edges에서 가장 큰 정점 번호를 반환하는 함수
// function getMaxVertex(edges){
//     let max = 1;
//     for (let edge of edges){
//         if (max < edge[0])
//             max = edge[0];
//         if (max < edge[1])
//             max = edge[1];
//     }
    
//     return max;
// }