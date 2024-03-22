/*
[2단계] 주식가격
(연습문제: 스택/큐)
*/

class PriceBlock {
    constructor(price, time) {
        this.price = price;
        this.time = time;
    }
}

function solution(prices) {
    let answer = [];
    let priceStack = [];
    let time;

    for (time = 0; time < prices.length; time++) {
        // 1. 현시점 가격보다 높은 가격들을 모두 pop하고, 그에 대한 시간들을 기록한다
        for (let i = priceStack.length - 1; i >= 0 && priceStack[i].price > prices[time]; i--) {
            let priceData = priceStack.pop();
            answer[priceData.time] = time - priceData.time;
        }

        // 2. 현시점 가격을 stack에 넣는다
        priceStack.push(new PriceBlock(prices[time], time));
    }

    // 스택에 남은 지점들에 대해 시간 기록
    while (priceStack.length > 0) {
        let priceData = priceStack.pop();
        answer[priceData.time] = time - 1 - priceData.time; // for문을 벗어나 time이 1 증가되어있으므로, 1 빼줌
    }

    return answer;
}