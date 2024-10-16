/*
[1단계] 동영상 재생기 
(PCCP 기출문제)
*/

function solution(video_len, pos, op_start, op_end, commands) {
    let lenSecond = clockToSecond(video_len);
    let openingStart = clockToSecond(op_start), openingEnd = clockToSecond(op_end);
    let current = clockToSecond(pos);
    // 시작할 때, 오프닝에 있다면 스킵
    if (current >= openingStart && current < openingEnd)
        current = openingEnd;
    
    // 각 command 실행
    commands.forEach((command) => {
        switch(command){
            case "prev":
                current = (current >= 10)? current - 10 : 0;
                break;
                
            case "next":
                current = (current <= lenSecond - 10)? current + 10 : lenSecond;
                break;
        }
        
        // 이동 후, 오프닝에 속해 있는지 확인
        if (current >= openingStart && current < openingEnd)
            current = openingEnd;
    })
    
    return secondToClock(current);
}

function clockToSecond(clock){
    let [minute, sec] = clock.split(":").map((ele) => (parseInt(ele)));
    return minute * 60 + sec;
}

function secondToClock(second){
    let sec = (second % 60).toString();
    if (sec.length < 2) sec = '0' + sec;
    let minute = (Math.floor(second / 60)).toString();
    if (minute.length < 2) minute = '0' + minute;
    
    return `${minute}:${sec}`;
}