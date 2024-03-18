/* 
[2단계] 점 찍기
(연습문제)
*/

function solution(k, d) {
    let answer = 0;

    for (let x = 0; x <= d; x += k) {
        answer += countOnX(x, k, d);
    }

    return answer;
}

// x^2 + y^2 = d^2 (x >= 0, y >= 0) 그래프 활용하여, 특정 x값을 가지고 조건에 부합하는 점이 몇 개인지 반환하는 함수
function countOnX(x, k, d) {
    // 예외처리: 해당 범위에 존재하지 않는 경우
    if (x < 0 || x > d) return 0;

    // 해당 x값에 해당하는 원의 방정식 상의 y값
    const yBound = Math.sqrt(d ** 2 - x ** 2);

    // y값을 k 간격으로 자를 때 개수(y = 0 포함)
    return Math.floor(yBound / k) + 1;
}