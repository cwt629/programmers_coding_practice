/* 
[2단계] 짝지어 제거하기
(2017 팁스타운)
*/

console.log(solution("baabaa"), solution("cdcd"), solution("aab"));

function solution(s) {
    var answer;
    const len = s.length;
    // 글자가 홀수 글자이면, 무조건 단축 불가능이다.
    if (len % 2 !== 0) return 0;
    // 글자를 하나하나 집어넣을 배열
    var temp = [];

    // 처음부터 차곡차곡 진행
    for (let i = 0; i < len; i++) {
        // temp의 맨 마지막 글자와 현재 글자 비교
        if (temp.length > 0 && temp[temp.length - 1] === s[i]) {
            // temp에서 마지막 글자 제거
            temp.pop();
        }
        // 제거되지 않는다면, temp에 추가
        else temp.push(s[i]);
    }

    // temp가 비어 있다면 성공, 그렇지 않으면 실패
    answer = (temp.length === 0) ? 1 : 0;

    return answer;
}




// 2nd try: 판별 과정을 최소화하려고 했으나, 3단계에서 실패 시 뒤의 string에서 추가적으로 탐색이 필요하게 되어 실패.
// function solution(s) {
//     var answer = 1;
//     const len = s.length;

//     // 1단계: 처음으로 중복되는 문자 위치 찾기(뒤의 문자와 비교)
//     var std = 0;
//     while (std < len - 1 && s[std] !== s[std + 1]) std++;
//     // 중복되는 것이 전혀 없으면, 실패
//     if (std === len - 1) answer = 0;
//     // 그 외에는, 탐색 시작
//     else {
//         /*
//         2단계: 직후에 있는 두 문자가 중복되는가?
//         3단계: 그렇지 않다면, 잘린 첫번째 문자열의 뒷부분이 두번째 문자열의 앞부분과 일치하는가?
//         3단계에서 실패하면, (모든 문자열을 제거할 수 없다. => 틀렸다)
//         */
//         var leftIndex = std - 1, rightIndex = std + 2;
//         while (answer === 1 && (leftIndex >= 0 || rightIndex < len)) {
//             // 2단계 만족
//             if (rightIndex < len - 1 && s[rightIndex] === s[rightIndex + 1]) {
//                 // 해당 두 문자 제거했다고 간주하고 인덱스 이동
//                 rightIndex += 2;
//             }
//             // 3단계 만족
//             else if (leftIndex >= 0 && rightIndex < len &&
//                 s[leftIndex] === s[rightIndex]) {
//                 // 해당 두 문자 제거했다고 간주하고 인덱스 이동
//                 leftIndex -= 1;
//                 rightIndex += 1;
//             }
//             // 3단계까지 만족하지 못하면 실패처리 => 틀렸다
//             else answer = 0;
//         }
//     }

//     return answer;
// }




// 1st try: Brute Force(시간 초과)

// function solution(s) {
//     var answer = 0;
//     var len = s.length;
//     for (let i = 0; i < len; i++) {
//         // 다음 문자와 비교
//         if (i >= 0 && i < len - 1) {
//             // 다음 문자와 같은 문자인 경우
//             if (s[i] === s[i + 1]) {
//                 // 해당 두 문자 앞뒤의 문자열을 떼서 붙이기
//                 var former = s.substring(0, i);
//                 var latter = s.substring(i + 2);
//                 s = former + latter;
//                 // 뗀 만큼, 탐색을 다시 시작하기 위해 인덱스 조정
//                 i -= 2;
//                 // 문자열의 길이 재설정
//                 len = s.length;
//             }
//         }
//     }

//     // s가 비어있다면, 모두 제거한 것
//     answer = (s.length === 0) ? 1 : 0;

//     return answer;
// }