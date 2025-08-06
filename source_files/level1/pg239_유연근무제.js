/*
[1단계] 유연근무제
(2025 프로그래머스 코드챌린지 1차 예선)
*/

function solution(schedules, timelogs, startday) {
    var answer = 0;
    
    for (let i = 0; i < schedules.length; i++){
        const deadline = getCommuteDeadline(schedules[i]);
        let isOnTime = true;
        
        for (let day = 0; day < timelogs[i].length; day++){
            // 토요일이나 일요일인 경우 넘긴다
            const currentDay = (day + startday - 1) % 7 + 1;
            if (currentDay >= 6) continue;
            
            // 한번이라도 늦은 경우, 이벤트 당첨 대상이 아니다
            if (timelogs[i][day] > deadline){
                isOnTime = false;
                break;
            }
        }
        
        if (isOnTime) {
            answer++;
        }
    }
    
    return answer;
}

// 출근해야 하는 시각을 구하는 함수
function getCommuteDeadline(wishTime){
    const [wishHour, wishMinute] = [Math.floor(wishTime / 100), wishTime % 100];
    let deadlineHour = wishHour, deadlineMinute = wishMinute + 10;
    if (deadlineMinute >= 60){
        deadlineHour++;
        deadlineMinute %= 60;
    }
    
    return deadlineHour * 100 + deadlineMinute;
}