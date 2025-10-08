/*
[3단계] n+1 카드게임
(2024 KAKAO WINTER INTERNSHIP)
*/

class Node {
    constructor(number){
        this.number = number;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
    }
    
    add(number){
        const newNode = new Node(number);
        if (!this.head){
            this.head = newNode;
        }
        if (this.tail){
            this.tail.next = newNode;
            newNode.prev = this.tail;
        }
        this.tail = newNode;
    }
    
    delete(node){
        if (node === this.tail){
            this.tail = node.prev;
        }
        if (node === this.head){
            this.head = node.next;
        }
        if (node.prev){
            node.prev.next = node.next;
        }
        if (node.next){
            node.next.prev = node.prev;
        }
    }
    
    search(number){
        for (let current = this.head; current; current = current.next){
            if (current.number === number){
                return current;
            }
        }
        return null;
    }
    
    getTwin(targetSum){
        for (let current = this.head; current; current = current.next){
            for (let target = current.next; target; target = target.next){
                if (current.number + target.number === targetSum){
                    return [current, target];
                }
            }
        }
        
        return null;
    }
}

function solution(coin, cards) {
    let answer = 1;
    const cardOnHand = new DoublyLinkedList(),
        keepings = new DoublyLinkedList();
    let combinations = 0;
    const targetSum = cards.length + 1;
    
    // 시작: n/3장의 카드 뽑기
    for (let i = 0; i < cards.length / 3; i++){
        cardOnHand.add(cards[i]);
        const twinNode = cardOnHand.search(targetSum - cards[i]);
        if (twinNode){
            combinations++;
            // 손패에서는 낸 것 취급하기
            cardOnHand.delete(cards[i]);
            cardOnHand.delete(twinNode);
        }
    }
    
    let cardIndex = cards.length / 3;
    while (cardIndex < cards.length){
        // 2장을 keep해둔다
        keepings.add(cards[cardIndex]);
        keepings.add(cards[cardIndex + 1]);
        
        // 조합이 아직 남아있는 경우, 조합을 우선으로 소비
        if (combinations > 0){
            answer++;
            combinations--;
        }
        else {
            if (coin < 1){
                break;
            }
            // 조합이 없는 경우, 손패와 keepings에서 하나씩 있는지 살펴본다
            let twinNode = null, currentHand = cardOnHand.head;
            while (currentHand) {
                const currentNumber = currentHand.number;
                twinNode = keepings.search(targetSum - currentNumber);
                if (twinNode) {
                    break;
                }
                currentHand = currentHand.next;
            }
            if (twinNode){
                answer++;
                coin--;
                cardOnHand.delete(currentHand);
                keepings.delete(twinNode);
            }
            // 그것도 없는 경우, keepings 안에서 쌍이 있는지 살펴본다
            else {
                if (coin < 2){
                    break;
                }
                
                const twins = keepings.getTwin(targetSum);
                if (!twins) {
                    break;
                }
                answer++;
                coin -= 2;
                keepings.delete(twins[0]);
                keepings.delete(twins[1]);
            }
        }
        
        cardIndex += 2;
    }
    
    return answer;
}

/* 1st try: DFS 완전탐색 -> 시간 초과(45 / 100점) */
// function solution(coin, cards) {
//     let answer = 0;
//     let cardOnHand = Array.from({length: cards.length + 1}, () => (false));
//     const targetSum = cards.length + 1;
    
//     // 시작: n/3장 뽑기
//     for (let i = 0; i < cards.length / 3; i++){
//         cardOnHand[cards[i]] = true;
//     }
    
//     // 초기 조합의 개수를 미리 센다
//     let startCombinations = 0;
//     for (let i = 1; i < cardOnHand.length; i++){
//         if (cardOnHand[i] && cardOnHand[targetSum - i]){
//             startCombinations++;
//         }
//     }
//     startCombinations /= 2; // 중복하여 센 값 제거(짝수이므로 가능)
    
//     const dfs = (currentRound, coinsLeft, combinations) => {
//         // 카드를 뽑아 조합을 갱신하고, 추가된 조합의 수를 반환하는 함수
//         const drawCard = (cardNumber) => {
//             let additionalCombinations = 0;
//             cardOnHand[cardNumber] = true;
//             if (cardOnHand[targetSum - cardNumber]){
//                 additionalCombinations++;
//             }
//             return additionalCombinations;
//         }
        
//         // 카드 2장 뽑고, 코인을 사용하여 가져가거나 버리기 -> 그 후 조합 1개 소진
//         const cardStartIndex = cards.length / 3 + (currentRound - 1) * 2;
//         // 이미 모든 카드를 뽑은 경우, 현재 라운드 + 1로 정답 갱신
//         if (cardStartIndex >= cards.length) {
//             answer = (answer < currentRound)? currentRound : answer;
//             return;
//         }
        
//         const drawnFirst = cards[cardStartIndex],
//               drawnSecond = cards[cardStartIndex + 1];
        
//         // 1. 2장 모두 가져가기
//         if (coinsLeft >= 2){
//             let nextCombinations = combinations;
//             nextCombinations += drawCard(drawnFirst) + drawCard(drawnSecond);
//             if (nextCombinations <= 0){
//                 answer = (answer < currentRound)? currentRound : answer;
//             } else {
//                 dfs(currentRound + 1, coinsLeft - 2, nextCombinations - 1);
//             }
//             cardOnHand[drawnFirst] = false;
//             cardOnHand[drawnSecond] = false;
//         }
//         // 2. 전자만 가져가기
//         if (coinsLeft >= 1){
//             let nextCombinations = combinations;
//             nextCombinations += drawCard(drawnFirst);
//             if (nextCombinations <= 0){
//                 answer = (answer < currentRound)? currentRound : answer;
//             } else {
//                 dfs(currentRound + 1, coinsLeft - 1, nextCombinations - 1);
//             }
//             cardOnHand[drawnFirst] = false;
//         }
        
//         // 3. 후자만 가져가기
//         if (coinsLeft >= 1){
//             let nextCombinations = combinations;
//             nextCombinations += drawCard(drawnSecond);
//             if (nextCombinations <= 0){
//                 answer = (answer < currentRound)? currentRound : answer;
//             } else {
//                 dfs(currentRound + 1, coinsLeft - 1, nextCombinations - 1);
//             }
//             cardOnHand[drawnSecond] = false;
//         }
        
//         // 4. 모두 버리기
//         if (combinations <= 0){
//             answer = (answer < currentRound)? currentRound : answer;
//             return;
//         }
//         dfs(currentRound + 1, coinsLeft, combinations - 1);
//     }
    
//     dfs(1, coin, startCombinations);
    
//     return answer;
// }