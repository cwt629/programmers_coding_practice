/* 
[1단계] 크레인 인형뽑기 게임
(2019 카카오 개발자 겨울 인턴십)
*/

function solution(board, moves) {
    var answer = 0;
    // 인형을 집어서 담을 바구니 배열 선언
    var basket = [];
    // 기타 변수 선언
    var col, depth;

    // 각 moves에 대해 명령 수행
    moves.forEach(function (param) {
        // 각 위치를 2차원 배열의 인덱스로 치환
        col = param - 1; depth = 0;
        // 뽑을 인형의 위치 찾기(0이 아닐 때까지 아래로 내려간다)
        // 이차원 배열 자체의 length는 열의 개수를 센다.
        while (depth < board.length && board[depth][col] === 0) {
            depth++;
        }

        // 뽑을 인형이 있다면
        if (depth < board.length) {
            // 그 인형을 바구니에 넣어준다
            basket.push(board[depth][col]);
            // 그 인형이 있던 위치를 비워준다
            board[depth][col] = 0;

            // 그 인형이 이전에 있던 인형과 같은 인형인 경우
            const numInBasket = basket.length;
            if (numInBasket > 1 &&
                basket[numInBasket - 1] === basket[numInBasket - 2]) {
                // basket에서 두 인형을 터트린다
                basket.pop();
                basket.pop();
                // 그만큼 count해준다
                answer += 2;
            }
        }
    })

    return answer;
}