/* 
[3단계] 디스크 컨트롤러
(연습문제: 힙(Heap))
*/

const jobs = [[24, 10], [28, 39], [43, 20], [37, 5], [47, 22], [20, 47], [15, 34], [15, 2], [35, 43], [26, 1]];
console.log(solution(jobs));

function solution(jobs) {
    var answer = 0;
    const len = jobs.length;

    // jobs를 작업 요청 시점 기준으로 정렬
    jobs.sort(function (a, b) {
        return a[0] - b[0];
    })

    // 작업 큐 초기화
    var jobQueue = [];

    // 시작 시간 초기화
    var ms = 0;

    // jobs에서 어디서부터 다시 작업을 뽑아야하는지 저장하기 위한 인덱스
    var taskPin = 0;

    // 0ms부터 시작 가능한 작업들을 큐에 넣어주기
    while (taskPin < len && jobs[taskPin][0] <= ms) {
        jobQueue.push(jobs[taskPin]);
        taskPin++;
    }

    // 작업 시작
    while (taskPin < len || jobQueue.length > 0) {
        // 현재 작업 큐를 소요시간 기준으로 오름차순 정렬
        if (jobQueue.length > 1) {
            jobQueue.sort(function (a, b) {
                return a[1] - b[1];
            })
        }

        // 할 작업이 없는 경우, 1ms 진행시키기
        if (jobQueue.length === 0) {
            ms++;
        }
        // 할 작업이 하나라도 있는 경우
        else {
            // 제일 소요시간이 짧은 작업 수행
            ms += jobQueue[0][1];
            // (현시간 - 작업 요청 시점)의 평균을 내기 위해 모두 더해준다
            answer += ms - jobQueue[0][0];
            // 해당 작업은 작업 큐에서 제외
            jobQueue.shift();
        }

        // 현재 시간까지 요청된 작업들을 작업 큐에 삽입
        while (taskPin < len && jobs[taskPin][0] <= ms) {
            jobQueue.push(jobs[taskPin]);
            taskPin++;
        }
    }

    // 평균값 구하기
    answer = Math.floor(answer / len);

    return answer;
}