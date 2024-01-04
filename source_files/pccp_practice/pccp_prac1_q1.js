/*
[PCCP 모의고사1 > 1회 모의고사 1번]
1번 - 외톨이 알파벳
*/

function solution(input_string) {
    let countMap = new Map(); // 각 알파벳과 등장횟수를 저장할 맵
    let loners = [];
    
    for (let i = 0; i < input_string.length; i++){
        let alphabet = input_string.charAt(i);
        updateAlphabetCount(alphabet, countMap);
    }
    
    countMap.forEach((count, alphabet) => {
        // 해당 알파벳이 처음 등장하는 곳부터 탐색하자
        let start = input_string.indexOf(alphabet);
        for (let i = start; i < start + count; i++){
            // 한번이라도 다른 알파벳이 나오는 경우 외톨이 알파벳
            if (input_string.charAt(i) != alphabet){
                loners.push(alphabet);
                break;
            }
        }
    })
    
    // 외톨이 알파벳이 없는 경우
    if (loners.length === 0) return "N";
    
    // 외톨이 알파벳이 있는 경우: 사전순으로 정렬 후 이어붙이기
    loners.sort();
    return loners.join("");
}

// 특정 알파벳에 대한 데이터를 갱신하는 함수
function updateAlphabetCount(alphabet, map){
    // 이미 해당 알파벳이 등장한 적이 있는 경우
    if (map.has(alphabet)){
        let count = map.get(alphabet);
        map.set(alphabet, count + 1);
        return;
    }
    
    // 해당 알파벳이 처음 등장하는 경우
    map.set(alphabet, 1);
}