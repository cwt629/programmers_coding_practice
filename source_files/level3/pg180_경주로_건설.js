/* 
[3단계] 경주로 건설
(2020 카카오 인턴십)
*/

// 2nd try: BFS로 하되, 방문 여부는 각 칸을 특정 방향으로 이동했을 때 최저 비용을 기준으로 판단

// 각 칸마다, 특정 방향으로 들어온 최소 비용을 저장하여 BFS의 저장 케이스 판별에 사용
class CostData{
    constructor(){
        this.costs = {
            up: Infinity,
            right: Infinity,
            down: Infinity,
            left: Infinity
        };
    }
    
    // 특정 방향으로 들어와도 되는지 판단하는 함수
    checkEntry(accCost, dir){
        return this.costs[dir] > accCost;
    }
    
    // 특정 방향의 최소 비용을 갱신하는 함수
    updateEntry(accCost, dir){
        this.costs[dir] = accCost;
    }
}

function solution(board) {
    let answer = Infinity;
    let visited = [];
    for (let i = 0; i < board.length; i++){
        visited[i] = [];
        for (let j = 0; j < board[i].length; j++){
            visited[i][j] = new CostData();
        }
    }
    
    // BFS 방식으로 탐색
    let bfsQueue = [];
    bfsQueue.push([0, 0, null, 0]); // [x, y, 이전 방향, 누적 비용]
    
    while (bfsQueue.length > 0){
        let nextDir;
        const [x, y, prevDir, accCost] = bfsQueue.shift();
        // 비용이 이미 최소값을 초과하면 더 할 필요 없다!
        if (accCost >= answer) continue;
        
        // 초기 상태에서는 오른쪽과 아래로 이동해본다
        if (x === 0 && y === 0){
            if (board[x + 1][y] === 0){
                bfsQueue.push([x + 1, y, "down", accCost + 100]);
                visited[x + 1][y].updateEntry(accCost + 100, "down");
            }
            if (board[x][y + 1] === 0){
                bfsQueue.push([x, y + 1, "right", accCost + 100]);
                visited[x][y + 1].updateEntry(accCost + 100, "right");
            }

            continue;
        }
        
        // 목적지에서는 최소값 갱신
        if (x === board.length - 1 && y === board.length - 1){
            if (accCost < answer) answer = accCost;
            continue;
        }
        
        // 이 외
        // 1. 가던 방향으로 먼저 가본다
        if (movableToDirection(x, y, prevDir, accCost + 100, board, visited)){
            const [nextX, nextY] = moveTo(x, y, prevDir);
            bfsQueue.push([nextX, nextY, prevDir, accCost + 100]);
            visited[nextX][nextY].updateEntry(accCost + 100, prevDir);
        }
        
        // 2. 가던 방향에서 왼쪽으로 틀어본다
        nextDir = turnLeft(prevDir);
        if (movableToDirection(x, y, nextDir, accCost + 600, board, visited)){
            const [nextX, nextY] = moveTo(x, y, nextDir);
            bfsQueue.push([nextX, nextY, nextDir, accCost + 600]); // 길 + 코너
            visited[nextX][nextY].updateEntry(accCost + 600, nextDir);
        }
        
        // 3. 가던 방향에서 오른쪽으로 틀어본다
        nextDir = turnRight(prevDir);
        if (movableToDirection(x, y, nextDir, accCost + 600, board, visited)){
            const [nextX, nextY] = moveTo(x, y, nextDir);
            bfsQueue.push([nextX, nextY, nextDir, accCost + 600]); // 길 + 코너
            visited[nextX][nextY].updateEntry(accCost + 600, nextDir);
        }
    }
    
    return answer;
}

// 각 방향으로 이동 시 좌표를 반환하는 함수
function moveTo(x, y, direction){
    switch(direction){
        case "right":
            return [x, y + 1];
            
        case "down":
            return [x + 1, y];
            
        case "left":
            return [x, y - 1];
            
        case "up":
            return [x - 1, y];
    }
}

// 각 방향에서 좌회전 시 방향을 반환하는 함수
function turnLeft(direction){
    switch(direction){
        case "up":
            return "left";
            
        case "right":
            return "up";
            
        case "down":
            return "right";
            
        case "left":
            return "down";
    }
}

// 각 방향에서 우회전 시 방향을 반환하는 함수
function turnRight(direction){
    switch(direction){
        case "up":
            return "right";
            
        case "right":
            return "down";
            
        case "down":
            return "left";
            
        case "left":
            return "up";
    }
}

// 특정 위치에서 해당 방향으로 이동 가능한지 판단하는 함수(방문 여부까지 체크)
function movableToDirection(x, y, direction, accCost, board, visited){
    switch(direction){
        case "right":
            return (y < board.length - 1 && visited[x][y + 1].checkEntry(accCost, direction) && board[x][y + 1] === 0);
            
        case "down":
            return (x < board.length - 1 && visited[x + 1][y].checkEntry(accCost, direction) && board[x + 1][y] === 0);
            
        case "left":
            return (y > 0 && visited[x][y - 1].checkEntry(accCost, direction) && board[x][y - 1] === 0);
            
        case "up":
            return (x > 0 && visited[x - 1][y].checkEntry(accCost, direction) && board[x - 1][y] === 0);
    }
}



