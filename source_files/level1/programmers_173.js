/* 
[1단계] 옹알이(2)
(연습문제)
*/

function solution(babbling) {
    let answer = 0;

    babbling.forEach((word) => {
        let i = 0;
        while (i < word.length) {
            // 두글자 체크
            let checking = word.substring(i, i + 2);
            if (checking === "ye" || checking === "ma") {
                // 연속해서 같은 단어를 말하면 안된다
                let nextCheck = word.substring(i + 2, i + 4);
                if (nextCheck == checking) return;
                // 통과 시 인덱스 이동
                i += 2;
                continue;
            }

            // 세글자 체크
            checking += word.charAt(i + 2);
            if (checking === "aya" || checking === "woo") {
                // 연속 확인
                let nextCheck = word.substring(i + 3, i + 6);
                if (nextCheck == checking) return;
                // 통과 시 인덱스 이동
                i += 3;
                continue;
            }

            // 위 체크에 아무 곳에서도 걸러지지 않으면 발음 못한다
            return;
        }

        // 체크에서 무사히 빠져나왔으면, 발음 가능한 단어임
        answer++;
    })
    return answer;
}