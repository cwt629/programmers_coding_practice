/* 
[3단계] 불량 사용자
(2019 카카오 개발자 겨울 인턴십)
*/

function solution(user_id, banned_id) {
    // 각 banned_id별로 가능한 아이디들을 저장할 배열
    let bannedCandidates = [];

    // 각 banned_id별로 상응할 수 있는 아이디들 저장
    banned_id.forEach((ban) => {
        let cands = user_id.filter((id) => (correspond(id, ban)));
        bannedCandidates.push(cands);
    })

    let totalCases = searchCases(bannedCandidates, []);
    let temp = []; // 중복되는 배열을 제거하기 위해, 각각을 stringify하여 저장
    totalCases.forEach((c) => {
        c.sort();
        temp.push(JSON.stringify(c));
    })

    // 중복을 제거했을 때 그 길이
    return new Set(temp).size;
}

// 특정 user_id가 특정 banned_id에 부합하는지 판별하는 함수
function correspond(user, banned) {
    // 길이 자체가 다른 경우
    if (user.length !== banned.length) return false;

    // 한글자 한글자 따진다
    for (let i = 0; i < user.length; i++) {
        if (banned.charAt(i) === "*") continue;

        if (user.charAt(i) !== banned.charAt(i)) return false;
    }

    return true;
}

// DFS 방식으로, 각 후보군에서 중복없이 하나씩 고를 때 케이스들을 반환하는 함수
function searchCases(candidates, acc) {
    // 모두 넣은 경우
    if (candidates.length === acc.length) return [acc];

    let result = [];

    // 다음 candidate 받기
    let index = acc.length;
    candidates[index].forEach((cand) => {
        if (!acc.includes(cand))
            result.push(...searchCases(candidates, [...acc, cand]))
    })

    return result;
}