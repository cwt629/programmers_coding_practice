/* 
[2단계] n^2 배열 자르기
(월간 코드 챌린지 시즌3)
*/

function solution(n, left, right) {
    var answer = [];

    // Idea: 각 성분이 이차원 배열 상에서는 어느 인덱스에 있는지 체크하고, 이를 이용해 무슨 수가 들어갈지 유추한다
    for (let i = left; i <= right; i++) {
        // 주어진 일차원 인덱스를 이차원 배열 상에서의 이차원 인덱스로 치환
        const [row, col] = [Math.floor(i / n), i % n];
        // col값이 row값 이하일 때까지는 row + 1, 그 뒤부터는 col + 1이 들어간다!
        answer.push((col <= row) ? (row + 1) : (col + 1));
    }

    return answer;
}