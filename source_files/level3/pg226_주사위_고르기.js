/*
[3단계] 주사위 고르기
(2024 KAKAO WINTER INTERNSHIP)
*/

function solution(dice) {
    var answer = [];
    let diceNumbers = Array.from({ length: dice.length }, (d, i) => (i + 1));

    let combinations = getCombination(diceNumbers, diceNumbers.length / 2); // 주사위 가져가는 조합 수

    // 각 조합에 대해서 승률을 계산한다(모두 게임 횟수는 동일하므로, 승리 횟수만 센다)
    let max = -1;
    for (let combination of combinations) {
        let victory = 0;
        // 상대의 주사위 배열을 구한다
        let opponent = [];
        let ptr = 0;
        for (let i = 1; i <= diceNumbers.length; i++) {
            if (ptr >= combination.length || combination[ptr] !== i)
                opponent.push(i);
            else
                ptr++;
        }

        // 나올수 있는 모든 주사위 합을 나열한다
        let mySums = [];
        let oppoSums = [];

        const dfs = (diceIndex, acc, type) => {
            switch (type) {
                case "me":
                    // 마지막인 경우
                    if (diceIndex >= combination.length) {
                        mySums.push(acc);
                        return;
                    }
                    for (let number of dice[combination[diceIndex] - 1]) {
                        dfs(diceIndex + 1, acc + number, type);
                    }
                    break;

                case "opponent":
                    // 마지막인 경우
                    if (diceIndex >= opponent.length) {
                        oppoSums.push(acc);
                        return;
                    }
                    for (let number of dice[opponent[diceIndex] - 1]) {
                        dfs(diceIndex + 1, acc + number, type);
                    }
                    break;
            }
        }

        dfs(0, 0, "me");
        dfs(0, 0, "opponent");

        // 나와 상대의 합을 오름차순 정렬한다
        mySums.sort((a, b) => (a - b));
        oppoSums.sort((a, b) => (a - b));

        // 합끼리 서로 대결한다
        let sumptr = 0;
        for (let mySum of mySums) {
            for (let i = sumptr; i < oppoSums.length; i++) {
                // 현재 상대 점수가 내 점수 이상인 경우, 더이상 진행하지 않는다
                if (oppoSums[i] >= mySum) break;
                sumptr++;
            }
            // sumptr이 가리키는 점 직전까지는 모두 이길 수 있음
            victory += sumptr;
        }

        // 해당 승수가 제일 높다면 갱신해준다
        if (max < victory) {
            max = victory;
            answer = combination; // 이미 오름차순 정렬되어있음
        }
    }

    return answer;
}

// 주어진 배열에서 n개를 뽑는 조합을 쭉 받아오는 함수
function getCombination(array, selection) {
    if (selection === 1) {
        return array.map((element) => ([element]));
    }

    let combinations = [];

    for (let i = 0; i < array.length; i++) {
        let remaining = array.slice(i + 1);
        let combs = getCombination(remaining, selection - 1);
        let curComb = combs.map((comb) => ([array[i], ...comb]));
        combinations.push(...curComb);
    }

    return combinations;
}