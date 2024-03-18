/* 
[1단계] 제일 작은 수 제거하기
(연습문제)
*/

function solution(arr) {
    // 리턴하려는 배열이 빈 배열인 경우
    if (arr.length === 1) return [-1];

    let answer = [...arr];
    let minIndex = 0, minValue = arr[0];

    for (let i = 1; i < answer.length; i++) {
        // 최소값 갱신
        if (minValue > arr[i]) {
            minValue = arr[i];
            minIndex = i;
        }
    }

    // 찾은 인덱스를 제외한다
    answer.splice(minIndex, 1);
    return answer;
}