/* 
[3단계] 파괴되지 않은 건물
(2022 KAKAO BLIND RECRUITMENT)
*/

// 2nd try: 누적합 이용(해설을 보며 구현했다. 이후에 다시 볼 수 있도록 하자...)
// url: https://tech.kakao.com/2022/01/14/2022-kakao-recruitment-round-1/

function solution(board, skill) {
    // 누적합용 배열
    let accSum = [];
    for (let i = 0; i <= board.length; i++){
        accSum[i] = [];
        for (let j = 0; j <= board[0].length; j++){
            accSum[i][j] = 0;
        }
    }
    
    // 각 skill에 대해 누적합 적용
    skill.forEach(([type, r1, c1, r2, c2, degree]) => {
        switch(type){
            case 1:
                updateAccSum(accSum, r1, c1, r2, c2, -degree);
                break;
                
            case 2:
                updateAccSum(accSum, r1, c1, r2, c2, degree);
                break;
        }
    })
    
    // 실제 누적합 구하기
    getFinalAccSum(accSum);
    
    // 결과
    return countBuilding(board, accSum);
}

// 특정 범위에 대한 변화를 누적합에 적용하는 함수
function updateAccSum(accSum, r1, c1, r2, c2, change){
    accSum[r1][c1] += change;
    accSum[r1][c2 + 1] -= change;
    accSum[r2 + 1][c1] -= change;
    accSum[r2 + 1][c2 + 1] += change;
}

// 실제 누적합을 구하는 함수
function getFinalAccSum(accSum){
    // 1. 오른쪽 방향으로 다 더한다
    for (let i = 0; i < accSum.length; i++){
        for (let j = 1; j < accSum[0].length; j++){
            accSum[i][j] += accSum[i][j - 1];
        }
    }
    
    // 2. 아랫쪽 방향으로 다 더한다
    for (let i = 0; i < accSum[0].length; i++){
        for (let j = 1; j < accSum.length; j++){
            accSum[j][i] += accSum[j - 1][i];
        }
    }
}

// 이차원 배열에서 파괴되지 않은 건물 수를 반환하는 함수
function countBuilding(board, accSum){
    let count = 0;
    
    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[0].length; j++){
            if (board[i][j] + accSum[i][j] > 0) count++;
        }
    }
    
    return count;
}




// 1st try: 냅다 이차원 배열로 하기(제일 쉽고, 정확성은 모두 맞지만, 당연히 시간 초과)
// function solution(board, skill) {
//     skill.forEach(([type, ...arg]) => {
//         switch(type){
//             case 1:
//                 damage(board, ...arg);
//                 break;
                
//             case 2:
//                 heal(board, ...arg);
//                 break;
//         }
//     })
    
//     return countBuilding(board);
// }

// // 이차원 배열의 특정 부분에 데미지를 주는 함수
// function damage(board, r1, c1, r2, c2, degree){
//     for (let i = r1; i <= r2; i++){
//         for (let j = c1; j <= c2; j++){
//             board[i][j] -= degree;
//         }
//     }
// }

// // 이차원 배열의 특정 부분을 치료하는 함수
// function heal(board, r1, c1, r2, c2, degree){
//     for (let i = r1; i <= r2; i++){
//         for (let j = c1; j <= c2; j++){
//             board[i][j] += degree;
//         }
//     }
// }

// // 이차원 배열에서 파괴되지 않은 건물 수를 반환하는 함수
// function countBuilding(board){
//     let count = 0;
    
//     for (let i = 0; i < board.length; i++){
//         for (let j = 0; j < board[0].length; j++){
//             if (board[i][j] > 0) count++;
//         }
//     }
    
//     return count;
// }