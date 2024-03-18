/* 
[3단계] 합승 택시 요금
(2021 KAKAO BLIND RECRUITMENT)
*/

function solution(n, s, a, b, fares) {
    // 각 지점 사이의 최단거리를 저장하는 이차원 배열
    let minDistances = [];
    for (let i = 1; i <= n; i++) {
        minDistances[i] = [];
        for (let j = 1; j <= n; j++) {
            if (i === j) minDistances[i][j] = 0; // 자기 자신으로의 거리
            else minDistances[i][j] = Infinity;
        }
    }

    // fares 데이터 저장
    fares.forEach(([c, d, fare]) => {
        minDistances[c][d] = fare;
        minDistances[d][c] = fare;
    })

    // Floyd-Warshall 알고리즘을 이용해 각 지점 사이의 최저 택시 요금 계산
    // 특이점: k를 거쳐가는 점으로 했을 때는 실패가 많이 떴는데, i를 거쳐가는 점으로 했을 때 정답이 되었다.
    // => 거쳐가는 점 자체를 고정한 상태로 모든 지점을 순회해야 한다!
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= n; j++) {
            for (let k = 1; k <= n; k++) {
                if (minDistances[j][i] + minDistances[i][k] < minDistances[j][k]) {
                    minDistances[j][k] = minDistances[j][i] + minDistances[i][k];
                    minDistances[k][j] = minDistances[j][k];
                }
            }
        }
    }

    // 합승하다가 헤어지는 지점을 정했을 때 최저 택시요금을 계산한다
    let minResult = Infinity;
    for (let mid = 1; mid <= n; mid++) {
        if (minDistances[s][mid] + minDistances[mid][a] + minDistances[mid][b] < minResult)
            minResult = minDistances[s][mid] + minDistances[mid][a] + minDistances[mid][b];
    }

    return minResult;
}