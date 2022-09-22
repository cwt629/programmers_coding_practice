/* 
[1단계] 최소직사각형
(위클리 챌린지)
*/

const sizes = [[60, 50], [30, 70], [60, 30], [80, 40]];
console.log(solution(sizes));

function solution(sizes) {
    var answer = 0;
    // 각 가로세로를 오름차순으로 정렬
    sizes.forEach(function (param) {
        param.sort(function (a, b) {
            return a - b;
        })
    })
    console.log(sizes);

    // sizes를 가로세로 중 최대값에 대해 오름차순 정렬(같은 경우는, 나머지 값이 더 작은 것이 우선되어야 함)
    sizes.sort(function (a, b) {
        if (a[1] === b[1])
            return b[0] - a[0];
        return a[1] - b[1];
    })

    console.log(sizes);

    // 마지막에 있는 최대값을 하나의 길이로 설정
    answer = sizes[sizes.length - 1][1];
    // 나머지 길이 받아오기(다른 지갑들이 나머지 길이보다도 더 작은 경우 대비)
    var minDefault = sizes[sizes.length - 1][0];
    // sizes 배열에서 해당 지갑은 배제
    sizes.pop();

    // 나머지 길이를 찾아내서, 앞서 구한 최대 길이와 곱해주기
    answer *= minRequired(sizes, minDefault);

    return answer;
}

// 최대 길이를 정한 이후, 나머지 지갑들을 커버하기 위한 최소 길이를 반환하는 함수
function minRequired(sizes, minDefault) {
    // 각 지갑의 더 긴 길이는 이미 구한 최대 길이로 커버되므로, 짧은 길이들 모아보기
    const toCover = sizes.map((param) => ((param[0] < param[1]) ? param[0] : param[1]));

    // 그 길이들 중 최대 찾기
    var max = minDefault;
    const coverLen = toCover.length;

    for (let i = 0; i < coverLen; i++)
        if (max < toCover[i]) max = toCover[i];

    return max;
}