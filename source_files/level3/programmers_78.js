/* 
[3단계] 110 옮기기
(월간 코드 챌린지 시즌2)
*/

function solution(s) {
    var answer = [];

    // 각 성분에 대해 진행
    s.forEach((str) => {
        // 추출한 "110"의 개수
        var count_110 = 0;

        /* 
        기존에는 문자열을 차근차근 탐색하며 하나하나 "110"을 옮겼지만,
        생각해보면 "110"을 삽입한 결과 새로운 "110"이 생길 일은 없다.
        이번에는 생기는 모든 "110"을 추출한 뒤 이를 앞에서부터 넣는 식으로 진행하려고 한다.
        */

        // 문자열에서 "110"을 모두 추출해낸다(stack 이용) : 시간 단축을 위함!
        const splitArray = str.split(""), stack = [];
        for (let i = 0; i < splitArray.length; i++) {
            // 현재 자리를 셋째 자리로 취급
            const third = splitArray[i];
            // 스택에서 맨끝 두자리 받아오기(역순 주의!)
            if (stack.length >= 2) {
                const second = stack.pop();
                const first = stack.pop();

                // "110" 판별하고, 맞으면 삭제(스택에서 뺀 상태 유지)
                if (first === "1" && second === "1" && third === "0")
                    count_110++;

                // "110"이 아니라면 그대로 다시 돌려놓고, 현재 숫자 추가
                else stack.push(first, second, third);
            }
            // 스택에서 꺼낼 숫자가 부족하면, 그대로 넣어준다
            else stack.push(third);
        }

        // "110"이 없으면 현재 문자열이 정답
        if (count_110 === 0) {
            answer.push(str);
            return;
        }

        // "110"을 제거한 문자열 생성
        str = stack.join("");

        // 추출한 "110"을 적절한 위치에 삽입하기(오른쪽에서부터 처음으로 "0" 나온 뒷자리)
        var pin = str.length - 1;
        while (pin >= 0 && str.charAt(pin) === "1") pin--;

        // 넣을 "110"들
        var temp = "";
        for (let i = 0; i < count_110; i++) {
            temp += "110";
        }
        // "110" 삽입
        str = insertString(str, pin + 1, temp);

        // 생성된 문자열 저장
        answer.push(str);
    })

    return answer;
}


// 인자로 주어진 문자열의 해당 인덱스에 다른 문자열을 삽입하는 함수
function insertString(str, index, newString) {
    return str.substring(0, index) + newString + str.substring(index);
}




/* 아래는 실패했던 풀이들 */

// 1st try: "110"을 뺄 때마다 삽입(모두 틀림)

// function solution(s) {
//     var answer = [];
//     var beginPin;

//     s.forEach((str) => {
//         // 시작 핀 초기화
//         beginPin = 0;

//         // 문자열의 끝까지 탐색
//         while (beginPin < str.length - 2) {
//             // "110"을 집어넣을 위치("110" 전에 발견되지 않으면 -1)
//             var putOn = -1;

//             // 추출할 "110"의 위치 탐색
//             while (beginPin < str.length - 2) {
//                 // "111"인 경우, "110"을 대입해 더 작게 만들 수 있으므로 "110"을 집어넣을 수 있는 후보
//                 if (putOn === -1 && triEqual(str, beginPin, "111"))
//                     putOn = beginPin;

//                 // "110"인 경우
//                 else if (triEqual(str, beginPin, "110")) {
//                     // 대입할 곳을 찾았으면 그대로 대입
//                     if (putOn > -1) {
//                         // "110"을 추출하고 대입한 문자열
//                         str = str.substring(0, putOn) + "110" + str.substring(putOn, beginPin) + str.substring(beginPin + 3);

//                         // 핀은 대입한 "110"의 끝으로 이동
//                         beginPin = putOn + 3;
//                     }

//                     // ***얘가 문제다 얘가... 무한루프 돌수도 있는거같음.***
//                     // 대입할 곳이 없으면, 추출한 "110" 뒤에서 대입할 곳 찾기
//                     else {
//                         // 탐색 시작점은 "110" 바로 뒤부터
//                         putOn = beginPin + 3;
//                         while (putOn < str.length - 2) {
//                             // 두자리씩 비교해 "111"을 발견하면, 그자리에 대입
//                             if (triEqual(str, putOn, "111")) {
//                                 break;
//                             }
//                             putOn++;
//                         }

//                         // 뒤에서 두번째자리까지 오는동안 탐색에 실패한 경우
//                         if (putOn === str.length - 2) {
//                             // 마지막 두자리 불러오기(매번 불러오지 않도록)
//                             const lastTwoDigits = str.substring(putOn);
//                             // 마지막 두자리가 "11"인 경우 현재 위치에 대입
//                             if (lastTwoDigits === "11")
//                                 str = str.substring(0, beginPin) + str.substring(beginPin + 3, putOn) + "110" + lastTwoDigits;

