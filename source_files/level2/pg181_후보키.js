/* 
[2단계] 후보키
(2019 KAKAO BLIND RECRUITMENT)
*/

function solution(relation) {
    let candidateKeys = [];
    const indices = Array.from({ length: relation[0].length }, (v, i) => (i));

    // 1~n개 조합해보기(완전탐색)
    for (let i = 1; i <= indices.length; i++) {
        const combinations = getCombination(indices, i);
        // 1. 유일성이 검증된 조합 필터링
        const newKeys = combinations.filter((comb) => (checkUniquenessByComb(relation, comb)));
        // 2. 그 중 최소성이 검증된 조합 선별
        const newCandidates = getMinimalKeys(candidateKeys, newKeys);

        // 선별된 후보키들 저장
        candidateKeys.push(...newCandidates);
    }

    return candidateKeys.length;
}

// 요소들의 n개 선택 조합을 모두 구하는 함수
function getCombination(arr, selectionRemaining) {
    if (selectionRemaining === 1) return arr.map((ele) => ([ele]));

    let result = [];

    arr.forEach((element, index, origin) => {
        const remaining = origin.slice(index + 1);
        const combs = getCombination(remaining, selectionRemaining - 1);
        const subResult = combs.map((a) => ([element, ...a]));
        result.push(...subResult);
    })

    return result;
}

// 특정 인덱스 조합에 대해 유일성을 체크하는 함수
function checkUniquenessByComb(relation, comb) {
    const data = relation.map((rel) => {
        let msg = "";
        comb.forEach((index) => {
            msg += rel[index];
        })
        return msg;
    })

    // 데이터를 집합에 담는다
    const dataSet = new Set(data);

    return data.length === dataSet.size;
}

// 특정 두 조합 중 작은 것이 큰 것의 포함 관계인지 판단하는 함수
function including(smaller, bigger) {
    for (let i = 0; i < smaller.length; i++) {
        if (!bigger.includes(smaller[i])) return false;
    }
    return true;
}

// 여러 후보키와 슈퍼키들 중 최소성을 만족하는 후보키만을 골라내는 함수
function getMinimalKeys(candidateKeys, newKeys) {
    return newKeys.filter((comb) => {
        // 앞서 구한 후보키들과 비교
        for (let i = 0; i < candidateKeys.length; i++) {
            if (including(candidateKeys[i], comb)) return false;
        }

        return true;
    })
}