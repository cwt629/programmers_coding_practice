/*
[2단계] 비밀 코드 해독
(2025 프로그래머스 코드챌린지 1차 예선)
*/

const KEY_CODE_LENGTH = 5;

function solution(n, q, ans) {
    let combinations = getCombinations(
        Array.from({length: n}, (v, i) => (i + 1)),
        KEY_CODE_LENGTH
    );
    
    for (let trial = 0; trial < q.length; trial++){
        combinations = combinations.filter((comb) => (getMatches(comb, q[trial]) === ans[trial]));
    }
    
    return combinations.length;
}

// 특정 array에서 선택 회수만큼 뽑는 조합을 모두 반환하는 함수
function getCombinations(array, selectionsCount){
    if (selectionsCount === 1) return array.map((ele) => ([ele]));
    const results = [];
    
    array.forEach((element, index, origin) => {
        const rest = origin.slice(index + 1);
        const restCombinations = getCombinations(rest, selectionsCount - 1);
        const finalCombinations = restCombinations.map((comb) => ([element, ...comb]));
        results.push(...finalCombinations);
    })
    
    return results;
}

// 오름차순인 두 배열 사이에 일치하는 요소의 개수를 반환하는 함수
function getMatches(arr1, arr2){
    let ptr1 = 0, ptr2 = 0, result = 0;
    while (ptr1 < arr1.length && ptr2 < arr2.length){
        if (arr1[ptr1] === arr2[ptr2]){
            result++;
            ptr1++;
            ptr2++;
        }
        else if (arr1[ptr1] < arr2[ptr2]){
            ptr1++;
        }
        else {
            ptr2++;
        }
    }
    
    return result;
}