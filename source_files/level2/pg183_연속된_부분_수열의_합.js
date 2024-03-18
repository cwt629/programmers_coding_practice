/* 
[2단계] 연속된 부분 수열의 합
(연습문제)
*/

function solution(sequence, k) {
    let answer = [-1, -1];
    let start = 0, end = 0;

    // 슬라이딩 윈도우 방식으로 탐색
    let partialSum = sequence[0];
    while (start < sequence.length) {
        // 부분합 확인
        if (partialSum === k)
            answer = updateSequence([start, end], answer);

        // 부분합이 k 이상인 경우
        if (partialSum >= k) {
            partialSum -= sequence[start];
            start++;
        }
        // 부분합이 k 미만인 경우
        else {
            // 늘릴 수 있다면 end를 늘리고, 안된다면 start를 늘린다
            if (end < sequence.length - 1) {
                end++;
                partialSum += sequence[end];
            }
            else {
                partialSum -= sequence[start];
                start++;
            }
        }
    }

    return answer;
}

// 구해진 수열과 기존 부분 수열을 비교해 정답 수열을 이끌어내는 함수
function updateSequence([earnedStart, earnedEnd], [originStart, originEnd]) {
    // 기존이 비어있는 경우
    if (originStart === -1) return [earnedStart, earnedEnd];

    const earnedLength = earnedEnd - earnedStart + 1;
    const originLength = originEnd - originStart + 1;
    // 더 짧은 수열
    if (earnedLength < originLength) return [earnedStart, earnedEnd];

    // 길이가 같다면 start가 더 짧은 쪽
    if (earnedLength === originLength)
        return (earnedStart < originStart) ? [earnedStart, earnedEnd] : [originStart, originEnd];

    // 길이가 더 길다면 기존 그대로
    return [originStart, originEnd];
}