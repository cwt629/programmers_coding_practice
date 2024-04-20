/*
[1단계] 문자열 나누기
(연습문제)
*/

function solution(s) {
    var answer = 0;
    let firstCount = 0, otherCount = 0;
    let ptr = 0;

    while (ptr < s.length) {
        let firstWord = s.charAt(ptr);
        firstCount++;
        ptr++;

        // 두 횟수가 같아질 때까지 반복한다
        while (ptr < s.length) {
            // 횟수 증가
            (s.charAt(ptr) === firstWord) ?
                firstCount++ : otherCount++;
            ptr++;
            if (firstCount === otherCount) {
                answer++;
                firstCount = 0;
                otherCount = 0;
                break;
            }
        }
    }

    // 남은 게 있는지 파악: firstCount 활용
    return answer + ((firstCount > 0) ? 1 : 0);
}