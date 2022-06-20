/* 
[2단계] 이진 변환 반복하기
(월간 코드 챌린지 시즌1)
*/

function solution(s) {
    var answer = [0, 0];

    // 이진변환
    while (s !== "1") {
        // 이진변환 횟수 저장
        answer[0]++;
        // s의 모든 0을 제거한 길이 저장
        const removedResult = removeZeros(s);
        // 제거한 0의 개수 저장
        answer[1] += (s.length - removedResult);
        // 구한 길이를 2진법으로 표현한 문자열로 바꾼다
        s = removedResult.toString(2);
    }
    return answer;
}

// s의 모든 0을 제거했을 때, 그 길이를 반환하는 함수
function removeZeros(s) {
    return s.split("").filter((num) => (num !== "0")).length;
}