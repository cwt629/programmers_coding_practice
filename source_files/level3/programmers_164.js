/* 
[3단계] 여행경로
(연습문제: 깊이/너비 우선 탐색(DFS/BFS))
*/

function solution(tickets) {
    let answer = [];
    let counts = {};
    tickets.forEach(([from, to]) => {
        if (!counts[from]) counts[from] = {};
        if (!counts[from][to]) counts[from][to] = 0;
        counts[from][to]++; // 중복되는 경우 대비해 카운트로 저장
    })

    // DFS 방식으로 경로 찾기
    const dfs = (start, route, currentCounts) => {
        let newRoute = [...route, start];
        if (newRoute.length === tickets.length + 1) return [newRoute];
        let results = [];

        for (let next in currentCounts[start]) {
            if (currentCounts[start][next] > 0) {
                let nextCounts = copyDict(currentCounts);
                nextCounts[start][next]--;
                results.push(...dfs(next, newRoute, nextCounts));
            }
        }

        return results.filter((route) => (route.length === tickets.length + 1));
    }

    const routes = dfs("ICN", [], counts);

    return getOptimalRoute(routes);
}

// 이중 딕셔너리를 복제하는 함수
function copyDict(dict) {
    let result = {};
    for (let key in dict) {
        result[key] = { ...dict[key] }
    }

    return result;
}

// 여러 루트 중 최적의 루트를 반환하는 함수
function getOptimalRoute(routes) {
    // 루트를 모두 이어서 하나의 문자열로 만듦
    let dict = routes.map((route, i) => ({ index: i, route: JSON.stringify(route) }));

    // 문자열에 대해 사전순 정렬
    dict.sort((a, b) => {
        if (a.route < b.route) return -1;
        if (a.route > b.route) return 1;
        return 0;
    })

    // 맨 앞에 있는 문자열에 해당하는 인덱스로 루트 받아오기
    return routes[dict[0].index];
}