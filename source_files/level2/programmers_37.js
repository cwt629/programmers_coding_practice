/* 
[2단계] 거리두기 확인하기
(2021 카카오 채용연계형 인턴십)
*/

const places = [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]];
console.log(solution(places));

function solution(places) {
    var answer = [];

    // 각 대기실마다 수행
    places.forEach(function (room) {
        var result = 1;
        /* 기준에서 맨해튼 거리가 2 이하인 참가자들 중, 
        이전에 탐색했던 참가자들이랑만 체크한다. 
        같은 두 사람끼리는 한번만 탐색하면 되므로,
        그 두 사람 중 더 나중에 탐색할 사람 기준에서 보면 된다.
        */
        for (let i = 0; i < 5 && result === 1; i++) {
            for (let j = 0; j < 5; j++) {
                // P에 대해서만 고려
                if (room[i].charAt(j) === "P") {
                    // 정확히 두 칸 위 고려(파티션이 사이에 없으면 미준수)
                    if (i >= 2 && room[i - 2].charAt(j) === "P" && room[i - 1].charAt(j) !== "X") {
                        result = 0;
                        break;
                    }

                    // 한줄 위, 맨해튼 거리가 2 이하인 부분 고려
                    if (i > 0) {
                        for (let k = j - 1; k <= j + 1 && k < 5; k++) {
                            // 없는 부분이면 통과
                            if (k < 0) continue;
                            // 맨해튼 거리가 1인 부분은 P이면 무조건 미준수
                            if (k === j) {
                                if (room[i - 1].charAt(k) === "P")
                                    result = 0;
                            }

                            // 맨해튼 거리가 2인 부분
                            else if (room[i - 1].charAt(k) === "P") {
                                // 파티션으로 막혀있는지 확인
                                if (!(room[i - 1].charAt(j) === "X" && room[i].charAt(k) === "X"))
                                    result = 0;
                            }
                        }
                    }

                    // 같은 라인의 왼쪽, 맨해튼 거리가 2 이하인 부분 고려
                    if (j > 0 && room[i].charAt(j - 1) === "P") result = 0;
                    else if (j > 1 && room[i].charAt(j - 2) === "P" && room[i].charAt(j - 1) !== "X") result = 0;
                }
            }
        }

        // 결과 반영
        answer.push(result);
    })

    return answer;
}