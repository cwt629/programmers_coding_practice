/* 
[1단계] K번째수
(연습: 정렬)
*/

function solution(array, commands) {
    var answer = [];

    commands.forEach(function (param) {
        // param = [i, j, k]

        // i번째(인덱스 i-1)부터 j번째(인덱스 j-1)까지 복사
        var splitArray = array.slice(param[0] - 1, param[1]);
        // 복사한 배열 오름차순 정렬
        splitArray.sort(function (a, b) {
            return a - b;
        })
        // k번째(인덱스 k-1)를 answer에 추가
        answer.push(splitArray[param[2] - 1]);
    })

    return answer;
}