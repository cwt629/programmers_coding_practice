/* 
[2단계] 124 나라의 숫자
(연습문제)
*/

function solution(n) {
    var answer = '';
    let index;
    // 후술하게 될 연산의 값에 따라 숫자가 정해지도록 배열 설정
    const digitConverted = ['1', '2', '4'];
    // m단계 연산이라고 할 때, ((n-1-3-...-3^(m-1))%3^m)/3^(m-1)에서 버림하여 나온 정수로 값을 정하고 배열에서 인덱스로 삼을 것이다
    let numForMinusAndDivide = 1, numForRemainder = 3;

    // 시작할 때 먼저 빼주자.
    n -= numForMinusAndDivide;
    while (n >= 0) {
        // 3^m으로 나눈 나머지를 3^(m-1)로 나눠준 뒤, 그 값보다 작거나 같은 정수를 받아옴
        index = Math.floor((n % numForRemainder) / numForMinusAndDivide);
        // 그 인덱스에 해당하는 문자를 answer에 추가함. 이 때, 숫자를 왼쪽에 붙인다는 것을 명심
        answer = digitConverted[index].concat(answer);
        // 3^(m-1) 형태로 곱해나감
        numForMinusAndDivide *= 3; numForRemainder *= 3;
        // n-1-3-...-3^(m-1) 진행
        n -= numForMinusAndDivide;
    }

    return answer;
}