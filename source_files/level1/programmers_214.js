/*
[1단계] 달리기 경주
(연습문제)
*/

class Runner {
    constructor(name, rank, front, back){
        this.name = name;
        this.rank = rank;
        this.front = front; // 앞에 있는 선수의 이름
        this.back = back; // 뒤에 있는 선수의 이름
    }
    
    getName(){
        return this.name;
    }
    
    getRank(){
        return this.rank;
    }
    
    getFront(){
        return this.front;
    }
    
    getBack(){
        return this.back;
    }
    
    setFront(name){
        this.front = name;
    }
    
    setBack(name){
        this.back = name;
    }
    
    // 추월하여 등수 오름
    rankUp(){
        this.rank--;
    }
    
    // 추월당해 등수 떨어짐
    rankDown(){
        this.rank++;
    }
}

function solution(players, callings) {
    let answer = Array.from({length: players.length}, () => (""));
    let runners = {};
    
    // 선수들의 정보 저장
    for (let i = 0; i < players.length; i++){
        runners[players[i]] = new Runner(
            players[i], i + 1,
            (i > 0)? players[i - 1] : "",
            (i < players.length - 1)? players[i + 1] : ""
        );
    }
    
    // 추월 정보 저장
    for (let name of callings) {
        // 앞사람의 이름
        let front = runners[name].getFront();
        // 뒷사람의 이름
        let back = runners[name].getBack();
        // 2등 더 앞서 있는 사람의 이름
        let furtherFront = runners[front].getFront();
        
        // 등수 변동
        runners[name].rankUp();
        runners[front].rankDown();
        
        // 앞사람 정보 갱신
        runners[name].setFront(runners[front].getFront());
        runners[front].setFront(name);
        if (back.length > 0) runners[back].setFront(front); // 뒷사람이 있는 경우만 갱신해주자
        
        // 뒷사람 정보 갱신
        runners[name].setBack(front);
        runners[front].setBack(back);
        if (furtherFront.length > 0) runners[furtherFront].setBack(name); // 두단계 앞사람이 있는 경우만 갱신
    }
    
    // 등수 순서대로 배열에 담자
    for (let name in runners){
        let runner = runners[name];
        let index = runner.getRank() - 1; // 순위 - 1이 인덱스가 된다
        
        answer[index] = runner.getName();
    }
    
    return answer;
}