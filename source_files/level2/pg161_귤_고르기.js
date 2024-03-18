/* 
[2단계] 귤 고르기
(연습문제)
*/

function solution(k, tangerine) {
    const tmap = getTangerineMap(tangerine);

    return getMinCount(tmap, k);
}

// 각 귤 크기에 대한 map을 만들어 반환하는 함수
function getTangerineMap(tangerine) {
    let tmap = new Map();
    tangerine.forEach((t) => {
        addMap(tmap, t);
    })

    return tmap;
}



// 맵에서 가장 많은 종류부터 최소한으로 귤을 고르는 함수
function getMinCount(tmap, k) {
    let counts = getMapValues(tmap); // 귤 개수
    counts.sort((a, b) => (b - a)); // 내림차순 정렬

    let result = 0, accTangerine = 0;
    // 앞에서부터 귤 담기
    while (result < counts.length && accTangerine < k) {
        accTangerine += counts[result++];
    }

    return result;
}

// 맵에 특정 크기의 귤을 추가하는 함수
function addMap(map, size) {
    if (!map.has(size)) {
        map.set(size, 1);
        return;
    }

    map.set(size, map.get(size) + 1);
}

// 맵에서 value 배열을 추출하여 반환하는 함수
function getMapValues(map) {
    let result = [];

    map.forEach((value) => {
        result.push(value);
    });

    return result;
}