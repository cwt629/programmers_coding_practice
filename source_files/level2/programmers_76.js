/* 
[2단계] 전력망을 둘로 나누기
(위클리 챌린지)
*/

class Tower {
    constructor(number) {
        this.name = number;
        // 탐색 과정에서 방문 여부
        this.visited = false;
        // 해당 송전탑과 연결된 다른 송전탑들
        this.connected = [];
    }
}

function solution(n, wires) {
    var answer = n;
    // 송전탑의 배열
    var towers = [null];

    // 각 송전탑 선언
    for (let i = 1; i <= n; i++) {
        towers[i] = new Tower(i);
    }

    // wires 배열 탐색하여 연결된 송전탑들 저장
    wires.forEach((wire) => {
        towers[wire[0]].connected.push(wire[1]);
        towers[wire[1]].connected.push(wire[0]);
    })

    // DFS 방식(스택 이용)으로 탐색
    const dfsStack = [];
    var linked; // 끊어진 wire의 한쪽에서 모두 연결할 때 연결되는 탑의 개수

    // wires에 있는 각 wire를 모두 끊어본다
    wires.forEach((wire) => {
        // 연결된 탑의 개수 초기화
        linked = 0;
        // 현재 wire의 한쪽을 시작점으로 탐색
        dfsStack.push(wire[0]);
        towers[wire[0]].visited = true;

        while (dfsStack.length > 0) {
            // 스택에서 다음 탐색점 가져오기
            const current = dfsStack.pop();
            linked++;
            // 해당 탐색점에서 연결된 지점들 탐색
            towers[current].connected.forEach((next) => {
                // 해당 지점이 서로 잘린 지점이 아니고, 이미 방문한 지점이 아니면 탐색
                if (!((current === wire[0] && next === wire[1])
                    || towers[next].visited)) {
                    dfsStack.push(next);
                    towers[next].visited = true;
                }
            })
        }

        // 마무리된 이후, 차이 계산(한쪽은 linked, 나머지는 n - linked)
        const temp = Math.abs(linked - (n - linked));

        // 갱신 필요 시 갱신
        if (temp < answer)
            answer = temp;

        // visited 초기화
        for (let i = 1; i <= n; i++) {
            towers[i].visited = false;
        }
    })

    return answer;
}