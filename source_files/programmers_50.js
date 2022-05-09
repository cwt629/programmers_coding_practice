/* 
[2단계] 다리를 지나는 트럭
(연습문제: 스택/큐)
*/

function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    // 다리에 있는 트럭들의 무게 큐와, 머문 시간 저장
    var crossing = [];
    // 다리를 건넌 트럭들의 무게 스택 저장
    const crossed = [];

    // 다리 건너기
    var i = 0;
    var totalOnBridge = 0;
    while (crossed.length < truck_weights.length) {
        // 시간이 지나감
        answer++;
        // 다리에 있던 트럭들 한칸씩 전진
        crossing = crossing.map(([w, t]) => ([w, t + 1]));
        // 올라갈 수 있는 트럭 개수만큼 전진했다면, 건넜음
        if (crossing.length > 0 && crossing[0][1] === bridge_length) {
            crossed.push(crossing[0][0]);
            totalOnBridge -= crossing[0][0];
            crossing.shift();
        }
        // 다음 대기 트럭이 들어올 수 있으면 들어와라
        if (totalOnBridge + truck_weights[i] <= weight) {
            crossing.push([truck_weights[i], 0]);
            totalOnBridge += truck_weights[i];
            i++;
        }
    }
    return answer;
}