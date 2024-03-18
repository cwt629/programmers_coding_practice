/* 
[2단계] 배달
(Summer/Winter Coding(~2018))
*/

class Village {
    constructor(num) {
        this.number = num + 1;
        // 1번 마을로부터의 최단 거리(dijkstra 알고리즘을 위해 초기값을 크게 잡음)
        this.minDistance = Infinity;
        // dijkstra 알고리즘을 위해 필요한 방문 여부
        this.searched = false;
    }
}

function solution(N, road, K) {
    var answer = 0;
    const villages = [];
    // 초기 모든 노드 생성
    for (let i = 0; i < N; i++) {
        villages[i] = new Village(i);
    }
    // 1번 마을에 대한 설정
    villages[0].minDistance = 0;
    villages[0].searched = true;

    // 도로들에 대한 배열 생성
    var betweenVillages = [];
    for (let i = 0; i < N; i++) {
        betweenVillages[i] = [];
        for (let j = 0; j < N; j++) {
            if (i === j)
                betweenVillages[i][j] = 0;
            else betweenVillages[i][j] = Infinity;
        }
    }

    // 배열에 도로들 정보 저장
    road.forEach((r) => {
        if (betweenVillages[r[0] - 1][r[1] - 1] > r[2]) {
            betweenVillages[r[0] - 1][r[1] - 1] = r[2];
            betweenVillages[r[1] - 1][r[0] - 1] = r[2];
        }
    })

    // 밀접해있는 마을들부터 거리 갱신
    for (let i = 1; i < N; i++) {
        if (betweenVillages[0][i] < villages[i].minDistance)
            villages[i].minDistance = betweenVillages[0][i];
    }

    // dijkstra 알고리즘 구현
    for (let count = 0; count < N - 2; count++) {
        const current = nextVillage(villages, N);
        villages[current].searched = true;
        // 해당 마을을 거쳐서 가는 것과, 저장되어있던 경로를 비교
        for (let v = 0; v < N; v++) {
            if (!villages[v].searched) {
                if (villages[current].minDistance + betweenVillages[current][v]
                    < villages[v].minDistance)
                    villages[v].minDistance = villages[current].minDistance + betweenVillages[current][v];
            }
        }
    }

    // 모든 마을의 최단거리를 구한뒤, K와 비교하기
    answer = villages.filter((v) => (v.minDistance <= K)).length;

    return answer;
}

// 방문하지 않은 마을들 중 최단거리가 가장 짧은 마을의 인덱스를 반환하는 함수
function nextVillage(villages, N) {
    var result = 0;
    var min = Infinity;
    for (let i = 1; i < N; i++) {
        if (!villages[i].searched && villages[i].minDistance < min) {
            min = villages[i].minDistance;
            result = i;
        }
    }

    return result;
}