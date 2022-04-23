/* 
[2단계] 오픈채팅방
(2019 KAKAO BLIND RECRUITMENT)
*/

// const record = ["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"];
// console.log(solution(record));

function solution(record) {
    var answer = [];
    // 각 유저의 아이디를 key로, 닉네임을 value로 가지는 딕셔너리 생성
    var nicknames = {};

    // 닉네임 설정을 먼저 한다
    record.forEach(function (query) {
        // 스페이스바로 구분한 명령어, 아이디(, 닉네임) 받아오기
        const recList = query.split(" ");

        // Enter가 들어온 경우
        if (recList[0] === "Enter") {
            // 닉네임을 바꾸고 들어온 경우에 대비하여, 매번 바꿔준다    
            nicknames[recList[1]] = recList[2];
        }
        // Change가 들어온 경우
        else if (recList[0] === "Change") {
            // 해당 아이디에 대응하는 닉네임 변경
            nicknames[recList[1]] = recList[2];
        }
    })

    // 각 레코드를 결과로 출력한다(Change 제외)
    record.forEach(function (query) {
        const recList = query.split(" ");

        // Enter가 들어온 경우
        if (recList[0] === "Enter") {
            answer.push(`${nicknames[recList[1]]}님이 들어왔습니다.`);
        }
        // Leave가 들어온 경우
        else if (recList[0] === "Leave") {
            answer.push(`${nicknames[recList[1]]}님이 나갔습니다.`);
        }
    })

    return answer;
}