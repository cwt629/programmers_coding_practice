/* 
[1단계] 핸드폰 번호 가리기
(연습문제)
*/

function solution(phone_number) {
    // 배열 형태에서 요소 수정
    let answer = phone_number.split("");
    for (let i = 0; i < answer.length - 4; i++) {
        answer[i] = "*";
    }
    return answer.join("");
}