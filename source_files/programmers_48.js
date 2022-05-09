/* 
[2단계] 순위 검색
(2021 KAKAO BLIND RECRUITMENT)
*/

const info = ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150", "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"];
const query = ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200", "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100", "- and - and - and - 150"];

console.log(solution(info, query));

// 2nd try: 24가지 경우의 수에 대해 딕셔너리를 생성하고, 각각을 점수에 대해 sort한 뒤 이진탐색

function solution(info, query) {
    var answer = [];

    var infoDict = {};

    // 지원자들의 정보를 딕셔너리에 저장
    info.forEach((appliance) => {
        // 띄어쓰기로 split(순서: 개발언어, 직군, 경력, 소울푸드, 점수)
        var infoElements = appliance.split(" ");

        // 딕셔너리에 해당 정보 저장
        const temp = infoElements.slice(0, 4).join("");
        if (!(temp in infoDict))
            infoDict[temp] = [];
        infoDict[temp].push(parseInt(infoElements[4]));
    })

    // 딕셔너리의 각 배열들을 점수에 대해 내림차순 정렬
    for (i in infoDict) {
        infoDict[i].sort((a, b) => (b - a));
    }

    // 각 쿼리별 수행
    query.forEach((q) => {
        // 쿼리를 배열로 쪼갠다(순서: 개발언어, 직군, 경력, "소울푸드 점수")
        var queryArr = q.split(" and ");
        // 소울푸드와 점수는 해당 요소에서 분리
        queryArr[3] = queryArr[3].split(" ");
        answer.push(searchByArray(queryArr, infoDict));
    })

    return answer;
}

// 주어진 배열을 토대로 탐색했을 때, 조건을 만족하는 사람들의 수를 반환하는 함수
function searchByArray(queryArr, infoDict) {
    var result = 0;

    // -의 경우는, 두 경우 모두 탐색한다
    if (queryArr[0] === "-") {
        result = searchByArray(["cpp", queryArr[1], queryArr[2], queryArr[3]], infoDict) + searchByArray(["java", queryArr[1], queryArr[2], queryArr[3]], infoDict)
            + searchByArray(["python", queryArr[1], queryArr[2], queryArr[3]], infoDict);
    }
    else if (queryArr[1] === "-") {
        result = searchByArray([queryArr[0], "backend", queryArr[2], queryArr[3]], infoDict) + searchByArray([queryArr[0], "frontend", queryArr[2], queryArr[3]], infoDict)
    }
    else if (queryArr[2] === "-") {
        result = searchByArray([queryArr[0], queryArr[1], "junior", queryArr[3]], infoDict) + searchByArray([queryArr[0], queryArr[1], "senior", queryArr[3]], infoDict);
    }
    else if (queryArr[3][0] === "-") {
        result = searchByArray([queryArr[0], queryArr[1], queryArr[2], ["chicken", queryArr[3][1]]], infoDict) + searchByArray([queryArr[0], queryArr[1], queryArr[2], ["pizza", queryArr[3][1]]], infoDict);
    }
    // -가 없는 경우 정상 탐색
    else {
        // 점수를 정수로 변경
        const reqScore = parseInt(queryArr[3][1]);
        // 탐색할 문자열 생성
        const searchStr = queryArr.slice(0, 3).join("") + queryArr[3][0];
        // 해당 문자열이 있다면 이진 탐색 시작
        if (searchStr in infoDict) {
            let start = 0, end = infoDict[searchStr].length - 1;
            while (start <= end) {
                let mid = Math.floor((start + end) / 2);
                // 크거나 같다면, 그보다 오른쪽 탐색
                if (infoDict[searchStr][mid] >= reqScore)
                    start = mid + 1;
                // 작다면, 그보다 왼쪽 탐색
                else end = mid - 1;
            }
            // end의 위치가 마지노선
            result = end + 1;
        }
    }

    return result;
}


