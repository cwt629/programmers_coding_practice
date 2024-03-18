/* 
[2단계] N개의 최소공배수
(연습문제)
*/

function solution(arr) {
    // 길이가 1인 경우
    if (arr.length === 1) return arr[0];

    // 앞에서부터 2개씩 짝지어 최소공배수를 구해나간다
    let answer = lcm(arr[0], arr[1]);
    for (let i = 2; i < arr.length; i++) {
        answer = lcm(answer, arr[i]);
    }

    return answer;
}

// 유클리드 호제법에 기반하여 두 수의 최대공약수를 구하는 함수
function gcd(a, b) {
    // 큰 수가 앞에 나오게끔 재배열
    if (a < b) [a, b] = [b, a];

    // a를 b로 나눈 나머지가 0이면, 그 때의 b값이 최대공약수!
    if (a % b === 0) return b;

    // b와, a를 b로 나눈 나머지에 대해 같은 과정 반복
    return gcd(b, a % b);
}

// gcd를 이용하여 두 수의 최소공배수를 구하는 함수
function lcm(a, b) {
    return a * b / gcd(a, b);
}