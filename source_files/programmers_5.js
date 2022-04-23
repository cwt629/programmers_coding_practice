/* 
[1단계] [카카오 인턴] 키패드 누르기
(2020 카카오 인턴십)
*/

function solution(numbers, hand) {
    var answer = '';
    // 두 손의 시작점을 인덱스로 나타낸다. (*은 10, #은 11)
    let currentLeft = 10; let currentRight = 11;
    // 거리 계산을 위해 중간다리로 사용할 변수들
    var leftGapX, leftGapY, rightGapX, rightGapY;

    // 각 키패드의 위치를 x, y좌표로 나타낸다. *키를 원점으로 둔다.(순서는 0-1-2-...-9-*-#)
    let keypadPoints = [];
    for (let i = 0; i < 12; i++) {
        // 객체 형식으로 선언
        keypadPoints[i] = {};
        // 0은 (1,0) 위치
        if (i == 0) {
            keypadPoints[i].x = 1;
            keypadPoints[i].y = 0;
        }
        // *는 원점 위치
        else if (i == 10) {
            keypadPoints[i].x = 0;
            keypadPoints[i].y = 0;
        }
        // #은 (2,0) 위치
        else if (i == 11) {
            keypadPoints[i].x = 2;
            keypadPoints[i].y = 0;
        }
        // 나머지 숫자는 규칙을 찾아 배치
        else {
            keypadPoints[i].x = (i - 1) % 3;
            keypadPoints[i].y = Math.floor((12 - i) / 3);
        }
    }

    // numbers를 순서대로 탐색
    numbers.forEach(function (param) {
        // 1, 4, 7은 왼손 사용(입력은 0~9만 나옴을 이용!)
        if (param % 3 == 1) {
            answer = answer.concat('L');
            currentLeft = param;
        }
        // 3, 6, 9는 오른손 사용(입력은 0~9만 나오며, 0이 조건에 해당되지 않도록 주의!)
        else if (param > 0 && param % 3 == 0) {
            answer = answer.concat('R');
            currentRight = param;
        }
        // 나머지 2, 5, 8, 0은 두 손의 현 위치를 고려한다
        else {
            // x, y좌표 차이를 계산한다(leftGapX, leftGapY, rightGapX, rightGapY)
            // 이 때, 각 숫자가 각 인덱스와 일치하게 설정해놨음을 기억!
            leftGapX = keypadPoints[currentLeft].x - keypadPoints[param].x;
            leftGapY = keypadPoints[currentLeft].y - keypadPoints[param].y;
            rightGapX = keypadPoints[currentRight].x - keypadPoints[param].x;
            rightGapY = keypadPoints[currentRight].y - keypadPoints[param].y;

            // 구한 x, y 좌표 차이의 절대값을 더했을 때, 그 값이 작은 쪽으로 누른다
            // 왼손이 더 가까운 경우
            if (Math.abs(leftGapX) + Math.abs(leftGapY)
                < Math.abs(rightGapX) + Math.abs(rightGapY)) {
                answer = answer.concat('L');
                currentLeft = param;
            }
            // 오른손이 더 가까운 경우
            else if (Math.abs(leftGapX) + Math.abs(leftGapY)
                > Math.abs(rightGapX) + Math.abs(rightGapY)) {
                answer = answer.concat('R');
                currentRight = param;
            }
            // 같은 경우, hand를 보고 판단
            else {
                if (hand === 'left') {
                    answer = answer.concat('L');
                    currentLeft = param;
                }
                else if (hand === 'right') {
                    answer = answer.concat('R');
                    currentRight = param;
                }
            }
        }
    })

    return answer;
}