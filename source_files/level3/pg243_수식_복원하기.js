/*
[3단계] [PCCP 기출문제] 4번 / 수식 복원하기
(PCCP 기출문제)
*/

const MIN_BASE = 2, MAX_BASE = 9;

function solution(expressions) {
    var answer = [];
    const clues = [], questions = [];
    
    for (let expression of expressions){
        const [num1, operator, num2, equalSign, result] = expression.split(" ");
        if (result === "X"){
            questions.push({num1, operator, num2});
        }
        else {
            clues.push({num1, operator, num2, result});
        }
    }
    
    // n진수 탐색을 시작할 최소 숫자 구하기
    let base = getMaxDigit([
        ...clues.map((clue) => (clue.num1)),
        ...clues.map((clue) => (clue.num2)),
        ...clues.map((clue) => (clue.result)),
        ...questions.map((q) => (q.num1)),
        ...questions.map((q) => (q.num2))
    ]) + 1;
    
    const availableBases = [];
    
    while (base <= MAX_BASE) {
        // 해당 진수에 계산이 맞는지 확인
        let isCorrect = true;
        for (let i = 0; i < clues.length && isCorrect; i++){
            const clue = clues[i];
            
            switch(clue.operator){
                case "+":
                    if (parseInt(clue.num1, base) + parseInt(clue.num2, base) !== parseInt(clue.result, base)){
                        isCorrect = false;
                    }
                    break;
                    
                case "-":
                    if (parseInt(clue.num1, base) - parseInt(clue.num2, base) !== parseInt(clue.result, base)){
                        isCorrect = false;
                    }
                    break;
            }
        }
        
        if (isCorrect) {
            availableBases.push(base);
        }
        base++;
    }
    
    // 계산 결과 도출
    answer = questions.map((q) => {
        // 예외처리: 사실 일어날 일은 없는데 그냥 불안해서 함
        if (availableBases.length === 0){
            return `${q.num1} ${q.operator} ${q.num2} = ?`;
        }
        
        let result = getCalcResult(q.num1, q.operator, q.num2, availableBases[0]);
        for (let i = 1; i < availableBases.length; i++){
            let otherResult = getCalcResult(q.num1, q.operator, q.num2, availableBases[i]);
            // 서로 다른 결과가 나타난 경우
            if (result !== otherResult){
                return `${q.num1} ${q.operator} ${q.num2} = ?`;
            }
        }
        // 결과가 단 하나이거나 일치하는 결과가 나타난 경우
        return `${q.num1} ${q.operator} ${q.num2} = ${result}`;
    })
    
    return answer;
}

// 여러 숫자들 중 최대 숫자를 구하는 함수
function getMaxDigit(numbers){
    let max = MIN_BASE - 1;
    for (let number of numbers){
        for (let index = 0; index < number.length; index++){
            const currentDigit = Number(number.charAt(index));
            if (max < currentDigit){
                max = currentDigit;
            }
        }
    }
    
    return max;
}
    
// 특정 진수에 대한 계산 결과를 반환하는 함수
function getCalcResult(num1, operator, num2, base){
    switch(operator){
        case "+":
            return (parseInt(num1, base) + parseInt(num2, base)).toString(base);
            
        case "-":
            return (parseInt(num1, base) - parseInt(num2, base)).toString(base);
    }
}