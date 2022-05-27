/* 
[1단계] [1차] 다크 게임
(2018 KAKAO BLIND RECRUITMENT)
*/

function solution(dartResult) {
    var answer = 0;

    // 3번의 점수를 저장할 배열
    var scores = [];

    // 한글자씩 읽으며 점수 반영
    var prev = "?";
    for (let i = 0; i < dartResult.length; i++) {
        const temp = dartResult.charAt(i);
        // 어느 유형의 문자인지에 따라 다르게 반영
        switch (kind(temp)) {
            case "number":
                // 이전 문자도 숫자였다면, 이어서 숫자 저장
                if (kind(prev) === "number") {
                    scores[scores.length - 1] = scores[scores.length - 1] * 10 + parseInt(temp);
                }
                else scores.push(parseInt(temp));
                break;

            case "power":
                // 각각에 대해 몇제곱할지 정리
                const powers = { "S": 1, "D": 2, "T": 3 };
                scores[scores.length - 1] = Math.pow(scores[scores.length - 1], powers[temp]);
                break;

            case "option":
                // *인 경우
                if (temp === "*") {
                    scores[scores.length - 1] *= 2;
                    if (scores.length > 1)
                        scores[scores.length - 2] *= 2;
                }
                // #인 경우
                else if (temp === "#") {
                    scores[scores.length - 1] *= (-1);
                }
                break;
        }
        // 이전 문자 저장
        prev = temp;
    }

    // 저장된 점수들을 합한다
    answer = scores.reduce((acc, cur) => (acc + cur), 0);
    return answer;
}

// 어느 문자가 숫자/제곱을 나타내는 문자/옵션 특수문자 인지 반환하는 함수
function kind(char) {
    // 숫자
    if (parseInt(char) == char) return "number";
    // 제곱을 나타내는 문자
    if (["S", "D", "T"].includes(char)) return "power";
    // 옵션 특수문자
    if (["*", "#"].includes(char)) return "option";
    // 아무것도 아닌 경우(예외 처리)
    return null;
}