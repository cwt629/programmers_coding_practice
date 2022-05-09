/* 
[2단계] 가장 큰 수
(연습문제: 정렬)
*/

console.log(solution([6, 10, 2]), solution([3, 30, 34, 5, 9]), solution([412, 41]));
//console.log(nthDigit(13579, 2), nthDigit(234, 4), nthDigit(12, 4), nthDigit(12345678, 7));


// 2nd try: 정렬 시, 두 요소를 이었을 때 기준으로 오름차순
function solution(numbers) {
    var answer = '';

    // 임의의 두 요소를 이어붙인 숫자가 더 커지는 순서로 정렬
    numbers.sort((a, b) => {
        const a_sum_b = parseInt(String(a) + String(b));
        const b_sum_a = parseInt(String(b) + String(a));
        return b_sum_a - a_sum_b;
    })

    // 정렬된 숫자들을 순서대로 문자열로 붙여주기
    answer = numbers.join("");

    // 0인 경우
    if (answer.charAt(0) === "0")
        return "0";

    return answer;
}


// 1st try(테스트케이스 1~6 실패)

// function solution(numbers) {
//     var answer = '';

//     /*
//     숫자들을 아래와 같이 정렬해야 한다.
//     1. 맨앞 자리수가 큰 순서대로 정렬
//     2. 특정 자리수가 같은 경우, 다음 자리수에 대해 다음과 같은 우선순위가 있다.
//     - 앞 자리수보다 뒤 자리수가 더 큼 > 뒤 자리수가 없음(함수 내에서, 앞 자리수와 같은 수로 설정)
//     > 앞 자리수보다 뒤 자리수가 더 작음
//     */
//     numbers.sort((a, b) => {
//         // 최대 1000까지 가능
//         if (nthDigit(a, 1) === nthDigit(b, 1)) {
//             if (nthDigit(a, 2) === nthDigit(b, 2)) {
//                 if (nthDigit(a, 3) === nthDigit(b, 3)) {
//                     return String(a).length - String(b).length;
//                 }
//                 return nthDigit(b, 3) - nthDigit(a, 3);
//             }
//             return nthDigit(b, 2) - nthDigit(a, 2);
//         }
//         return nthDigit(b, 1) - nthDigit(a, 1);
//     })

//     // 순서대로 붙여서 하나의 string으로 만든다
//     answer = numbers.join("");

//     // 만약 0으로 시작하는 경우는, 0만 반환하게 바꾼다
//     if (answer.charAt(0) === "0")
//         return "0";

//     return answer;
// }

// // 특정 숫자의 n번째 자리수를 반환하는 함수
// function nthDigit(num, n) {
//     var divid = 1;
//     while (divid * 10 <= num) divid *= 10;
//     // n번째 자리가 몇의 자리수인지 확인(10의 자리, 100의 자리, ...)
//     divid /= Math.pow(10, n - 1);

//     // 10^m자리수인 경우, 10^m으로 나눠주고, 그 몫 중 맨끝 한자리만 필요
//     // 단, 비어있는 경우 마지막 자리수로 반복(정렬에 용이하도록)
//     return (divid >= 1) ? Math.floor(num / divid) % 10 : nthDigit(num, n - 1);
// }