// 1st try: DFS(pruning까지 적용했지만, 케이스 4개에서 시간초과)

// class Node{
//     constructor(index){
//         this.index = index;
//         this.prev = null;
//         this.next = null;
//     }
    
//     // 현재 노드를 다음 노드와 연결
//     connect(nextNode){
//         this.next = nextNode;
//         if (nextNode) nextNode.prev = this;
//     }
    
//     // 현재 노드에서 k칸 앞으로 가면 어느 인덱스로 가는지 반환하는 함수
//     moveUpTo(len){
//         let current = this;
//         for (let i = 0; i < len; i++){
//             current = current.prev;
//         }
        
//         return current.index;
//     }
    
//     // 현재 노드에서 k칸 뒤로 가면 어느 인덱스로 가는지 반환하는 함수
//     moveDownTo(len){
//         let current = this;
//         for (let i = 0; i < len; i++){
//             current = current.next;
//         }
        
//         return current.index;
//     }
// }

// class StackElement{
//     constructor(index, prevNode, nextNode){
//         this.index = index;
//         this.prev = prevNode;
//         this.next = nextNode;
//     }
// }

// class MyArray{
//     constructor(n, k, nodeMap){
//         this.contents = nodeMap;
//         this.head = 0; // 이중 연결 리스트의 맨앞 인덱스
//         this.selected = k;
//         this.deleted = Array.from({length: n}, () => (false));
//         this.delStack = []; // 삭제된 요소들의 인덱스를 담는 스택
//     }
    
//     // 행 이동
//     moveUp(len){
//         // 현재 데이터에 대한 노드
//         const currentNode = this.contents.get(this.selected);
//         this.selected = currentNode.moveUpTo(len);
//     }
    
//     moveDown(len){
//         const currentNode = this.contents.get(this.selected);
//         this.selected = currentNode.moveDownTo(len);
//     }
    
//     // 현재 행 삭제
//     cut(){
//         this.deleted[this.selected] = true;
//         const cutNode = this.contents.get(this.selected);
//         this.delStack.push(new StackElement(this.selected, cutNode.prev, cutNode.next)); // 삭제되는 시점에 연결되었던 전후 노드들을 같이 저장해준다
        
//         // head를 삭제한 경우
//         if (this.head === this.selected) this.head = cutNode.next.index;
//         // head가 아닌 곳인 경우, 이전과 서로 이어준다
//         else cutNode.prev.connect(cutNode.next); // 이전 노드와 다음 노드를 서로 연결
//         // 다음 행 받기
//         const nextNode = cutNode.next;
//         this.selected = (nextNode)? nextNode.index : cutNode.prev.index;
        
//         // 잘린 노드는 연결을 아예 끊어주자.
//         cutNode.prev = cutNode.next = null;
//     }
    
//     // 행 복구
//     restore(){
//         const restoreData = this.delStack.pop();
//         const restoreIndex = restoreData.index;
//         this.deleted[restoreIndex] = false;
        
//         let restoredNode = this.contents.get(restoreIndex);
        
//         // 이전에 연결되었던 노드들을 다시 연결해줌
//         if (!restoreData.prev){
//             // 맨앞에 붙는 경우이다
//             this.head = restoreIndex;
//             restoredNode.connect(restoreData.next);
//             return;
//         }
//         restoreData.prev.connect(restoredNode);
//         restoredNode.connect(restoreData.next);
//     }
    
//     // 정답 추출
//     generateAnswer(){
//         return this.deleted.map((del) => ((del)? "X" : "O")).join("");
//     }
// }

// function solution(n, k, cmd) {
//     let nodeMap = new Map();
//     // 각 node 만들어서 맵에 저장
//     for (let i = 0; i < n; i++){
//         nodeMap.set(i, new Node(i));
//     }
//     // 초기 node끼리 연결해주기
//     for (let i = 0; i < n - 1; i++){
//         nodeMap.get(i).connect(nodeMap.get(i + 1));
//     }
    
//     // 표 정보
//     let arr = new MyArray(n, k, nodeMap);
    
//     // cmd 수행
//     for (let command of cmd){
//         // 띄어쓰기 구분
//         const queries = command.split(" ");
//         let amount; // 이동 횟수
        
//         switch(queries[0]){
//             case "U":
//                 amount = parseInt(queries[1]);
//                 arr.moveUp(amount);
//                 break;
                
//             case "D":
//                 amount = parseInt(queries[1]);
//                 arr.moveDown(amount);
//                 break;
                
//             case "C":
//                 arr.cut();
//                 break;
                
//             case "Z":
//                 arr.restore();
//                 break;
//         }
//     }
    
//     // 정답 추출
//     return arr.generateAnswer();
// }