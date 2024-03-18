/* 
[1단계] 바탕화면 정리
(연습문제)
*/

function solution(wallpaper) {
    // wallpaper에서 각 파일의 왼쪽위 꼭지점 좌표를 받아온다
    let coords = [];
    
    for (let row = 0; row < wallpaper.length; row++){
        for (let col = 0; col < wallpaper[row].length; col++){
            if (wallpaper[row].charAt(col) === "#")
                coords.push([row, col]);
        }
    }
    
    // coords에서 x, y의 최소값이 시작, x , y의 최대값 + 1이 끝이다.
    let lux = getMaxOrMin(coords, 0, "min"),
        luy = getMaxOrMin(coords, 1, "min"),
        rdx = getMaxOrMin(coords, 0, "max") + 1,
        rdy = getMaxOrMin(coords, 1, "max") + 1;
    
    return [lux, luy, rdx, rdy];
}

// 크기 2짜리 배열에서 index번째 요소들을 추려내 그 최대나 최소값을 구하는 함수
function getMaxOrMin(coords, index, type){
    let points = coords.map((coord) => (coord[index]));
    
    switch(type){
        case "max":
            return Math.max(...points);
            
        case "min":
            return Math.min(...points);
    }
}