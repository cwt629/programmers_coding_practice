/* 
[2단계] JadenCase 문자열 만들기
(연습문제)
*/

function solution(s) {
    // 띄어쓰기로 구분
    let splitArray = s.split(" ");
    let temp = []; // 바뀐 문자들을 저장할 배열
    // 각 단어의 첫 문자를 대문자로 바꾼다
    splitArray.forEach((word) => {
        // 공백이 연속해서 나옴에 의해 나온 빈 단어인 경우 그대로 저장
        if (word === "") {
            temp.push(word);
            return;
        }
        // 단어를 각 문자로 쪼갬
        let splitWord = word.split("");
        // 첫번째 문자만 대문자로, 나머지는 소문자로
        splitWord[0] = splitWord[0].toUpperCase();
        for (let i = 1; i < splitWord.length; i++)
            splitWord[i] = splitWord[i].toLowerCase();
        temp.push(splitWord.join(""));
    })

    // 결과
    return temp.join(" ");
}