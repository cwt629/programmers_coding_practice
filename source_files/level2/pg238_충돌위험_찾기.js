/*
[2단계] 충돌위험 찾기
(PCCP 기출문제)
*/

function solution(points, routes) {
    let answer = 0;
    
    // 각 로봇이 지나가는 지점을 모두 저장한다
    let moves = [];
    routes.forEach((targets) => {
        let targetIndex = 1;
        let target = points[targets[1] - 1];
        let current = points[targets[0] - 1];
        let currentMove = [current];
        
        while (targetIndex < targets.length){
            // row 우선
            if (current[0] !== target[0]){
                current = (current[0] < target[0])? [current[0] + 1, current[1]] 
                : [current[0] - 1, current[1]];
            }
            // 그 뒤로 col
            else {
                current = (current[1] < target[1])? [current[0], current[1] + 1]
                : [current[0], current[1] - 1];
            }
            
            currentMove.push(current);
            if (current[0] === target[0] && current[1] === target[1]){
                targetIndex++;
                if (targetIndex < targets.length) target = points[targets[targetIndex] - 1];
            }
        }
        
        // 구한 경로
        moves.push(currentMove);
    })
    
    // 가장 긴 경로의 길이를 통해, 최대 몇초까지 봐야하는지 계산
    let maxLength = moves[0].length;
    for (let i = 1; i < moves.length; i++){
        if (maxLength < moves[i].length) maxLength = moves[i].length;
    }
    
    // 각 시간마다 겹치는 횟수 세기
    for (let time = 0; time < maxLength; time++){
        let coordMap = new Map(); // map에 겹친 횟수 구함
        for (let robot = 0; robot < moves.length; robot++){
            if (moves[robot].length <= time) continue;
            let coord = moves[robot][time].join(",");
            if (coordMap.has(coord)){
                coordMap.set(coord, coordMap.get(coord) + 1);
            }
            else coordMap.set(coord, 1);
        }
        // map을 탐색하면서, 2회 이상 등장한 부분의 개수를 센다
        coordMap.forEach((val) => {
            if (val > 1) answer++;
        })
    }
    
    return answer;
}