/*
[2단계] 전화번호 목록
(연습문제: 해시)
*/

function solution(phone_book) {
    // 길이가 짧은 순으로 재정렬
    let sortedBook = [...phone_book];
    sortedBook.sort((a, b) => (a.length - b.length));
    
    let dict = {};
    
    function addPhoneAndCheck(number, currentDict, digit = 0){
        let currentDigit = number.charAt(digit);
        if (!Object.keys(currentDict).includes(currentDigit)){
            currentDict[currentDigit] = {hasFin: false};
        }
        let nextDict = currentDict[currentDigit];
        if (currentDict[currentDigit].hasFin)
            return true;
        
        // 마지막인 경우
        if (number.length === digit + 1){
            currentDict[currentDigit].hasFin = true;
            return false;
        }
        
        // 계속해서 진행
        return addPhoneAndCheck(number, nextDict, digit + 1);
    }
    
    for (let number of sortedBook){
        let result = addPhoneAndCheck(number, dict);
        if (result) return false;
    }
    
    return true;
}