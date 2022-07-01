/* 
[2단계] 최솟값 만들기
(연습문제)
*/

function solution(A, B) {
    var answer = 0;

    // A는 오름차순, B는 내림차순으로 정렬
    A.sort((a, b) => (a - b));
    B.sort((a, b) => (b - a));

    // 큰 숫자 * 작은 숫자를 계산하여 더한다
    for (let i = 0; i < A.length; i++)
        answer += A[i] * B[i];

    return answer;
}