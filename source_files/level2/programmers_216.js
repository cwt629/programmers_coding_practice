/*
[2단계] 두 원 사이의 정수 쌍
(연습문제)
*/

function solution(r1, r2) {
    let answer = 0;
    // 1. y > 0 부분의 점 개수 세기
    for (let x = -r2; x <= r2; x++) {
        let outerYBound = Math.floor(Math.sqrt(r2 ** 2 - x ** 2));
        let innerYBound = (Math.abs(x) < r1) ? Math.ceil(Math.sqrt(r1 ** 2 - x ** 2)) : 1;

        // inner부터 outer까지, 경계를 포함하여 개수를 센다
        answer += (outerYBound - innerYBound) + 1;
    }

    // 2. 상하 대칭이므로 개수 * 2시키기
    answer *= 2;

    // 3. x축상의 점 개수 세기
    answer += 2 * (r2 - r1 + 1);

    return answer;
}