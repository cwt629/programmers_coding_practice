/* 
[3단계] N으로 표현
(연습문제: 동적계획법(Dynamic Programming))
*/

console.log(solution(5, 12));

function solution(N, number) {
    var answer = 0;
    var done = false;
    // dynamic programming을 위해, 각 수를 만들 최소값을 저장할 배열
    var results = [];
    // 각 인덱스와 같은 횟수만큼 최솟값을 가지는 수들을 저장하는 이차원 배열
    var numsCollected = [];

    // N만으로 이루어진 수들에 대한 설정
    var count = 1, numberWithNs = 0;
    while (count <= 8) {
        // N, NN, NNN, ... , NNNNNNNN 만들기
        numberWithNs = numberWithNs * 10 + N;
        // result와 이차원 배열에 저장
        results[numberWithNs] = count;
        numsCollected[count] = [numberWithNs];
        // 다음 수
        count++;
    }

    // 최소 2번부터 최대 8번까지 모든 경우 탐색
    for (let i = 2; i <= 8; i++) {
        // 최소 횟수가 1회인 것과 i-1회인 것, 2회인 것과 i-2회인 것, ...을 조합
        for (let j = 1; j < i; j++) {
            const firstLen = numsCollected[j].length;
            const secondLen = numsCollected[i - j].length;
            // 중간에 결과들을 정리할 변수 선언
            var inter;

            for (let m = 0; m < firstLen; m++) {
                for (let n = 0; n < secondLen; n++) {
                    // 더하기
                    inter = numsCollected[j][m] + numsCollected[i - j][n];
                    if (results[inter] === undefined) {
                        results[inter] = i;
                        numsCollected[i].push(inter);
                    }
                    // 빼기(음수의 경우, 반대로 하면 같은 절댓값의 양수를 구할 수 있고 이를 뺄셈하면 되므로 제외해줌. 인덱스에서의 문제 해결을 위함)
                    inter = numsCollected[j][m] - numsCollected[i - j][n];
                    if (inter > 0 && results[inter] === undefined) {
                        results[inter] = i;
                        numsCollected[i].push(inter);
                    }
                    // 곱하기
                    inter = numsCollected[j][m] * numsCollected[i - j][n];
                    if (results[inter] === undefined) {
                        results[inter] = i;
                        numsCollected[i].push(inter);
                    }
                    // 나누기(0은 구하는 의미가 없으므로 제외)
                    inter = Math.floor(numsCollected[j][m] / numsCollected[i - j][n]);
                    if (inter > 0 && results[inter] === undefined) {
                        results[inter] = i;
                        numsCollected[i].push(inter);
                    }
                    // 중간에 이미 답을 구했으면, 모두 종료
                    if (results[number] !== undefined) {
                        done = true;
                        break;
                    }
                }
                if (done) break;
            }
            if (done) break;
        }
        if (done) break;
    }

    // 결과 받아오기
    answer = (results[number] !== undefined) ? results[number] : -1;

    return answer;
}