//                             // 마지막 두자리가 "01"인 경우, 다음 위치에 대입
//                             else if (lastTwoDigits === "01")
//                                 str = str.substring(0, beginPin) + str.substring(beginPin + 3, putOn + 1) + "110" + lastTwoDigits;

//                             // 마지막 한자리가 "0"인 나머지 경우, 맨끝에 대입
//                             else str = str.substring(0, beginPin) + str.substring(beginPin + 3) + "110";
//                         }

//                         // "110" 이후에 탐색한 곳이 있는 경우
//                         else str = str.substring(0, beginPin) + str.substring(beginPin + 3, putOn) + "110" + str.substring(putOn);

//                         // "110"을 뒤로 옮긴 경우는, 핀을 바로 뒤로 이동???
//                         beginPin++;
//                     }

//                     // 탐색 종료
//                     break;
//                 }
//                 // 핀 이동
//                 beginPin++;
//             }
//         }

//         // 모든 탐색 이후 변경된 문자열 저장
//         answer.push(str);
//     })

//     return answer;
// }

// // 인자로 주어진 문자열의 해당 인덱스부터 3개의 숫자가 인자로 주어진 3자리 숫자 문자열과 일치하는지 반환하는 함수
// function triEqual(str, beginIndex, compareWith) {
//     return (str.substr(beginIndex, 3) === compareWith);
// }




// 2nd try: "110"을 모두 뺀 뒤, 앞에서부터 "111"에 해당하는 부분에 넣기(틀린 답은 없지만, 대부분 시간 초과가 남)

// function solution(s) {
//     var answer = [];

//     // 각 성분에 대해 진행
//     s.forEach((str) => {
//         // 추출한 "110"의 개수
//         var count_110 = 0;

//         /*
//         기존에는 문자열을 차근차근 탐색하며 하나하나 "110"을 옮겼지만,
//         생각해보면 "110"을 삽입한 결과 새로운 "110"이 생길 일은 없다.
//         이번에는 생기는 모든 "110"을 추출한 뒤 이를 앞에서부터 넣는 식으로 진행하려고 한다.
//         */

//         // 문자열에서 "110"을 모두 추출해낸다
//         var i = 0;
//         while (i < str.length - 2) {
//             // 현 인덱스에서 3개의 자리 수를 볼 때, "110"을 찾은 경우
//             if (equalString(str, i, "110")) {
//                 // 추출
//                 str = str.substring(0, i) + str.substring(i + 3);
//                 count_110++;

//                 // 새로 생긴 "110"이 있을 경우를 대비해, 인덱스를 두칸 앞으로 옮긴다
//                 i -= 2;
//             }

//             // 찾지 못한 경우 인덱스 이동
//             else i++;
//         }

//         // 추출한 "110"을 적절한 위치에 삽입하기
//         var pin = 0; // 변형된 str의 인덱스
//         while (count_110 > 0) {
//             while (pin < str.length - 2) {
//                 // 현재 인덱스부터 3자리의 숫자가 "111"인 경우 삽입할 수 있음
//                 if (equalString(str, pin, "111")) {
//                     // 현위치에 "110" 삽입
//                     str = insertString(str, pin, "110");
//                     count_110--;
//                     // "110"을 삽입한 만큼 핀 조절
//                     pin += 3;
//                     // 삽입 과정 종료
//                     break;
//                 }

//                 // 삽입하지 않은 경우, 다음 자리 탐색
//                 pin++;
//             }

//             // 마지막 두자리만 남긴 경우
//             if (pin === str.length - 2) {
//                 // 남은 두자리가 "11"인 경우만 현위치에 모두 삽입
//                 if (equalString(str, pin, "11")) {
//                     while (count_110 > 0) {
//                         str = insertString(str, pin, "110");
//                         pin += 3;
//                         count_110--;
//                     }
//                 }
//                 else pin++;
//             }

//             // 마지막 한자리만 남은 경우
//             if (pin === str.length - 1) {
//                 // 마지막 한자리가 "1"이면, 현위치에 모두 삽입
//                 if (str.charAt(pin) === "1") {
//                     while (count_110 > 0) {
//                         str = insertString(str, pin, "110");
//                         count_110--;
//                     }
//                 }
//                 // 마지막 한자리가 "0"이면, 맨끝에 모두 삽입
//                 else {
//                     while (count_110 > 0) {
//                         str += "110";
//                         count_110--;
//                     }
//                 }
//             }
//         }

//         // 생성된 문자열 저장
//         answer.push(str);
//     })

//     return answer;
// }

// // 인자로 주어진 문자열의 해당 인덱스부터의 문자열이 다른 인자로 주어진 문자열과 일치하는지 반환하는 함수
// function equalString(str, beginIndex, compareWith) {
//     for (let i = 0; i < compareWith.length; i++) {
//         if (str.charAt(beginIndex + i) !== compareWith.charAt(i)) return false;
//     }
//     return true;
// }

// // 인자로 주어진 문자열의 해당 인덱스에 다른 문자열을 삽입하는 함수
// function insertString(str, index, newString) {
//     return str.substring(0, index) + newString + str.substring(index);
// }