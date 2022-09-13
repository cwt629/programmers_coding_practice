/* 
[1단계] 성격 유형 검사하기
(2022 KAKAO TECH INTERNSHIP)
*/

// 설문 결과에 대한 클래스
class Personality {
    constructor() {
        this.components = ["R", "T", "C", "F", "J", "M", "A", "N"];
        // 각 항목에 대한 점수(map 이용)
        this.points = new Map();
        this.initPoints();
    }

    // 각 항목에 대한 점수를 초기화하는 함수
    initPoints() {
        this.components.forEach((comp) => {
            this.points.set(comp, 0);
        })
    }

    // 특정 항목에 대해 점수를 추가하는 함수
    addScore(component, score) {
        this.points.set(component, this.points.get(component) + score);
    }

    // 특정 survey 원소에서 특정 선택지를 골랐을 때 점수를 더해주는 함수
    analyzeScore(surveyComponent, choice) {
        // choice: 1~3
        if (choice >= 1 && choice <= 3)
            this.addScore(surveyComponent.charAt(0), 4 - choice);
        // choice: 5~7
        else if (choice >= 5 && choice <= 7)
            this.addScore(surveyComponent.charAt(1), choice - 4);
    }

    // 현재 쌓인 점수들을 바탕으로 성격 유형을 반환하는 함수
    getResult() {
        let result = "";
        // 1~4번 지표에 대해 탐색
        for (let i = 0; i < 8; i += 2) {
            // 각 지표에서의 유형은 이미 alphabetical order임!
            result += (this.points.get(this.components[i]) < this.points.get(this.components[i + 1])) ? this.components[i + 1] : this.components[i];
        }

        return result;
    }
}

function solution(survey, choices) {
    const result = new Personality();
    // 선형 탐색
    for (let i = 0; i < survey.length; i++) {
        result.analyzeScore(survey[i], choices[i]);
    }
    return result.getResult();
}