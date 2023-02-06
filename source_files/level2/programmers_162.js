/* 
[2단계] 연속 부분 수열 합의 개수
(연습문제)
*/

function solution(elements) {
    let sums = [];
    let accSum = 0; // 부분합 이용

    let end = 0;
    while (end < elements.length) {
        // 시작부분이나, 확장된 end 부분을 더해주고 시작
        accSum += elements[end];

        for (let start = 0; start < elements.length; start++) {
            sums.push(accSum); // 결과 저장
            end = (end + 1) % elements.length; // 다음 위치로 이동
            accSum -= elements[start];
            accSum += elements[end];
        }

        // end는 원위치로 돌아오게 되는데, 이제 구간을 더 늘려야 하므로 end 하나 늘려줌
        end++;
    }

    const answer = new Set(sums).size;
    return answer;
}