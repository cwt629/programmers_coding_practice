/* 
[1단계] 추억 점수
(연습문제)
*/

function solution(name, yearning, photo) {
    // 각 사람의 추억 점수를 담는 자료구조로 맵 사용
    let missingScore = new Map();
    for (let i = 0; i < name.length; i++) {
        missingScore.set(name[i], yearning[i]);
    }

    // 정답 계산
    let answer = photo.map((people) => {
        return people.reduce((acc, cur) => {
            // 맵에 존재하는 점수들만 더해줌
            if (missingScore.has(cur)) acc += missingScore.get(cur);
            return acc;
        }, 0)
    });

    return answer;
}