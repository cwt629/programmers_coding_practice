/* 
[1단계] 숫자 문자열과 영단어
(2021 카카오 채용연계형 인턴십)
*/

function solution(s) {
    var answer = 0;
    var temp = new String();
    const numCases = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    const len = s.length;

    // s 탐색
    for (var i = 0; i < len; i++) {
        let currentChar = s.charAt(i);
        // 숫자인 경우
        if (currentChar >= '0' && currentChar <= '9') {
            // 기존 수의 오른쪽에 해당 숫자를 붙여준다
            answer = answer * 10 + parseInt(currentChar);
        }
        // 문자인 경우
        else {
            // 현재까지 읽은 문자 저장
            temp = temp.concat(currentChar);
            // 현재까지 읽은 문자가 어느 숫자를 표시하는 경우
            if (numCases.includes(temp)) {
                // 그 문자가 나타내는 숫자, 즉 그 인덱스를 기존 수의 오른쪽에 붙여준다
                answer = answer * 10 + numCases.indexOf(temp);
                // temp를 초기화해준다
                temp = "";
            }
        }
    }

    return answer;
}