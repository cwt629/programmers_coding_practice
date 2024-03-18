/* 
[2단계] 조이스틱
(연습문제: 탐욕법(Greedy))
*/

console.log(solution("JEROEN"), solution("JAN"));

// 3rd try: 완전 탐색

function solution(name) {
    var answer = 0;

    // "A"의 아스키 코드 받아오기
    const asciiA = "A".charCodeAt(0); // 65 고정

    // 각 문자의 수정이 완료되었는지 여부를 확인하는 배열
    const done = [];

    // 각 자리에서 위아래로 이동해야할 최소 횟수 받아오기
    const moves = [];
    const len = name.length;
    for (let i = 0; i < len; i++) {
        // 아스키코드 값을 받아온다
        const ascii = name.charCodeAt(i);
        // "A"와의 아스키코드 차이를 보아 최소 이동 횟수 구하기(총 알파벳 개수 26개의 절반인 13번째 기준)
        const mv = (ascii - asciiA <= 13) ? (ascii - asciiA) : (26 - (ascii - asciiA));

        // 결과 저장
        moves.push(mv);
        done.push(mv === 0);
    }

    // 시작점에서 위아래 이동
    answer += moves[0];
    moves[0] = 0;
    done[0] = true;


    // 현위치에서 최소 이동값 더해주기
    const results = [];
    results.push(minMoves(0, moves, done, "left"));
    // done 배열 초기화
    for (let i = 1; i < len; i++)
        done[i] = (moves[i] === 0);
    results.push(minMoves(0, moves, done, "right"));

    answer += Math.min(...results);
    return answer;
}

// 특정 위치에서 좌/우로 이동할 때 이동 최소값을 반환하는 함수
function minMoves(start, moves, done, direction) {
    // 더이상 이동할 필요가 없는 경우
    if (!needToProceed(done)) return 0;

    // 위치 이동
    var pos = directionIndex(start, moves.length, direction);
    var curMoves = 1;
    while (done[pos]) {
        pos = directionIndex(pos, moves.length, direction);
        curMoves++;
    }

    // 현위치에서 위아래로 이동
    curMoves += moves[pos];
    done[pos] = true;

    // 현재 done 상태 저장
    const tempDone = [];
    for (let i = 0; i < moves.length; i++)
        tempDone.push(done[i]);

    const results = [];
    results.push(minMoves(pos, moves, done, "left"));
    done = tempDone;
    results.push(minMoves(pos, moves, done, "right"));
    // 결과 반환
    return curMoves + Math.min(...results);
}



// 횟수가 조금이라도 남아있는지 확인하는 함수
function needToProceed(done) {
    /* 원래 그냥 done.filter이라고 했는데, 
    done.filter is not a function 이라는 에러가 떠서
    찾아보니 유사배열이 되어버린 것 같다.
    그래서, Array.from()을 이용하여 배열메소드를 사용할 수 있게
    바꿔주었다.
    */
    return Array.from(done).filter((i) => (!i)).length !== 0;
}

// 왼쪽이나 오른쪽으로 이동했을 때 구해지는 인덱스 반환
function directionIndex(index, total, direction) {
    switch (direction) {
        case "left":
            return (index - 1 >= 0) ? (index - 1) : (index - 1 + total);

        case "right":
            return (index + 1) % total;
    }
}




// 2nd try: 현위치에서, 왼쪽 모든 이동과 오른쪽 모든 이동을 고려했을 때 더 적게 이동하는 곳으로 이동하게 했으나, 답이 틀림.

// function solution(name) {
//     var answer = 0;

//     // "A"의 아스키 코드 받아오기
//     const asciiA = "A".charCodeAt(0); // 65 고정

//     // 각 자리에서 위아래로 이동해야할 최소 횟수 받아오기
//     const moves = [];
//     const len = name.length;
//     for (let i = 0; i < len; i++) {
//         // 아스키코드 값을 받아온다
//         const ascii = name.charCodeAt(i);
//         // "A"와의 아스키코드 차이를 보아 최소 이동 횟수 구하기(총 알파벳 개수 26개의 절반인 13번째 기준)
//         const mv = (ascii - asciiA <= 13) ? (ascii - asciiA) : (26 - (ascii - asciiA));

//         // 결과 저장
//         moves.push(mv);
//     }

//     // 현위치의 문자 먼저 바꿔준다
//     var current = 0;
//     answer += moves[current];
//     moves[0] = 0;

