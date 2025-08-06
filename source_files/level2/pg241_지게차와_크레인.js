/*
[2단계] 지게차와 크레인
(2025 프로그래머스 코드챌린지 1차 예선)
*/

class Container {
    constructor(name){
        this.name = name;
        this.empty = name.length === 0;
    }
}

function solution(storage, requests) {
    var answer = storage.length * storage[0].length;
    let virtualMap = []; // 실제 컨테이너를 빈 컨테이너로 감싸는 형태의 가상 맵
    for (let row = 0; row < storage.length + 2; row++){
        if (row === 0 || row === storage.length + 1){
            virtualMap[row] = Array.from({length: storage[0].length + 2}, () => (new Container("")));
            continue;
        }
        
        virtualMap[row] = [];
        for (let col = 0; col < storage[0].length + 2; col++){
            if (col === 0 || col === storage[0].length + 1){
                virtualMap[row][col] = new Container("");
            }
            else {
                virtualMap[row][col] = new Container(storage[row - 1].charAt(col - 1));
            }
        }
    }
    
    let visited = [];
    for (let row = 0; row < virtualMap.length; row++){
        visited[row] = [];
        for (let col = 0; col < virtualMap[row].length; col++){
            visited[row][col] = false;
        }
    }
    
    // 요청 처리 시작
    requests.forEach((request) => {
        const target = request.charAt(0);
        switch(request.length){
            // 외곽에서부터 DFS 방식으로 탐색
            case 1: {
                visited[0][0] = true;
                const dfsStack = [[0, 0]];
                
                while (dfsStack.length > 0){
                    const [currentRow, currentCol] = dfsStack.pop();
                    // 현위치에 컨테이너가 있는 경우, 타겟 체크
                    if (!virtualMap[currentRow][currentCol].empty){
                        if (virtualMap[currentRow][currentCol].name === target){
                            answer--;
                            virtualMap[currentRow][currentCol].empty = true;
                        }
                        continue;
                    }
                    
                    // 오른쪽
                    if (currentCol + 1 < virtualMap[currentRow].length && !visited[currentRow][currentCol + 1]){
                        dfsStack.push([currentRow, currentCol + 1]);
                        visited[currentRow][currentCol + 1] = true;
                    }
                    
                    // 아래쪽
                    if (currentRow + 1 < virtualMap.length && !visited[currentRow + 1][currentCol]){
                        dfsStack.push([currentRow + 1, currentCol]);
                        visited[currentRow + 1][currentCol] = true;
                    }
                    
                    // 왼쪽
                    if (currentCol > 0 && !visited[currentRow][currentCol - 1]){
                        dfsStack.push([currentRow, currentCol - 1]);
                        visited[currentRow][currentCol - 1] = true;
                    }
                    
                    // 위쪽
                    if (currentRow > 0 && !visited[currentRow - 1][currentCol]){
                        dfsStack.push([currentRow - 1, currentCol]);
                        visited[currentRow - 1][currentCol] = true;
                    }
                }
                
                initVisited(visited);
            }
                break;
                
            // target과 일치하는 모든 컨테이너들 꺼내기
            case 2:
                for (let row = 1; row < virtualMap.length - 1; row++){
                    for (let col = 1; col < virtualMap[row].length - 1; col++){
                        if (!virtualMap[row][col].empty && virtualMap[row][col].name === target){
                            virtualMap[row][col].empty = true;
                            answer--;
                        }
                    }
                }
                break;
                
            default:
                break;
        }
        
    })
    
    return answer;
}

// visited 이차원 배열 초기화 함수
function initVisited(visited){
    for (let row = 0; row < visited.length; row++){
        for (let col = 0; col < visited[row].length; col++){
            visited[row][col] = false;
        }
    }
}