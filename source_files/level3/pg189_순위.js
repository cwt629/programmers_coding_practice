/* 
[3단계] 순위
(연습문제: 그래프)
*/

// 각 선수에 대한 데이터
class Player {
    constructor(index) {
        this.index = index;
        this.win = new Set(); // 이 선수가 이기는 선수들의 번호
        this.lose = new Set(); // 이 선수가 지는 선수들의 번호
    }

    // 이기는 선수 추가
    addWin(num) {
        if (num !== this.index) this.win.add(num);
    }

    // 지는 선수 추가
    addLose(num) {
        if (num !== this.index) this.lose.add(num);
    }

    // win에 여러 요소를 추가하는 함수
    addMultipleWins(elements) {
        for (let element of elements) {
            this.addWin(element);
        }
    }

    // 자기가 이기는 선수가 이기는 선수를 반영
    updateWin(players, visited) {
        // visited돼있는 경우, 저장돼있는 그대로 반환
        if (visited[this.index]) return [this.index, ...this.win];

        visited[this.index] = true;
        let indices = [];
        for (let index of this.win) {
            // 내가 이기는 선수가 이기는 선수는, 나도 이길 수 있다
            let wins = [...players[index].updateWin(players, visited)];
            indices.push(...wins);
        }

        this.addMultipleWins(indices);

        return [this.index, ...indices];
    }

    // 순위를 매길 수 있는지 체크
    rankable(totalPlayers) {
        // 이기는 선수 + 지는 선수 + 본인 = 전체 인원 인 경우 순위를 매길 수 있다!
        return this.win.size + this.lose.size + 1 === totalPlayers;
    }
}

function solution(n, results) {
    var answer = 0;
    // 각 플레이어 정보
    let players = [null];
    for (let i = 1; i <= n; i++) {
        players[i] = new Player(i);
    }

    // 이기는 정보만 저장해준다
    for (let [won, lost] of results) {
        players[won].addWin(lost);
    }

    // DFS 방식으로 이기는 모든 선수를 조사한다
    let visited = Array.from({ length: n + 1 }, () => (false));
    for (let i = 1; i <= n; i++) {
        players[i].updateWin(players, visited);
    }

    // 반대로 지는 선수들도 저장해준다
    for (let i = 1; i <= n; i++) {
        for (let lost of players[i].win) {
            players[lost].addLose(i);
        }
    }

    // 순위를 매길 수 있는 플레이어 수
    return players.filter((player) => (player && player.rankable(n))).length;
}