//     // 남은 문자들 중, 가운데 기준으로 총 이동횟수가 더 적은 방향으로 이동한다
//     while (needToProceed(moves)) {
//         // 현재 위치 기준으로 해당 위치의 문자를 바꾸기까지 이동해야할 총 횟수 계산
//         const curStates = moves.map((move, index) => {
//             // 이동할 필요가 없는 곳은 0으로 처리
//             if (move === 0) return 0;

//             // 좌우로 이동해야할 최소 횟수 계산
//             var horiz = Math.abs(current - index);
//             horiz = (horiz <= len / 2) ? horiz : (len - horiz);

//             // 좌우 이동횟수와 문자 이동횟수 더해서 반환
//             return horiz + move;
//         })

//         // 바꿀 필요 있는 요소들의 개수 구하기
//         const req = curStates.filter((move) => (move !== 0)).length;

//         // 현위치부터, 바꿀 요소들을 절반까지 탐색하며 총 이동횟수 계산
//         var count = 0, rightSum = 0;
//         for (let i = directionIndex(current, moves.length, "right"); count < Math.floor(req / 2); i = directionIndex(i, moves.length, "right")) {
//             if (curStates[i] !== 0) {
//                 rightSum += curStates[i];
//                 count++;
//             }
//         }

//         // 나머지 절반(단, 홀수개인 경우 정중앙 제외)을 탐색하며 총 이동횟수 계산
//         var leftSum = 0; count = 0;
//         for (let i = directionIndex(current, moves.length, "left"); count < Math.floor(req / 2); i = directionIndex(i, moves.length, "left")) {
//             if (curStates[i] !== 0) {
//                 leftSum += curStates[i];
//                 count++;
//             }
//         }

//         // 두 방향 중 더 이동횟수가 짧은 방향으로 이동
//         if (leftSum < rightSum) {
//             current = directionIndex(current, moves.length, "left");
//             while (curStates[current] === 0)
//                 current = directionIndex(current, moves.length, "left");
//             answer += curStates[current];
//             moves[current] = 0;
//         }
//         else {
//             current = directionIndex(current, moves.length, "right");
//             while (curStates[current] === 0)
//                 current = directionIndex(current, moves.length, "right");
//             answer += curStates[current];
//             moves[current] = 0;
//         }
//     }

//     return answer;
// }



// 1st try: 양옆 중 더 적은 횟수로 이동(예외가 발생하는 듯 하다.)

// function solution(name) {
//     var answer = 0;

//     // "A"의 아스키 코드 받아오기
//     const asciiA = "A".charCodeAt(0); // 65 고정

//     // 각 자리에서 위아래로 이동해야할 최소 횟수 받아오기
//     const moves = [];
//     const len = name.length;
//     for (let i = 0; i < len; i++) {
//         // 아스키코드 값을 받아온다
//         const ascii = name.charCodeAt(i);
//         // "A"와의 아스키코드 차이를 보아 최소 이동 횟수 구하기(총 알파벳 개수 26개의 절반인 13번째 기준)
//         const mv = (ascii - asciiA <= 13) ? (ascii - asciiA) : (26 - (ascii - asciiA));

//         // 결과 저장
//         moves.push(mv);
//     }

//     // 현위치에서 각 문자를 바꾸는데 필요한 이동횟수를 갱신해가며, 양옆 위치중 더 이동횟수가 짧은 곳 위주로 먼저 간다
//     var current = 0;
//     // 첫 글자 바꾸기
//     answer += moves[current];
//     moves[current] = 0;

//     while (needToProceed(moves)) {
//         // 현위치에서 양옆(A 제외) 문자들을 바꾸는데 필요한 이동횟수 계산
//         var leftMoves, rightMoves;
//         // 왼쪽에 있는 문자 탐색
//         let index = directionIndex(current, moves.length, "left");
//         var horiz = 1;
//         while (moves[index] === 0) {
//             index = directionIndex(index, moves.length, "left")
//             horiz++;
//         }
//         const leftIndex = index;
//         leftMoves = horiz + moves[index];

//         // 오른쪽에 있는 문자 탐색
//         index = directionIndex(current, moves.length, "right");
//         horiz = 1;
//         while (moves[index] === 0) {
//             index = directionIndex(index, moves.length, "right")
//             horiz++;
//         }
//         const rightIndex = index;
//         rightMoves = horiz + moves[index];

//         // 둘 중 더 이동횟수가 적은 곳으로 이동
//         if (leftMoves < rightMoves) {
//             answer += leftMoves;
//             current = leftIndex;
//             moves[leftIndex] = 0;
//         }
//         else {
//             answer += rightMoves;
//             current = rightIndex;
//             moves[rightIndex] = 0;
//         }
//     }

//     return answer;
// }