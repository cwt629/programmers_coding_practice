/* 
[1단계] 가장 가까운 같은 글자
(연습문제)
*/

function solution(s) {
    var answer = [];
    for (let i = 0; i < s.length; i++){
        // 현 인덱스의 앞자리부터 역순으로 문자 비교
        let count = 1;
        let checking;
        for (checking = i - 1; checking >= 0; checking--){
            if (s.charAt(i) == s.charAt(checking)){
                break;
            }
            count++;
        }
        if (checking == -1) answer.push(-1);
        else answer.push(count);
    }
    return answer;
}