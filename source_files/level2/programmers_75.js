/* 
[2단계] 쿼드압축 후 개수 세기
(월간 코드 챌린지 시즌1)
*/

function solution(arr) {
    var answer = [0, 0];
    var needCounting = [];
    // arr와 같은 크기로 카운팅 배열 초기화
    for (let i = 0; i < arr.length; i++) {
        needCounting[i] = [];
        for (let j = 0; j < arr[0].length; j++) {
            needCounting[i].push(true);
        }
    }

    // 압축 시작
    compression(arr, needCounting, [0, 0], [arr.length, arr.length]);

    // 압축한 배열에서 세기 시작
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            // 셀 수 있다면
            if (needCounting[i][j])
                answer[arr[i][j]]++;
        }
    }

    return answer;
}


// recursive 방식으로 배열을 압축하는 함수
// (rightCorner는 절반 / 끝을 저장하며, 이를 포함하지 않게 탐색)
function compression(arr, needCounting, leftCorner, rightCorner) {
    // 한칸 남은 경우는 압축 불가
    if (leftCorner[0] === rightCorner[0] && leftCorner[1] === rightCorner[1]) return;

    // 압축 가능한지 탐색
    var compress_able = true;
    const compareWith = arr[leftCorner[0]][leftCorner[1]];
    for (let i = leftCorner[0]; i < rightCorner[0]; i++) {
        for (let j = leftCorner[1]; j < rightCorner[1]; j++) {
            // 다른 값이 하나라도 발견되면, 탐색 종료
            if (arr[i][j] !== compareWith) {
                compress_able = false;
                break;
            }
        }
        // 탐색 종료 시, 루프 탈출
        if (!compress_able) break;
    }
    // 압축에 성공한 경우
    if (compress_able) {
        // 해당 구역의 맨처음 부분을 제외하고 모두 카운트 제외
        for (let i = leftCorner[0]; i < rightCorner[0]; i++) {
            for (let j = leftCorner[1]; j < rightCorner[1]; j++) {
                needCounting[i][j] = false;
            }
        }
        // 카운트는 딱 한번만 한다
        needCounting[leftCorner[0]][leftCorner[1]] = true;

        return;
    }

    // 압축에 실패한 경우
    const midPoint = [(leftCorner[0] + rightCorner[0]) / 2, (leftCorner[1] + rightCorner[1]) / 2];
    // 왼쪽 위 사분면
    compression(arr, needCounting, leftCorner, midPoint);
    // 오른쪽 위 사분면
    compression(arr, needCounting, [leftCorner[0], midPoint[1]], [midPoint[0], rightCorner[1]]);
    // 왼쪽 아래 사분면
    compression(arr, needCounting, [midPoint[0], leftCorner[1]], [rightCorner[0], midPoint[1]]);
    // 오른쪽 아래 사분면
    compression(arr, needCounting, midPoint, rightCorner);
}