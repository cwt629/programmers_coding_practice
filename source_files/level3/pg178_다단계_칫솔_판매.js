/* 
[3단계] 다단계 칫솔 판매
(2021 Dev-Matching: 웹 백엔드 개발자(상반기))
*/

// 각 판매원을 상징하는 노드
class Seller {
    constructor(name) {
        this.name = name;
        this.recommender = null;
        this.profit = 0;
    }

    // 추천인 노드를 연결하는 함수
    connectRecommender(recNode) {
        this.recommender = recNode;
    }

    // 이익을 받아 분배하는 함수
    grantProfit(profit) {
        // 떼어줘야 하는 이익
        const payToShare = Math.floor(profit / 10);

        // 본인 이익 챙기기
        this.profit += (profit - payToShare);
        // 본인을 추천한 사람에게 이익 나누기
        if (this.recommender && payToShare > 0)
            this.recommender.grantProfit(payToShare);
    }
}

function solution(enroll, referral, seller, amount) {
    let answer = [];
    const sellerData = new Map(); // 각 판매원의 노드를 저장할 맵
    sellerData.set("-", new Seller("-")); // 루트 노드 저장
    // 각 판매원들의 노드 저장
    for (let member of enroll)
        sellerData.set(member, new Seller(member));

    // 각 판매원들의 추천 관계 저장
    for (let i = 0; i < referral.length; i++) {
        // 각 판매원 노드
        const sellerNode = sellerData.get(enroll[i]);
        const recNode = sellerData.get(referral[i]);
        sellerNode.connectRecommender(recNode); // 연결
    }

    // 각 판매 이익 배분
    for (let i = 0; i < seller.length; i++) {
        const sellerNode = sellerData.get(seller[i]);
        sellerNode.grantProfit(amount[i] * 100); // 판매 갯수 * 100원의 이익
    }

    // 결과 반환
    return enroll.map((member) => (sellerData.get(member).profit));
}