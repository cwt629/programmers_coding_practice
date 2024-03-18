/* 
[3단계] 카운트 다운
(연습문제)
*/

function solution(target) {
    let bfsQueue = [{ dart: 0, score: target, bonus: 0 }]; // bonus: 싱글 및 불 맟춘 횟수

    // BFS 방식으로 탐색(보너스가 높은 거 우선으로 넣어줌)
    while (bfsQueue.length > 0) {
        let current = bfsQueue.shift();

        // 점수대에 따라 다르게 판정
        switch (typeOf(current.score)) {
            case "above 600":
                /* 600 초과:
                트리플 5회(300점)로 빠르게 깎아내는 과정 필요.
                300점은 50과 60의 최소공배수로 유도하여,
                불 6번보다 트리플 5번으로 깎는게 더 효율적이므로 기준을 이렇게 잡았다.
                단, 그렇게 깎은 뒤 남은 점수가 300점 이하면
                그 직전에 트리플보다 불을 쏘는 게 더 나을 수도 있어 고려가 필요하다.
                그러므로, 600점 초과로 기준을 잡게 되었다.
                */
                bfsQueue.push({
                    dart: current.dart + 5,
                    score: current.score - 300,
                    bonus: current.bonus
                });
                break;

            case "1 to 20":
                // 1~20: 싱글로 마무리
                return [current.dart + 1, current.bonus + 1];

            case "21 to 40":
                // 21~40 중 짝수/3의 배수: 각각 더블/트리플로 마무리
                if (current.score % 2 === 0 || current.score % 3 === 0)
                    return [current.dart + 1, current.bonus];

                // 21~40 중 짝수도 3의 배수도 아닌 수: 20 빼주기(싱글)
                bfsQueue.push({
                    dart: current.dart + 1,
                    score: current.score - 20,
                    bonus: current.bonus + 1
                });
                break;

            case "41 to 60":
                // 50: 불로 마무리
                if (current.score === 50) return [current.dart + 1, current.bonus + 1];

                // 3의 배수: 트리플로 마무리
                if (current.score % 3 === 0) return [current.dart + 1, current.bonus];

                // 51~59(3의 배수 제외): 불 + 싱글 유도
                if (current.score > 50)
                    bfsQueue.push({
                        dart: current.dart + 1,
                        score: current.score - 50,
                        bonus: current.bonus + 1
                    })
                // 41~49: 트리플 + 싱글 유도
                else bfsQueue.push({
                    dart: current.dart + 1,
                    score: current.score % 3,
                    bonus: current.bonus
                });
                break;

            case "above 60":
                // 불을 맞추거나, 트리플(60점)을 맞춘다
                bfsQueue.push({
                    dart: current.dart + 1,
                    score: current.score - 50,
                    bonus: current.bonus + 1
                });
                bfsQueue.push({
                    dart: current.dart + 1,
                    score: current.score - 60,
                    bonus: current.bonus
                });
                break;
        }
    }
}

// 주어진 수의 범위에 따라 타입을 나누는 함수
function typeOf(number) {
    if (number > 600) return "above 600";

    if (number > 60) return "above 60";

    if (number > 40) return "41 to 60";

    if (number > 20) return "21 to 40";

    return "1 to 20";
}