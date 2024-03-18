/* 
[2단계] 테이블 해시 함수
(연습문제)
*/

function solution(data, col, row_begin, row_end) {
    // 2. 정렬 과정
    data.sort((t1, t2) => {
        if (t1[col - 1] === t2[col - 1])
            return t2[0] - t1[0];
        return t1[col - 1] - t2[col - 1];
    });

    // 3-4. S_i 찾고 매번 xor해주기(결합법칙 성립하므로 상관없음)
    let answer = -1;
    for (let i = row_begin; i <= row_end; i++) {
        // 인덱스는 i - 1임을 명심하자
        let Si = data[i - 1].reduce((acc, cur) => {
            acc += cur % i;
            return acc;
        }, 0);

        // 기존값과 xor하기. 초기값인 경우는 바로 저장해주기
        (answer >= 0) ? answer = answer ^ Si : answer = Si;
    }

    return answer;
}