/* 
[2단계] 삼각 달팽이
(월간 코드 챌린지 시즌1)
*/

function solution(n) {
    var answer = [];
    // n개의 행 초기화
    var line = [];
    for (let i = 0; i < n; i++) {
        line[i] = [];
    }

    // 최대 번호는 블록의 개수
    const maxNum = n * (n + 1) / 2;

    // 삼각형 채워나가기
    var num = 1;
    // 삼각형 틀의 기준점(각 꼭지점)
    var top = [0, 0], left = [n - 1, 0], right = [n - 1, n - 1];
    while (num <= maxNum) {
        // 마지막 한칸 남은 경우는 따로 예외처리
        if (JSON.stringify(top) === JSON.stringify(left)) {
            line[top[0]][top[1]] = num;
            num++;
        }
        else {
            // 왼쪽 대각선(좌하단 꼭지점 제외)
            for (let i = top[0]; i < left[0]; i++) {
                line[i][top[1]] = num;
                num++;
            }
            // 아래쪽 직선(우하단 꼭지점 제외)
            for (let i = left[1]; i < right[1]; i++) {
                line[left[0]][i] = num;
                num++;
            }
            // 오른쪽 대각선(위쪽 꼭지점 제외)
            const toSub = right[0] - right[1];
            for (let i = right[0]; i > top[0]; i--) {
                line[i][i - toSub] = num;
                num++;
            }
            // 꼭지점 갱신
            top = [top[0] + 2, top[1] + 1];
            left = [left[0] - 1, left[1] + 1];
            right = [right[0] - 1, right[1] - 2];
        }
    }

    // 모든 배열을 합쳐준다
    for (let i = 0; i < n; i++) {
        answer.push(...line[i]);
    }

    return answer;
}