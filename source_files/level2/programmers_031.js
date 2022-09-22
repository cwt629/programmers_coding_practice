/* 
[2단계] 타겟 넘버
(연습: 깊이/너비 우선 탐색(DFS/BFS))
*/

const numbers = [4, 1, 2, 1];
console.log(solution(numbers, 4));

function solution(numbers, target) {
    var answer = 0;
    const len = numbers.length;

    // dfs 함수
    function dfs(current, level) {
        // 마지막까지 다다른 경우, 타겟과 비교
        if (level === len - 1) {
            if (current === target)
                answer++;
        }
        // 더 진행해야 하는 경우, 더하거나 빼서 recursive 진행
        else {
            // 더하고, dfs 실행
            var temp = current + numbers[level + 1];
            dfs(temp, level + 1);
            // 빼고, dfs 실행
            temp = current - numbers[level + 1];
            dfs(temp, level + 1);
        }
    }

    // dfs 돌려서 결과 구하기
    dfs(0, -1);

    return answer;
}