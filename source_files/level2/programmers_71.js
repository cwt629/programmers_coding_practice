/* 
[2단계] 스킬트리
(Summer/Winter Coding(~2018))
*/

console.log(solution("CBD", ["BACDE", "CBADF", "AECB", "BDA"]));

function solution(skill, skill_trees) {
    var answer = 0;

    // 각 스킬트리에 대해 탐색
    skill_trees.forEach((tree) => {
        // 스킬 순서에서 선행되어야 할 스킬을 가리키는 변수 선언
        let pin = 0; let i;
        for (i = 0; i < tree.length; i++) {
            const index = skill.indexOf(tree.charAt(i))
            // 선행되어야 할 스킬을 배우지 않았다면, 더 이상 진행하지 않음
            if (index > pin) break;

            // 선행되어야 할 스킬을 딱 배운다면, 핀을 옮겨준다
            if (index === pin) pin++;

            // 모든 선행 스킬을 거쳤다면, 더 이상 진행하지 않음
            if (pin === skill.length) break;
        }

        // 모든 선행 스킬을 거쳤거나 특별한 브레이크가 없었다면, 가능한 스킬트리
        if (pin === skill.length || i === tree.length) answer++;
    })

    return answer;
}