/* 
[3단계] [카카오 인턴] 보석 쇼핑
(2020 카카오 인턴십)
*/

// 3rd try: map을 이용한 투포인터 알고리즘

function solution(gems) {
    var answer = [1, gems.length];
    // 필요한 보석의 종류 수
    const gemTypes = new Set(gems).size;
    // 중간 과정에서의 보석 카운터
    var currentGems = new Map();
    
    // 투포인터 알고리즘으로 탐색 준비
    var start = 0, end = 0;
    // 시작점
    currentGems.set(gems[0], 1);
    
    // 유의미한 곳까지 탐색 시작
    while (start <= gems.length - gemTypes){
        // 현재 상태에 모든 보석이 모인 경우
        if (currentGems.size === gemTypes){
            // 정답 갱신(실제 진열대 번호는 인덱스 + 1)
            if (end - start < answer[1] - answer[0])
                answer = [start + 1, end + 1];
            
            // start를 뒤로 당긴다
            currentGems.set(gems[start], currentGems.get(gems[start]) - 1);
            // 빠진 보석과 같은 보석이 없는 경우, key에서 제거
            if (currentGems.get(gems[start]) === 0)
                currentGems.delete(gems[start]);
            start++;
        }
        // end가 이미 끝에 있는 경우
        else if (end === gems.length - 1){
            // start를 뒤로 당긴다
            currentGems.set(gems[start], currentGems.get(gems[start]) - 1);
            // 빠진 보석과 같은 보석이 없는 경우, key에서 제거
            if (currentGems.get(gems[start]) === 0)
                currentGems.delete(gems[start]);
            start++;
        }
        // 그 외에는, end를 뒤로 당긴다
        else{
            end++;
            // 기존에 있던 보석인 경우
            if (currentGems.has(gems[end]))
                currentGems.set(gems[end], currentGems.get(gems[end]) + 1);
            // 기존에 없던 보석인 경우
            else currentGems.set(gems[end], 1);
        }
    }
    
    return answer;
}



// -----------------------------------------------------------------------------------------
// 1st try: BFS 탐색(정확도는 만점이나, 당연하게도 효율성은 모두 시간 초과)

// function solution(gems) { 
//     // 총 몇가지 종류의 보석이 있는지 판별하기
//     const gemKinds = [];
//     gems.forEach((gem) => {
//         if (!gemKinds.includes(gem)) gemKinds.push(gem);
//     })
    
//     // 1st try: BFS 탐색
//     const bfsQueue = [];
//     // 시작점 넣어주기(보석 종류만큼)
//     for (let i = 0; i <= gems.length - gemKinds.length; i++){
//         // 성분: [넣은 보석들의 배열, 시작 인덱스, 탐색한 마지막 인덱스]
//         var temp = [[], i, i + gemKinds.length - 1];
//         // 종류만큼 넣어주기
//         for (let j = i; j < i + gemKinds.length; j++){
//             if (!temp[0].includes(gems[j])){
//                 temp[0].push(gems[j]);
//             }
//         }
//         // 구한 배열이 바로 답이 나오면, 바로 반환(실제 진열대 번호는 인덱스 + 1)
//         if (temp[0].length === gemKinds.length)
//             return [temp[1] + 1, temp[2] + 1];
        
//         // 구한 배열을 큐에 저장(단, 이미 끝까지 탐색했다면 넣을 필요 없음)
//         if (temp[2] < gems.length - 1){
//             bfsQueue.push(temp);
//         }
//     }
    
//     // BFS 방식 탐색 시작
//     while (bfsQueue.length > 0){
//         // 탐색할 부분 가져오기(성분: 넣었던 보석들, 탐색 시작 인덱스, 마지막 탐색 인덱스)
//         var current = bfsQueue.shift();
//         // 다음 보석 탐색
//         if (!current[0].includes(gems[current[2] + 1])){
//             current[0].push(gems[current[2] + 1]);
//             // 새로 구한 경우가 정답인 경우
//             if (current[0].length === gemKinds.length)
//                 return [current[1] + 1, current[2] + 2];
//         }
//         // 마지막 탐색 인덱스 갱신
//         current[2]++;
//         // 탐색 완료 후 다시 큐에 집어넣어주기(더 탐색할 것이 있다면)
//         if (current[2] < gems.length - 1)
//             bfsQueue.push(current);
//     }
// }

// -----------------------------------------------------------------------------------------
// 2nd try: 투포인터 알고리즘, 초기에만 카운터 완전탐색 하고, 처음으로 다 모인 뒤부터는 카운터만 탐색(11/15 시간 초과)

// function solution(gems) {
//     var answer = [1, gems.length];
//     // 총 몇가지 종류의 보석이 있는지 판별하기
//     var counters = {}, haveAll = false;
//     var collectionInitiated = false; // 모든 보석을 처음으로 다 모은 적이 있는지 여부
//     gems.forEach((gem) => {
//         if (!(gem in counters)) counters[gem] = 0;
//     })
    
//     // 투포인터 알고리즘을 이용해, 앞에서부터 하나씩 세가며 구간을 갱신해간다
//     var start = 0, end = Object.keys(counters).length - 1;
//     // 초기 카운터 상태
//     for (let i = start; i <= end; i++)
//         counters[gems[i]]++;
//     // 초기 카운터 상태를 이용해 다 모았는지 초기화
//     if (allCollected(counters)){
//         // 이 이상 짧은 구간 및 진열대 번호가 작은 구간이 없으므로, 해당 구간 반환
//         return [start + 1, end + 1];
//     }

//     // 유의미한 곳까지 모두 탐색
//     while (start <= gems.length - Object.keys(counters).length){
//         // 이미 모든 보석이 나온 경우
//         if (haveAll){
//             // 정답 갱신(실제 진열대 번호는 인덱스 + 1)
//             if (end - start < answer[1] - answer[0])
//                 answer = [start + 1, end + 1];
//             // start를 당겨서, 해당 보석을 포함하지 않음
//             counters[gems[start]]--;
//             // 이 경우 카운터가 0이 되면, haveAll 변수를 false로 설정한다
//             if (counters[gems[start]] === 0) haveAll = false;
//             start++;
//         }
//         // end가 이미 끝에 있는 경우, start를 당긴다
//         else if (end === gems.length - 1){
//             counters[gems[start]]--;
//             if (counters[gems[start]] === 0) haveAll = false;
//             start++;
//         }
//         // 그 외의 경우, end를 늘리고 해당 보석을 포함시킨다
//         else{
//             end++;
//             counters[gems[end]]++;
//             // allCollected 함수를 호출해야 한다면 호출, 그렇지 않다면 해당 카운터만 고려
//             if (collectionInitiated){
//                 // 원래 0이었다가 1인 경우, 다시 모두 모은 것이 된다
//                 if (counters[gems[end]] === 1) haveAll = true;
//             }
//             else {
//                 haveAll = allCollected(counters);
//                 // true가 된 경우
//                 if (haveAll) collectionInitiated = true;
//             }
//         }
//     }
    
//     return answer;
// }

// // 카운터를 기반으로, 모든 보석이 세어졌는지 반환하는 함수
// function allCollected(counters){
//     for (gem in counters){
//         // 0개인 것이 하나라도 있으면 false
//         if (counters[gem] === 0) return false;
//     }
//     // 모두 1개 이상이라면 true
//     return true;
// }