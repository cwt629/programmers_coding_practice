/* 
[2단계] 과제 진행하기
(연습문제)
*/

class Assignment{
    constructor(name, start, playtime){
        this.name = name;
        this.start = convertStrToMinute(start);
        this.playtime = playtime;
    }
    
    // 다 했는지 판별
    finished(){
        return (this.playtime <= 0);
    }
    
    // 1분 진행하기
    proceed(){
        this.playtime--;
    }
}

function solution(plans) {
    var answer = [];
    let assignments = [];
    
    // 각 과제들 오브젝트 만들기
    plans.forEach(([name, start, playtime]) => {
        assignments.push(new Assignment(name, start, parseInt(playtime)));
    })
    
    // 시작시간이 빠른 순으로 정렬
    assignments.sort((a1, a2) => (a1.start - a2.start));
    
    // 과제 진행하기
    let pointer = 1; // 다음 시작 과제를 가리킴
    let afterStack = [];
    let curAssign = assignments[0];
    let nextStartAssign = assignments[pointer];
    let time = curAssign.start;
    while (answer.length < assignments.length){
        // 과제 마쳤는지 확인
        if (curAssign && curAssign.finished()){
            answer.push(curAssign.name);
            //console.log(curAssign.name + "마침")
            
            // stack에서 할일 꺼내서 진행
            if (afterStack.length > 0){
                curAssign = afterStack.pop();
            }
            else curAssign = null;
        }
        
        // 다음 과제 진행할 수 있는지 확인
        if (nextStartAssign && nextStartAssign.start <= time){
            if (curAssign && !curAssign.finished()) 
                afterStack.push(curAssign);
            curAssign = nextStartAssign;
            nextStartAssign = (pointer < assignments.length)? assignments[++pointer] : null;
        }
        
        // 현재 과제 진행
        //console.log(`${time}분 - ${curAssign?.name}`)
        curAssign?.proceed();
        //console.log("남은 시간:", curAssign?.playtime);
        //console.log(afterStack)
    
        time++;
    }
    
    return answer;
}

// hh:mm 형태가 00:00 기준 몇분째인지 반환하는 함수
function convertStrToMinute(str){
    let [hour, minute] = str.split(":");
    return parseInt(hour) * 60 + parseInt(minute);
}