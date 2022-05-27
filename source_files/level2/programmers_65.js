/* 
[2단계] [1차] 뉴스 클러스터링
(2018 KAKAO BLIND RECRUITMENT)
*/

function solution(str1, str2) {
    var answer = 0;
    // 다중집합(배열) 2개를 묶은 배열 선언
    const multisets = [[], []];

    // 다중집합 2개 생성
    for (let i = 0; i < str1.length - 1; i++) {
        // 해당 인덱스부터 문자 2개 받아오기
        const temp = str1.substr(i, 2);
        // 영어 쌍이라면, 소문자 형태로 저장
        if (isValidElement(temp))
            multisets[0].push(temp.toLowerCase());
    }

    for (let i = 0; i < str2.length - 1; i++) {
        const temp = str2.substr(i, 2);
        if (isValidElement(temp))
            multisets[1].push(temp.toLowerCase());
    }

    // 둘 다 공집합이면, 무조건 지수는 1이 된다
    if (multisets[0].length === 0 && multisets[1].length === 0) return 65536;

    // 각 다중집합을 정렬하고, 앞에서부터 천천히 비교해나가며 교집합 구하기
    multisets[0].sort();
    multisets[1].sort();
    let pin1 = 0, pin2 = 0, intersection = 0;
    while (pin1 < multisets[0].length && pin2 < multisets[1].length) {
        // 두 원소가 같으면 카운트
        if (multisets[0][pin1] === multisets[1][pin2]) {
            intersection++;
            pin1++;
            pin2++;
        }
        // 서로 다르면, 둘 중 더 앞순서인 단어의 다음 단어 받아오기
        else if (multisets[0][pin1] < multisets[1][pin2])
            pin1++;
        else pin2++;
    }

    // 합집합의 크기
    const union = multisets[0].length + multisets[1].length - intersection;
    // 지수 계산
    answer = Math.floor(intersection / union * 65536);
    return answer;
}

// 글자 쌍이 영문자로 된 유효한 문자열인지 아닌지 판별하는 함수
function isValidElement(element) {
    return (isEnglish(element.charAt(0)) && isEnglish(element.charAt(1)));
}

// 특정 글자가 영어인지 판별하는 함수
function isEnglish(letter) {
    return (letter >= 'A' && letter <= 'Z') || (letter >= 'a' && letter <= 'z');
}