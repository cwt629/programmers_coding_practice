/* 
[1단계] 모의고사
(연습: 완전탐색)
*/

function solution(answers) {
    var answer = [];
    // 1, 2, 3번 수포자가 맞은 문제 개수
    var gotCorrect = [0, 0, 0];

    // 채점 시작
    const len = answers.length;
    for (let i = 0; i < len; i++) {
        // 1번 수포자가 맞은 경우
        if (firstAnswer(i + 1) === answers[i]) {
            gotCorrect[0]++;
        }
        // 2번 수포자가 맞은 경우
        if (secondAnswer(i + 1) === answers[i]) {
            gotCorrect[1]++;
        }
        // 3번 수포자가 맞은 경우
        if (thirdAnswer(i + 1) === answers[i]) {
            gotCorrect[2]++;
        }
    }

    // 높은 점수 받은 사람을 가려낸다
    const maxScore = max(gotCorrect[0], gotCorrect[1], gotCorrect[2]);

    // 해당하는 학생들을 push한다
    for (let i = 0; i < 3; i++) {
        if (gotCorrect[i] === maxScore) {
            answer.push(i + 1);
        }
    }

    return answer;
}

// 1번 수포자가 n번 문제에 대해 찍은 답
function firstAnswer(question) {
    return ((question - 1) % 5) + 1;
}

// 2번 수포자가 n번 문제에 대해 찍은 답
function secondAnswer(question) {
    // 홀수인 경우
    if (question % 2 == 1) {
        return 2;
    }
    else {
        // 인덱스 0, 1, 2, 3에 각각 5, 1, 3, 4 저장
        const answersToGet = [5, 1, 3, 4];
        // 8로 나눈 나머지가 2, 4, 6, 0 중 하나가 되며, 각각에 대해 인덱스 1, 2, 3, 0에 대응
        return answersToGet[(question % 8) / 2];
    }
}

// 3번 수포자가 n번 문제에 대해 찍은 답
function thirdAnswer(question) {
    const answerToGet = [5, 3, 3, 1, 1, 2, 2, 4, 4, 5];
    // 10으로 나눈 나머지를 이용하여 인덱스 참조
    return answerToGet[question % 10];
}

// 세 수 중 최대값을 반환하는 함수
function max(a, b, c) {
    if (a > b && a > c) {
        return a;
    }
    if (b > c) {
        return b;
    }
    return c;
}