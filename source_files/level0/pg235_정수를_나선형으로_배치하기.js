/*
[0단계] 정수를 나선형으로 배치하기
(코딩 기초 트레이닝)
*/

function solution(n) {
    let answer = [];
    // 이차원 배열 만들어주기
    for (let i = 0; i < n; i++)
        answer[i] = [];

    // 외곽 정사각형 틀을 시작으로 안쪽으로 채우기 시작한다
    let start = 0, end = n - 1;
    let number = 1;

    while (start <= end) {
        // 1. 맨위줄
        for (let col = start; col <= end; col++)
            answer[start][col] = number++;

        // 2. 오른쪽줄
        for (let row = start + 1; row <= end; row++)
            answer[row][end] = number++;

        // 3. 맨아랫줄
        for (let col = end - 1; col >= start; col--)
            answer[end][col] = number++;

        // 4. 왼쪽줄
        for (let row = end - 1; row > start; row--)
            answer[row][start] = number++;

        // start와 end 갱신
        start++; end--;
    }

    return answer;
}