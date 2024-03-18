/* 
[1단계] 자연수 뒤집어 배열로 만들기
(연습문제)
*/

function solution(n) {
    /* 
    1. n을 문자열로 바꾼 뒤, 문자 하나하나씩 쪼갬
    2. 순서를 뒤바꿈(reverse)
    3. 이 때 요소들은 string 타입이므로, 정수로 바꿔줌
    */
    return n.toString().split("").reverse().map((word) => (parseInt(word)));
}