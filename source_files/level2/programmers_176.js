/* 
[2단계] 예상 대진표
(2017 팁스타운)
*/

function solution(n, a, b) {
    let round = 0;
    const maxRound = logBase(n, 2); // 최대 라운드 수
    while (round < maxRound) {
        round++;
        // 서로 붙었는지 판단
        if (fightEachOther(a, b)) break;

        // 각각 새로 번호를 부여받는다
        a = Math.ceil(a / 2);
        b = Math.ceil(b / 2);
    }

    return round;
}

// 둘이 붙게 되는지 판단하는 함수
function fightEachOther(num1, num2) {
    // 홀-짝 순서이며, 차이가 1이면 둘이 붙는다
    if (num2 - num1 === 1) return (num1 % 2 === 1);
    if (num1 - num2 === 1) return (num1 % 2 === 0);

    // 둘다 아니면 false
    return false;
}

// 밑이 base인 로그함수 값을 반환하는 함수
function logBase(number, base) {
    return Math.log(number) / Math.log(base);
}