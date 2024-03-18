/* 
[1단계] 부족한 금액 계산하기
(위클리 챌린지)
*/

console.log(solution(3, 20, 4));

function solution(price, money, count) {
    var answer = 0;

    // count번째까지 값 계산
    var total = 0;
    for (let i = 1; i <= count; i++)
        total += price * i;

    // 정답 계산
    answer = (total > money) ? (total - money) : 0;

    return answer;
}