// 주어진 문자열대로 탐색했을 때, 조건을 만족하는 사람들의 수를 반환하는 함수
function searchByString(str, infoDict) {
    var result = 0;

    // 주어진 문자열 split(순서: 개발언어, 직군, 경력, "소울푸드 점수")
    var requires = str.split(" and ");
    // "소울푸드 점수"를 서로 분리
    requires[3] = requires[3].split(" ");

    // -의 경우는, 두 경우 모두 탐색한다
    if (requires[0] === "-") {
        const elseStr = requires.slice(1, 3).join(" and ") + " and " + requires[3].join(" ");
        result = searchByString("cpp and " + elseStr, infoDict);
        result += searchByString("java and " + elseStr, infoDict);
        result += searchByString("python and " + elseStr, infoDict)
    }
    else if (requires[1] === "-") {
        const elseStr = requires[2] + " and " + requires[3].join(" ");
        result = searchByString(requires[0] + " and backend and " + elseStr, infoDict);
        result += searchByString(requires[0] + " and frontend and " + elseStr, infoDict);
    }
    else if (requires[2] === "-") {
        const elseStr = requires.slice(0, 2).join(" and ") + " and ";
        const elseStr2 = " and " + requires[3].join(" ")
        result = searchByString(elseStr + "junior" + elseStr2, infoDict);
        result += searchByString(elseStr + "senior" + elseStr2, infoDict);
    }
    else if (requires[3][0] === "-") {
        const elseStr = requires.slice(0, 3).join(" and ") + " and ";
        result = searchByString(elseStr + "chicken " + requires[3][1], infoDict);
        result += searchByString(elseStr + "pizza " + requires[3][1], infoDict);
    }
    // -가 없는 경우 정상 탐색
    else {
        // 점수를 정수로 변경
        requires[3][1] = parseInt(requires[3][1]);
        const searchStr = requires.slice(0, 3).join("") + requires[3][0];
        // 해당 문자열이 있는 경우
        if (searchStr in infoDict) {
            // 이진 탐색으로 인원수 구하기
            let start = 0, end = infoDict[searchStr].length - 1;
            while (start <= end) {
                let mid = Math.floor((start + end) / 2);
                // 크거나 같다면, 그보다 오른쪽 탐색
                if (infoDict[searchStr][mid] >= requires[3][1])
                    start = mid + 1;
                // 작다면, 그보다 왼쪽 탐색
                else end = mid - 1;
            }
            // end의 위치가 마지노선
            result = end + 1;
        }
    }

    return result;
}


// 1st try: 시간 초과

// function solution(info, query) {
//     var answer = [];

//     const infoArr = [];

//     // 지원자들의 정보를 배열로 저장
//     info.forEach((appliance) => {
//         // 띄어쓰기로 split(저장: 개발언어, 직군, 경력, 소울푸드, 점수)
//         var infoElement = appliance.split(" ");
//         // 점수가 문자 형태로 저장되어 있으므로, 정수로 바꿔준다
//         infoElement[4] = parseInt(infoElement[4]);

//         // 배열에 저장
//         infoArr.push(infoElement);
//     })

//     // 점수에 대해 내림차순 정렬
//     infoArr.sort((a, b) => (b[4] - a[4]));

//     // 각 query별 수행
//     query.forEach((q) => {
//         // query의 조건들을 배열로 정리(저장: 개발언어, 직군, 경력, [소울푸드, 점수])
//         var requires = q.split(" and ");
//         // 마지막 요소에 소울푸드와 점수가 같이 섞여있으므로, 떼어서 배열로 설정해준다
//         requires[3] = requires[3].split(" ");
//         // 점수가 문자 형태로 저장되어 있으므로, 정수로 바꿔준다
//         requires[3][1] = parseInt(requires[3][1]);

//         // query에 따라서 선택지를 좁혀나간다
//         // const selection = infoArr.filter((candi) => {
//         //     return ((requires[0] === "-" || candi[0] === requires[0]) && (requires[1] === "-" || candi[1] === requires[1])
//         //         && (requires[2] === "-" || candi[2] === requires[2]) && (requires[3][0] === "-" || candi[3] === requires[3][0])
//         //         && (candi[4] >= requires[3][1]));
//         // })
//         var i = 0, count = 0; const infoLen = infoArr.length;
//         while (i < infoLen && infoArr[i][4] >= requires[3][1]) {
//             if ((requires[0] === "-" || infoArr[i][0] === requires[0]) && (requires[1] === "-" || infoArr[i][1] === requires[1])
//                 && (requires[2] === "-" || infoArr[i][2] === requires[2]) && (requires[3][0] === "-" || infoArr[i][3] === requires[3][0])
//                 && (infoArr[i][4] >= requires[3][1]))
//                 count++;
//             i++;
//         }

//         // 결과 저장
//         answer.push(count);
//     })

//     return answer;
// }