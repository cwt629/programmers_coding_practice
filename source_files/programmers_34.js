/* 
[2단계] 행렬 테두리 회전하기
(2021 Dev-Matching: 웹 백엔드 개발...)
*/

const queries = [[2, 2, 5, 4], [3, 3, 6, 6], [5, 1, 6, 3]];
console.log(solution(6, 6, queries));

function solution(rows, columns, queries) {
    var answer = [];

    // 행렬 초기 설정
    var matrix = [];
    for (let i = 0; i < rows; i++) {
        // 이차원 배열 설정
        matrix[i] = [];
        for (let j = 0; j < columns; j++) {
            // 각 행, 열에 해당하는 수 대입
            matrix[i].push(columns * i + j + 1);
        }
    }

    // 각 쿼리별로 수행(각 쿼리는 [x1, y1, x2, y2]로 이루어져 있다)
    queries.forEach(function (query) {
        // min의 시작은 왼쪽 위 모서리
        var temp, min;
        // 윗쪽 가로줄부터 시작
        for (let i = query[1] - 1; i < query[3] - 1; i++) {
            // 첫 시작
            if (temp === undefined) {
                // 덮어씌워질 부분의 수 받아오기
                temp = matrix[query[0] - 1][i + 1];
                // 최소값 초기 설정
                min = matrix[query[0] - 1][i]
                // 다음 부분 덮어씌우기
                matrix[query[0] - 1][i + 1] = matrix[query[0] - 1][i];
            }
            // 첫 시작이 아닌 경우
            else {
                // temp 값을 min과 비교하여, 최소값 갱신
                if (temp < min)
                    min = temp;
                // 다음 요소와 temp를 서로 바꾸기(구조 분해 할당)
                [temp, matrix[query[0] - 1][i + 1]] = [matrix[query[0] - 1][i + 1], temp];
            }
        }

        // 오른쪽 세로줄
        for (let i = query[0] - 1; i < query[2] - 1; i++) {
            // 최소값 갱신
            if (temp < min) min = temp;
            // 다음 요소와 temp 바꾸기
            [temp, matrix[i + 1][query[3] - 1]] = [matrix[i + 1][query[3] - 1], temp];
        }

        // 아랫쪽 가로줄
        for (let i = query[3] - 1; i > query[1] - 1; i--) {
            if (temp < min) min = temp;
            [temp, matrix[query[2] - 1][i - 1]] = [matrix[query[2] - 1][i - 1], temp];
        }

        // 왼쪽 세로줄
        for (let i = query[2] - 1; i > query[0] - 1; i--) {
            if (temp < min) min = temp;
            [temp, matrix[i - 1][query[1] - 1]] = [matrix[i - 1][query[1] - 1], temp];
        }

        // 최종 최소값 저장
        answer.push(min);
    })

    console.log(matrix);
    return answer;
}