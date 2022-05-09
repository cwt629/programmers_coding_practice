/* 
[2단계] 피로도
(위클리 챌린지)
*/

function solution(k, dungeons) {
    var answer = 0;

    // 인덱스를 던전의 개수만큼 만든다
    const indices = [];
    for (let i = 0; i < dungeons.length; i++) {
        indices.push(i);
    }

    // 모든 던전 순서를 받아온다
    const dungeonOrders = permutation(indices, dungeons.length);

    // 각각 순서대로 하면서 완전탐색
    dungeonOrders.forEach((order) => {
        var remaining = k;
        var done = 0;
        for (let i in order) {
            // 피로도를 소모할 수 있는 경우
            if (dungeons[order[i]][0] <= remaining) {
                remaining -= dungeons[order[i]][1];
                done++;
            }
            // 피로도가 0이 되면 탐색 필요가 없다
            if (remaining === 0) break;
        }

        // 최대값 갱신
        if (done > answer) answer = done;
    })
    return answer;
}

function permutation(arr, number) {
    // 1개짜리는 각각을 배열로 반환
    if (number === 1) return arr.map((element) => [element]);

    // 2개 이상은 재귀적으로 돌림
    const result = [];
    arr.forEach((fixed, index, origin) => {
        // 특정 원소를 뽑고, 나머지 배열
        const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
        // 나머지 배열에 대해서도 순열을 구한다
        var restPerm = permutation(rest, number - 1);
        // 구한 순열을 결과로 반영
        restPerm = restPerm.map((p) => [fixed, ...p]);
        result.push(...restPerm);
    })

    return result;
}