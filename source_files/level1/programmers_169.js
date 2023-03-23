/* 
[1단계] 카드 뭉치
(연습문제)
*/

function solution(cards1, cards2, goal) {
    let index1 = 0, index2 = 0; // 각 카드 뭉치의 현재 카드를 가리키는 인덱스

    for (let word of goal) {
        // 첫째 뭉치 확인
        if (index1 < cards1.length && cards1[index1] === word) {
            index1++;
            continue;
        }
        // 둘째 뭉치 확인
        if (index2 < cards2.length && cards2[index2] === word) {
            index2++;
            continue;
        }

        // 어느 뭉치에도 없는 경우
        return "No";
    }

    // goal 만들기 성공
    return "Yes";
}