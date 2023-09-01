/* 
[1단계] 공원 산책
(연습문제)
*/

function solution(park, routes) {
    let current = [0, 0]; // 로봇 강아지의 현위치
    // 현위치 찾기
    for (let i = 0; i < park.length; i++){
        let idx = park[i].indexOf("S")
        if (idx >= 0){
            current = [i, idx];
            break;
        }
    }
    
    routes.forEach((command) => {
        // 도착 예상 지점
        let nextPoint = getArrivalPoint(current, command);
        // 1. 공원을 벗어나는지 확인
        if (!isInsidePark(nextPoint, park)) return;
        // 2. 장애물을 만나는지 확인
        if (facesObstacle(current, command, park)) return;
        
        // 확인 시 이동시켜줌
        current = nextPoint;
    })
    
    return current;
}

// 명령대로 이동 시 도착하게 되는 지점의 좌표를 반환하는 함수
function getArrivalPoint(current, command){
    // 방향과 이동칸수를 받아온다
    let [dir, len] = command.split(" ");
    len = parseInt(len);
    
    switch(dir){
        case "W":
            return [current[0], current[1] - len];
            
        case "E":
            return [current[0], current[1] + len];
            
        case "N":
            return [current[0] - len, current[1]];
            
        case "S":
            return [current[0] + len, current[1]];
    }
}

// 특정 위치가 park 안에 있는지 확인하는 함수
function isInsidePark(position, park){
    return (position[0] >= 0 && position[0] < park.length && position[1] >= 0 && position[1] < park[0].length);
}

// 특정 위치에서 명령대로 이동 시 장애물을 만나는지 여부를 반환하는 함수(이동 시 park 안에 있다는 전제)
function facesObstacle(position, command, park){
    // 방향과 이동칸수를 받아온다
    let [dir, len] = command.split(" ");
    len = parseInt(len);
    let current = [...position];
    
    // 계속 이동해본다
    for (let i = 0; i < len; i++){
        switch(dir){
            case "W":
                current[1]--;
                break;
                
            case "E":
                current[1]++;
                break;
                
            case "N":
                current[0]--;
                break;
                
            case "S":
                current[0]++;
                break;
        }
        // 장애물 여부 확인
        if (park[current[0]].charAt(current[1]) === "X") return true;
    }
    
    return false;
}