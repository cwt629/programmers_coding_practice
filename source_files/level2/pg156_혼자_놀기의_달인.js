/* 
[2단계] 혼자 놀기의 달인
(연습문제)
*/

function solution(cards) {
    // i+1번째 상자가 열려있는지 여부에 대한 배열
    let opened = Array.from({ length: cards.length }, () => (false));
    // 그룹을 모은 배열
    let groups = [];

    for (let start = 0; start < cards.length; start++) {
        const group = searchGroup(cards, opened, start);
        groups.push(group);
    }

    // 모인 group을 길이에 대해 내림차순 정렬
    groups.sort((g1, g2) => (g2.length - g1.length));

    const answer = groups[0].length * groups[1].length; // 제일 긴 2개의 그룹의 크기를 곱함(빈 배열도 포함될 수 있다!)

    return answer;
}

// 시작점에서부터 그룹을 탐색해 반환하는 함수
function searchGroup(cards, opened, start) {
    let current = start;
    let group = [];

    while (!opened[current]) {
        opened[current] = true;
        group.push(current);

        current = cards[current] - 1; // 인덱스를 다뤄야 하므로 1 빼줌
    }

    return group;
}