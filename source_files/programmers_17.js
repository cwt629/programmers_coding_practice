/* 
[1단계] 체육복
(연습: 탐욕법(Greedy))
*/

function solution(n, lost, reserve) {
    var answer = 0;

    // lost와 reserve에 동시에 있다면, 그냥 한 벌 있는 것이므로 각 배열에서 제거해준다
    for (var i = 1; i <= n; i++) {
        if (lost.includes(i) && reserve.includes(i)) {
            lost.splice(lost.indexOf(i), 1);
            reserve.splice(reserve.indexOf(i), 1);
        }
    }

    for (var i = 1; i <= n; i++) {
        // lost에 있지 않다면 수업을 들을 수 있다
        if (!lost.includes(i)) {
            answer++;
        }
        else {
            // 앞번호가 reserve에 있는 경우(단, 1번 학생 제외)
            if (i > 1 && reserve.includes(i - 1)) {
                // 앞번호 학생이 빌려주므로, 이제 여분이 없음
                reserve.splice(reserve.indexOf(i - 1), 1);
                // 이제 이 학생도 수업을 들을 수 있다
                answer++;
            }
            // 뒷번호가 reserve에 있는 경우(단, 마지막 학생 제외)
            else if (i < n && reserve.includes(i + 1)) {
                // 뒷번호 학생이 빌려주므로, 이제 여분이 없음
                reserve.splice(reserve.indexOf(i + 1), 1);
                // 이제 이 학생도 수업을 들을 수 있다
                answer++;
            }
        }
    }
    return answer;
}