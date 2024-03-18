/*
[1단계] 푸드 파이트 대회
(연습문제)
*/

function solution(food) {
    let arrange = [];

    food.forEach((quantity, idx) => {
        if (idx === 0) return;

        let foodQty = Math.floor(quantity / 2);
        for (let i = 0; i < foodQty; i++)
            arrange.push(idx);
    })

    let leftArrange = [...arrange];

    // 물의 배치
    let waterArrange = Array.from({ length: food[0] }, () => (0));

    // 만들어진 배치의 역순
    arrange.reverse();
    let rightArrange = [...arrange];

    return [...leftArrange, ...waterArrange, ...rightArrange].join("");
}