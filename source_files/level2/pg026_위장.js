/* 
[2단계] 위장
(연습: 해시)
*/

const clothes = [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]];
console.log(solution(clothes));

function solution(clothes) {
    var answer = 1;

    var closet = {};

    // 각 옷들을 closet에 count로 저장
    clothes.forEach(function (wear) {
        // 해당 종류가 이미 count를 시작한 상태인 경우
        if (wear[1] in closet) {
            closet[wear[1]]++;
        }
        // 해당 종류가 처음으로 등장한 경우
        else {
            closet[wear[1]] = 1;
        }
    })

    // 각 종류마다 카운트 받아와 곱하기(안 입는 경우를 감안해 +1)
    Object.keys(closet).forEach(function (parts) {
        answer *= closet[parts] + 1;
    })

    // 하루에 최소 한 개의 의상은 입으므로, 아무 것도 입지 않은 경우 제외
    answer--;

    return answer;
}