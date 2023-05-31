/* 
[1단계] 개인정보 수집 유효기간
(2023 KAKAO BLIND RECRUITMENT)
*/

function solution(today, terms, privacies) {
    let answer = [];
    const tmap = getMapFromTerms(terms);
    const thisDay = getDay(today);

    privacies.forEach((data, index) => {
        const [startDate, type] = data.split(" ");
        const start = getDay(startDate);
        // 파기해야하는지 여부 판단
        if (start + tmap.get(type) * 28 <= thisDay) answer = [...answer, index + 1];
    })

    return answer;
}

// 특정 날짜가 며칠째인지를 반환하는 함수
function getDay(date) {
    const [year, month, day] = date.split(".").map((ele) => (parseInt(ele)));
    return (year * 12 + month) * 28 + day;
}

// terms를 map으로 저장해 반환하는 함수
function getMapFromTerms(terms) {
    let tmap = new Map();
    terms.forEach((term) => {
        let [type, month] = term.split(" ");
        month = parseInt(month);
        tmap.set(type, month);
    })

    return tmap;
}