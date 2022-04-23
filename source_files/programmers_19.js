/* 
[1단계] 3진법 뒤집기
(월간 코드 챌린지 시즌1)
*/

function solution(n) {
    var answer = 0;
    // 삼진법으로 바꾼 각 자리수를 거꾸로 저장하는 배열
    var ternaryDigits = [];

    // 삼진법으로 저장
    while (n > 0) {
        // 끝자리에서부터 구하며, 3으로 나눈 나머지를 대입한다
        const remainder = n % 3;
        ternaryDigits.push(remainder);
        // 나머지를 제외해주고, 다음 자리 수를 구하기 위한 예열 과정
        n = (n - remainder) / 3;
    }

    const len = ternaryDigits.length;
    // 현재 digit 배열 자체가 반전된 3진수이므로, 앞자리에서부터 계산해간다
    for (let i = 0; i < len; i++) {
        // 기존에 있던 수들을 3배하여 3의 제곱 구현
        answer *= 3;
        // 현재 자리수 더해주기
        answer += ternaryDigits[i];
    }

    return answer;
}