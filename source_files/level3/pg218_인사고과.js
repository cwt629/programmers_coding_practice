/*
[3단계] 인사고과
(연습문제)
*/

class Employee {
    constructor(index, [score1, score2]) {
        this.index = index;
        this.manners = score1;
        this.peerEval = score2;
        this.getIncentives = true;
    }
}

function solution(scores) {
    let employees = scores.map((score, idx) => (new Employee(idx, score)));
    let wanho = employees[0];

    // 근무태도에 대해 먼저 내림차순 정렬
    employees.sort((p1, p2) => {
        // 근무태도가 같으면 동료평가에 대해 오름차순 정렬
        if (p1.manners === p2.manners) return p1.peerEval - p2.peerEval;
        return p2.manners - p1.manners;
    });

    // 동료평가에 대해서도 더 낮은 경우가 생기면 false처리
    let mannersStd = employees[0].manners, peerStd = employees[0].peerEval;
    for (let i = 1; i < employees.length; i++) {
        // 두 평가점수가 모두 비교점보다 더 낮은 경우
        if (employees[i].manners < mannersStd && employees[i].peerEval < peerStd) {
            employees[i].getIncentives = false;
            continue;
        }
        // 비교대상 갱신
        mannersStd = employees[i].manners;
        peerStd = employees[i].peerEval;
    }

    // 완호가 인센티브 못받는 경우
    if (!wanho.getIncentives) return -1;

    // 완호의 합계
    let wanhoSum = wanho.manners + wanho.peerEval;

    // 완호의 석차는, 인센티브 받는 이들 중 완호의 합계보다 높은 사람의 수 + 1이다
    return employees.filter((emp) => (emp.getIncentives && (emp.manners + emp.peerEval) > wanhoSum)).length + 1;
}