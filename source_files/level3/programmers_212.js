/* 
[3단계] 외벽 점검
(2020 KAKAO BLIND RECRUITMENT)
*/

/*
아직 해결하지 못했음.
학원에서라도 따로 해결해보자.
*/


// 1st try: BFS (시간 초과 및 core dumped(메모리 초과 예상))
function solution(n, weak, dist) {
    let charged = Array.from({length: n}, () => (false));
    // 약한 외벽 정보를 배열로 재정리
    let weakData = Array.from({length: n}, () => (false));
   
    for (let weakIndex of weak){
        weakData[weakIndex] = true;
    }
    
    // 가장 긴 길이를 커버 가능한 친구부터 greedy하게 배치하기 위해, 내림차순 정렬
    dist.sort((a, b) => (b - a));
    
    // 예외: 한명이라도 리치가 모든 구간을 커버 가능하면 그냥 이 한명으로 다 됨
    if (dist[0] >= n - 1) return 1;
    
    // 각 단계마다 greedy하게 움직이는 BFS Algorithm
    let bfsQueue = [{charged: charged, count: 0}];
    
    while (bfsQueue.length > 0){
        let data = bfsQueue.shift();
        
        // 현재 reach를 가지는 친구의 최적 시작 인덱스 받아오기
        let optimalStarts = getOptimalStarts(n, dist[data.count], data.charged, weakData);
        
        // 각 시작 인덱스에서부터 점검 시작
        for (let start of optimalStarts){
            let chargedCopy = [...data.charged];
            for (let i = start; i <= start + dist[data.count]; i++){
                chargedCopy[i % n] = true;
            }
            
            // 여기서 모든 취약 지점이 모두 점검된다면, 바로 정답 반환
            if (allSafe(chargedCopy, weakData)) return data.count + 1;
            
            // 해당 데이터 저장
            if (data.count + 1 < dist.length)
                bfsQueue.push({charged: chargedCopy, count: data.count + 1});
        }
    }
    
    return -1;
}

// 모든 외벽이 안전한지 판단하는 함수
function allSafe(charged, weakData){
    for (let i = 0; i < charged.length; i++){
        if (!charged[i] && weakData[i]) return false;
    }
    
    return true;
}

// 최대한을 커버할 수 있는 시작 구간들을 반환하는 함수
function getOptimalStarts(n, reach, charged, weakData){
    let chargedArr = [...charged, ...charged];
    let weakArr = [...weakData, ...weakData];
    let counts = Array.from({length: n}, () => (0));
    
    // 시작
    for (let i = 0; i <= reach && i < n; i++){
        if (weakArr[i] && !chargedArr[i]) counts[0]++;
    }
    
    // 각 시작구간에서 리치만큼의 구간동안 몇개의 취약점이 있는지 확인(sliding window)
    for (let i = 1; i < n; i++){
        counts[i] = counts[i - 1];
        if (weakArr[i - 1] && !chargedArr[i - 1]) counts[i]--;
        if (weakArr[i + reach] && !chargedArr[i + reach]) counts[i]++;
    }
    
    // 탐색이 필요한 시작 구간들 반환
    let results = [];
    counts.forEach((count, index) => {
        if (count > 0)
            results.push(index);
    })
    
    return results;
}