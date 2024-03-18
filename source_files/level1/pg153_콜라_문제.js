/* 
[1단계] 콜라 문제
(연습문제)
*/

function solution(a, b, n) {
    let answer = 0;

    // 빈 병을 계속 갱신해간다
    while (n >= a) {
        let newCoke = Math.floor(n / a) * b; // 받을 병 수
        n = n % a + newCoke; // 다 주고 남은 병 + 새로 받은 콜라병
        answer += newCoke; // 정답 갱신
    }

    return answer;
}