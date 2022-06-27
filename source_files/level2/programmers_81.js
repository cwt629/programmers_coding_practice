/* 
[2단계] [3차] n진수 게임
(2018 KAKAO BLIND RECRUITMENT)
*/

function solution(n, t, m, p) {
    var answer = '';

    // 말해야 하는 숫자를 문자로 치환한 배열(16진수까지 커버)
    const convert = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

    // t바퀴 돌며 진행
    let current = 0, turn = 1;
    let myTurn = p;
    while (answer.length < t) {
        // 현재 숫자의 자리수만큼이 현재 숫자를 외친다
        const need = digitNum(current, n);
        // 그 안에 걸치면, 해당 자리수를 외쳐야 함
        if (myTurn >= turn && myTurn < turn + need) {
            answer += convert[digitConversion(current, n, myTurn - turn + 1)];
            // 내 턴 갱신
            myTurn += m;
        }
        // 해당 자리수만큼 턴 이동
        turn += need;
        // 다음 숫자
        current++;
    }

    return answer;
}

// 특정 십진수를 n진수로 바꿨을 때, 몇 자리 수가 되는지 반환하는 함수
function digitNum(number, n) {
    // 적어도 한자리 이상
    let result = 1;

    // n의 거듭제곱을 통해 알아감
    let compareWith = n;
    while (number >= compareWith) {
        result++;
        compareWith *= n;
    }

    return result;
}

// 특정 십진수를 n진수로 바꿨을 때, digit번째에 무슨 숫자가 오는지 반환하는 함수
function digitConversion(number, n, digit) {
    const eachdigits = [];

    // 각 자리수 저장
    while (number >= n) {
        const remainder = number % n;
        eachdigits.push(remainder);
        // 몫
        number = (number - remainder) / n;
    }
    // 마지막 남은 몫도 자리수에 포함된다
    eachdigits.push(number);

    // 스택에서 pop되는 순서대로 자리수가 생성되므로, digit만큼 pop한다
    let result;
    for (let i = 0; i < digit; i++)
        result = eachdigits.pop();

    return result;
}