/* 
[1단계] 직사각형 별찍기
(연습문제)
*/

process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const n = data.split(" ");
    const a = Number(n[0]), b = Number(n[1]);

    // 줄마다 출력할 별 문자열 받기
    const star = Array.from({ length: a }, () => ("*")).join("");

    // 각 줄마다 출력
    for (let i = 0; i < b; i++) {
        console.log(star);
    }
});