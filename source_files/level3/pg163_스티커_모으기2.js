/* 
[3단계] 스티커 모으기(2)
(Summer/Winter Coding(~2018))
*/

function solution(sticker) {
    // 스티커가 3개 이하인 경우, 가장 큰거 하나 제거
    if (sticker.length <= 3) return getMax(...sticker);

    // dynamic programming 활용: 첫 스티커 뜯는 경우 & 안 뜯는 경우 & 첫 두개 안뜯는 경우
    let dp1 = [...sticker], dp2 = [...sticker], dp3 = [...sticker];

    // 첫 스티커 뜯는 경우: 마지막 스티커 고려하지 않음
    dp1[1] = dp1[0];
    for (let i = 2; i < sticker.length - 1; i++) {
        // 이전 스티커를 뜯었던 경우와, 2칸 전 + 현재 스티커 뜯는 경우 중 더 큰 값을 얻는 경우를 찾는다
        dp1[i] = getMax(dp1[i - 1], dp1[i - 2] + dp1[i]);
    }

    // 첫 스티커를 패스하고 두번째 뜯는 경우: 첫 스티커 고려하지 않음
    dp2[2] = dp2[1];
    for (let i = 3; i < sticker.length; i++) {
        // 위와 같은 방식
        dp2[i] = getMax(dp2[i - 1], dp2[i - 2] + dp2[i]);
    }

    // 첫 두개 스티커 패스하는 경우(반례 대비: [5, 1, 16, 17, 16])
    dp3[3] = dp3[2];
    for (let i = 4; i < sticker.length; i++) {
        dp3[i] = getMax(dp3[i - 1], dp3[i - 2] + dp3[i]);
    }

    return getMax(getMax(...dp1), getMax(...dp2), getMax(...dp3));
}

// Math.max를 대신할, 최대값 구하기 함수
function getMax(...array) {
    let max = -1;

    array.forEach((item) => {
        if (item > max) max = item;
    })

    return max;
}