/*
[1단계] 가장 많이 받은 선물
(2024 KAKAO WINTER INTERNSHIP)
*/

class GiftNode {
    constructor(name, friends) {
        this.name = name;
        this.send = new Map(); // 내가 선물을 보낸 친구들의 이름과 그 개수
        this.receive = new Map(); // 내가 선물을 받은 친구들의 이름과 그 개수
        this.nextGift = 0; // 다음에 받게 될 선물
        this.init(friends);
    }

    init(friends) {
        for (let friend of friends) {
            if (friend === this.name) continue;
            this.send.set(friend, 0);
            this.receive.set(friend, 0);
        }
    }

    sendGift(friend) {
        this.send.set(friend, this.send.get(friend) + 1);
    }

    receiveGift(friend) {
        this.receive.set(friend, this.receive.get(friend) + 1);
    }

    getSentData(friend) {
        return this.send.get(friend);
    }

    getGiftPoint() {
        let totalSent = Array.from(this.send.values()).reduce((acc, cur) => (acc + cur), 0);
        let totalReceived = Array.from(this.receive.values()).reduce((acc, cur) => (acc + cur), 0);

        return totalSent - totalReceived;
    }

    grantNextGift() {
        this.nextGift++;
    }

    getNextGift() {
        return this.nextGift;
    }
}

function solution(friends, gifts) {
    let answer = -1;

    // 각 friends에 대해 node 생성 및 초기화
    let nodes = new Map();
    for (let friend of friends) {
        nodes.set(friend, new GiftNode(friend, friends));
    }

    // 선물 데이터 저장
    for (let data of gifts) {
        let [sent, received] = data.split(" ");
        nodes.get(sent).sendGift(received);
        nodes.get(received).receiveGift(sent);
    }

    // 다음 달 선물 저장
    let friendNodes = Array.from(nodes.values());

    for (let i = 0; i < friendNodes.length; i++) {
        for (let j = i + 1; j < friendNodes.length; j++) {
            let friend1 = friendNodes[i], friend2 = friendNodes[j];

            // 주고받은 내역이 같은 경우(0 포함)
            if (friend1.getSentData(friend2.name) === friend2.getSentData(friend1.name)) {
                // 선물 지수 계산
                let [point1, point2] = [friend1.getGiftPoint(), friend2.getGiftPoint()];
                if (point1 !== point2) {
                    (point1 > point2) ?
                        friend1.grantNextGift() : friend2.grantNextGift();
                }
                continue;
            }

            // 주고받은 내역이 다른 경우 : 더 많은 선물을 준 사람
            (friend1.getSentData(friend2.name) > friend2.getSentData(friend1.name)) ?
                friend1.grantNextGift() : friend2.grantNextGift();
        }
    }

    // 가장 많이 받는 선물 개수 기록
    for (let node of nodes.values()) {
        if (answer < node.getNextGift())
            answer = node.getNextGift();
    }

    return answer;
}