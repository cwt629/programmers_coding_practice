/* 
[2단계] 행렬의 곱셈
(연습문제)
*/

function solution(arr1, arr2) {
    var answer = [];

    for (let i = 0; i < arr1.length; i++) {
        answer[i] = [];
        for (let j = 0; j < arr2[0].length; j++) {
            answer[i][j] = 0;
            for (let k = 0; k < arr1[0].length; k++) {
                answer[i][j] += arr1[i][k] * arr2[k][j];
            }
        }
    }

    return answer;
}