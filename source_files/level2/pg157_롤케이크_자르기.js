/* 
[2단계] 롤케이크 자르기
(연습문제)
*/

class Toppings {
    constructor(toppings) {
        this.info = new Map(); // 어떤 토핑이 몇개 있는지 저장
        this.sorts = 0; // 토핑의 가짓수

        this.addToppingInArray(toppings);
    }

    // 특정 토핑을 반영하는 함수
    addTopping(topping) {
        if (!this.info.has(topping)) this.info.set(topping, 0);
        if (this.info.get(topping) === 0) this.sorts++; // 0에서 1로 오르는 과정

        this.info.set(topping, this.info.get(topping) + 1);
    }

    // 토핑 여러개가 담긴 배열을 반영하는 함수
    addToppingInArray(array) {
        array.forEach((topping) => {
            this.addTopping(topping);
        })
    }

    // 토핑 하나를 제거하는 함수
    removeTopping(topping) {
        this.info.set(topping, this.info.get(topping) - 1);

        // 1->0개가 되면, 종류에서 제거
        if (this.info.get(topping) === 0) this.sorts--;
    }
}

function solution(topping) {
    let answer = 0;
    // 철수는 왼쪽, 동생은 나머지 오른쪽
    const cheolsu = new Toppings([]);
    const brother = new Toppings(topping);

    // 슬라이딩 윈도우 방식 활용: 하나씩 철수 쪽으로 가져온다
    for (let current = 0; current < topping.length - 1; current++) {
        brother.removeTopping(topping[current]);
        cheolsu.addTopping(topping[current]);

        // 토핑 가짓수가 같은지 확인
        if (cheolsu.sorts === brother.sorts) answer++;
    }

    return answer;
}