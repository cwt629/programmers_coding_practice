/* 
[1단계] 이상한 문자 만들기
(연습문제)
*/

function solution(s) {
    // 공백 기준으로 분류
    const words = s.split(" ");

    const temp = [];
    words.forEach((word) => {
        // 배열로 쪼개서 수행
        const alphabets = word.split("");
        alphabets.forEach((alpha, index, origin) => {
            (index % 2 === 0) ?
                origin[index] = origin[index].toUpperCase()
                : origin[index] = origin[index].toLowerCase();
        })

        temp.push(alphabets.join(""));
    })

    return temp.join(" ");
}