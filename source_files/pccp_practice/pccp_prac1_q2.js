/*
[PCCP 모의고사1 > 1회 모의고사 2번]
2번 - 체육대회
*/

function solution(ability) {
    let answer = -1;
    
    let occupied = Array.from({length: ability.length}, () => (false)) // 각 선수가 이미 뽑혔는지를 나타내는 배열
    
    // DFS방식으로 모든 케이스를 완전 탐색
    function dfs(acc, step){
        if (step >= ability[0].length){
            // 정답 갱신
            if (answer < acc) answer = acc;
            return;
        }
        for (let i = 0; i < ability.length; i++){
            // 해당 선수가 아직 배정되지 않은 경우
            if (!occupied[i]){
                occupied[i] = true;
                dfs(acc + ability[i][step], step + 1);
                occupied[i] = false;
            }
        }
    }
    
    dfs(0, 0);
    return answer;
}