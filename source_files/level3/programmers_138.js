/* 
[3단계] 숫자 게임
(Summer/Winter Coding(~2018))
*/

function solution(A, B) {
    let answer = 0;

    // 두 배열을 모두 크기에 대해 내림차순 정렬
    A.sort((a, b) => (b - a));
    B.sort((a, b) => (b - a));

    let index = 0;
    // 가장 큰 수부터, 이길 수 있는 최대 숫자와 매칭
    let currentMember = 0;
    while (index < A.length) {
        // 이길 수 있는 최대 숫자 찾기
        while (index < A.length && A[index] >= B[currentMember]) index++;

        // 더 이상 이길 수 없는 경우
        if (index === A.length) break;

        // 해당 인덱스의 선수와 매칭하여 승점을 얻는다
        answer++;
        index++; currentMember++;
    }

    return answer;
}