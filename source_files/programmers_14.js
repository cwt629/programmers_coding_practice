/* 
[2단계] 기능개발
(연습: 스택/큐)
*/

function solution(progresses, speeds) {
    var answer = [];

    let taskToComplete = 0, toPublish = 0;
    const len = progresses.length;

    // 모든 개발이 끝날 때까지
    while (taskToComplete < len) {
        // 배포할 개수 초기화
        toPublish = 0;
        // 매일 개발 착수
        for (let i = taskToComplete; i < len; i++) {
            progresses[i] += speeds[i];
        }
        // 먼저 배포되어야 할 작업이 배포 가능할 경우, 이후 가능한만큼 모두 배포
        while (progresses[taskToComplete] >= 100 && taskToComplete < len) {
            // 완료된 경우 배포
            toPublish++;
            // 배포 완료 및 다음 작업의 진도 파악
            taskToComplete++;
        }
        // 배포된 것이 있는 경우, answer에 push하기
        if (toPublish > 0) {
            answer.push(toPublish);
        }

    }

    return answer;
}