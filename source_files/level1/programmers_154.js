/* 
[1단계] 숫자 짝꿍
(연습문제)
*/

function solution(X, Y) {
    const [info1, info2] = [getDigitInfo(X), getDigitInfo(Y)];
    const commonInfo = getCommonDigits(info1, info2);

    return getPair(commonInfo);
}

// 각 숫자를 분석하여, 인덱스 숫자마다 몇개 있는지 담는 배열로 반환하는 함수
function getDigitInfo(number) {
    const digits = number.split("").map((num) => (parseInt(num)));

    let result = Array.from({ length: 10 }, () => (0));
    for (let digit of digits) {
        result[digit]++;
    }

    return result;
}

// 두 분석 배열을 통해 공통 정수 정보를 추출하는 함수
function getCommonDigits(info1, info2) {
    let result = Array.from({ length: 10 }, () => (0));

    for (let i = 0; i <= 9; i++) {
        result[i] = Math.min(info1[i], info2[i]);
    }

    return result;
}

// 특정 숫자를 n번 반복한 문자열을 반환하는 함수
function getNumberDuplicate(digit, n) {
    if (n === 0) return "";

    let temp = Array.from({ length: n }, () => (digit));
    return temp.join("");
}

// 공통 정수 정보를 바탕으로 짝꿍을 반환하는 함수
function getPair(commonInfo) {
    let pair = "";

    for (let i = 9; i >= 1; i--) {
        pair += getNumberDuplicate(i, commonInfo[i]);
    }

    // 0은 따로 본다
    if (pair === "")
        return (commonInfo[0] > 0) ? "0" : "-1";

    pair += getNumberDuplicate(0, commonInfo[0]);

    return pair;
}