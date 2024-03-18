/* 
[2단계] 영어 끝말잇기
(Summer/Winter Coding(~2018))
*/

function solution(n, words) {
    var answer = [0, 0];
    // 몇 바퀴 째인지를 나타내는 변수
    var turn = 0;
    // 등장한 단어들의 모음
    const done = [];

    // words 탐색
    for (let i = 0; i < words.length; i++) {
        // 시작한 플레이어의 차례가 돌아올 때마다 바퀴 수 갱신
        if (i % n === 0) turn++;
        // 해당 단어가 있으면 탈락
        if (done.includes(words[i]))
            return [i % n + 1, turn];
        // 앞선 단어의 끝글자와 이번 단어의 첫글자가 다르면 탈락
        if (i > 0 && words[i - 1].charAt(words[i - 1].length - 1) !== words[i].charAt(0))
            return [i % n + 1, turn];
        // 탈락하지 않은 경우, done 저장
        done.push(words[i]);
    }

    return answer;
}