/* 
[3단계] 단어 변환
(연습문제: 깊이/너비 우선 탐색(DFS/BFS))
*/

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]), solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"]));

function solution(begin, target, words) {
    var answer = 0;
    var done = false;
    // 타겟이 words에 없는 경우는 절대 변환할 수 없다
    if (!words.includes(target)) return 0;

    // BFS 방식으로 탐색(성분: 단어, 탐색해온 횟수)
    const bfsQueue = [[begin, 0]];
    // 이미 지나온 단어 저장
    const visited = [begin];

    // BFS 탐색 시작
    while (bfsQueue.length > 0) {
        // 현재 단어 받아오기
        const [from, level] = bfsQueue.shift();

        // 현재 단어에서 변환될 수 있는 단어 저장
        for (let i = 0; i < words.length; i++) {
            // 변환 가능하고, 아직 지나오지 않은 단어(지나온 단어는 더 빠른 경우가 있으므로 패스)
            if (convertible(from, words[i]) && !visited.includes(words[i])) {
                // 타겟에 도착한 경우, 해당 레벨 저장해주고 브레이크
                if (words[i] === target) {
                    answer = level + 1;
                    done = true;
                    break;
                }
                // 타겟이 아닌 경우 계속해서 저장
                bfsQueue.push([words[i], level + 1]);
                visited.push(words[i]);
            }
        }
        // 탐색 완료한 경우
        if (done) break;
    }

    return answer;
}

// 첫번째 인자 단어에서 두번째 인자 단어로 변환이 가능한지 여부를 반환하는 함수
function convertible(from, to) {
    // 아예 똑같은 단어로는 변환할 필요가 없음
    if (from === to) return false;
    // 다른 글자의 개수
    let different = 0;
    // 글자 탐색
    for (let i = 0; i < from.length; i++) {
        // 서로 다른 글자가 있는 경우
        if (from.charAt(i) !== to.charAt(i)) {
            // 이미 다른 횟수가 1회인 상태였으면, 변환 불가능
            if (different === 1) return false;
            // 처음으로 다른 경우는 카운트
            different++;
        }
    }
    // 다른 횟수가 1회인 경우만 남으므로, 이 때는 true 반환
    return true;
}