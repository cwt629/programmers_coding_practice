/* 
[2단계] 멀쩡한 사각형
(Summer/Winter Coding(2019))
*/

function solution(w, h) {
    var answer = 0;
    var blocksBeenCut = 0;

    // 좌표평면이라고 생각하고, 자른 대각선을 원점을 지나는 직선(y=ax)으로 잡는다. 이하는 기울기.
    //const slope = h / w;

    // x=정수 인 선분들 기준으로 잘라 블록들을 본다
    // 이 때, 오른쪽 경계에 맞닿는 y좌표는 ceiling 함수를, 왼쪽 경계에 맞닿는 y좌표는 floor 함수를 적용시키고 그 둘의 차이를 통해 지나는 블록의 개수를 본다.
    for (let x = 0; x < w; x++) {
        blocksBeenCut += (Math.ceil((x + 1) * h / w) - Math.floor(x * h / w));
    }

    // 자른 블록만큼 제거
    answer = w * h - blocksBeenCut;
    return answer;
}