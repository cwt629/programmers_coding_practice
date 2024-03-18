/* 
[1단계] 콜라츠 추측
(연습문제)
*/

function solution(num) {
    var answer = 0;
    while (answer <= 500) {
        // 1이 만들어진 경우
        if (num === 1) return answer;

        // 짝/홀수에 따라 작업 수행
        (num % 2 === 0) ? (num /= 2) : (num = num * 3 + 1);
        answer++;
    }

    // 500번 해도 1이 나오지 않은 경우
    return -1;
}