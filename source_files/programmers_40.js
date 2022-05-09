/* 
[2단계] [카카오 인턴] 수식 최대화
(2020 카카오 인턴십)
*/

const expression = "100-200*300-500+20";
console.log(solution(expression));

function solution(expression) {
    var results = [];

    var temp;
    // + > - > *
    temp = parseInt(resultString(resultString(resultString(expression, "+"), "-"), "*"));
    results.push(Math.abs(temp));
    // + > * > -
    temp = parseInt(resultString(resultString(resultString(expression, "+"), "*"), "-"));
    results.push(Math.abs(temp))
    // - > + > *
    temp = parseInt(resultString(resultString(resultString(expression, "-"), "+"), "*"));
    results.push(Math.abs(temp));
    // - > * > +
    temp = parseInt(resultString(resultString(resultString(expression, "-"), "*"), "+"));
    results.push(Math.abs(temp));
    // * > + > -
    temp = parseInt(resultString(resultString(resultString(expression, "*"), "+"), "-"));
    results.push(Math.abs(temp));
    // * > - > +
    temp = parseInt(resultString(resultString(resultString(expression, "*"), "-"), "+"));
    results.push(Math.abs(temp));

    // 최대값 구하기
    return Math.max(...results);
}

// 연산자인지 아닌지 판별하여 반환하는 함수
function isOperator(ch) {
    return (ch === "+" || ch === "-" || ch === "*");
}

// 특정 연산 결과를 문자열로 반환하는 함수
function resultString(expression, todo) {
    var result = "";
    const len = expression.length;

    // 피연산자 받아오기(음수값에 의해 빈 문자열이 생기는 것을 방지한다)
    var operands = expression.split(/\+|-|\*/).filter(function (num) {
        return num !== "";
    });
    // 정수로 바꾸기
    operands = operands.map((num) => parseInt(num))

    // 연산자 받아오기
    const operatorCollect = [];
    let prev;
    for (let i = 0; i < len; i++) {
        const temp = expression.charAt(i);
        if (isOperator(temp)) {
            // 앞선 연산에서 음수가 나온 경우를 고려
            if (i === 0 || isOperator(prev)) {
                operands[operatorCollect.length] = -operands[operatorCollect.length];
            }
            else operatorCollect.push(temp);
        }
        prev = temp;
    }

    // 해야할 연산 하기
    const opLen = operands.length;
    let i;
    for (i = 0; i < opLen - 1; i++) {
        // 해야할 연산이라면, 결과를 다음 operand에 저장
        if (operatorCollect[i] === todo) {
            switch (todo) {
                case "+":
                    operands[i + 1] = operands[i] + operands[i + 1];
                    break;

                case "-":
                    operands[i + 1] = operands[i] - operands[i + 1];
                    break;

                case "*":
                    operands[i + 1] = operands[i] * operands[i + 1];
                    break;
            }
        }

        // 해야할 연산이 아니라면, 현재까지 결과값과 해당 연산자를 string에 저장
        else result = result + String(operands[i]) + operatorCollect[i];
    }
    // 마지막 값도 붙여주기
    result += String(operands[i]);

    return result;
}




// 1st try: 배열이 바뀌어버리는 현상 발생

// function solution(expression) {
//     var answer = 0;

//     // 각 피연산자들 걸러내기
//     var operands = expression.split(/\+|-|\*/);
//     // 정수로 모두 바꿔주기
//     operands = operands.map((pieces) => parseInt(pieces));

//     // 각 연산자들 걸러내기
//     var operators = [];
//     const len = expression.length;
//     for (let i = 0; i < len; i++) {
//         const temp = expression.charAt(i);
//         if (temp === "+" || temp === "-" || temp === "*")
//             operators.push(temp);
//     }

//     // 각 타입별로 계산하여 그 결과값 중 최대값 구해오기
//     var results = [];
//     for (let j = 1; j <= 6; j++) {
//         console.log(operands)
//         results.push(calcByType(operands, operators, j));
//         console.log(operands)
//     }

//     console.log(results);
//     answer = Math.max(...results);

//     return answer;
// }

// // 특정 인덱스를 배열에서 제거하는 함수
// function removeIndex(array, index) {
//     return [...array.slice(0, index), ...array.slice(index + 1)];
// }

// // 각 연산자들에 대해 계산을 수행한 뒤, 결과 배열들을 반환하는 함수
// function calcArray(operands, operators, todo) {
//     var index = 0;
//     // 덧셈
//     if (todo === "+") {
//         while (index < operators.length) {
//             if (operators[index] === "+") {
//                 operands[index] += operands[index + 1];
//                 operators = removeIndex(operators, index);
//                 operands = removeIndex(operands, index + 1);
//             }
//             else index++;
//         }
//     }
//     // 뺄셈
//     else if (todo === "-") {
//         while (index < operators.length) {
//             if (operators[index] === "-") {
//                 operands[index] -= operands[index + 1];
//                 operators = removeIndex(operators, index);
//                 operands = removeIndex(operands, index + 1);
//             }
//             else index++;
//         }
//     }
//     // 곱셈
//     else if (todo === "*") {
//         while (index < operators.length) {
//             if (operators[index] === "*") {
//                 operands[index] *= operands[index + 1];
//                 operators = removeIndex(operators, index);
//                 operands = removeIndex(operands, index + 1);
//             }
//             else index++;
//         }
//     }

//     // 변경된 배열들 반환
//     return [operands, operators];
// }

// // 각 타입에 맞추어 순서대로 계산하는 함수

// function calcByType(operands, operators, type) {

//     switch (type) {
//         // 타입 1: + > - > *
//         case 1:
//             [operands, operators] = calcArray(operands, operators, "+");
//             [operands, operators] = calcArray(operands, operators, "-");
//             [operands, operators] = calcArray(operands, operators, "*");
//             break;

//         // 타입 2: + > * > -
//         case 2:
//             [operands, operators] = calcArray(operands, operators, "+");
//             [operands, operators] = calcArray(operands, operators, "*");
//             [operands, operators] = calcArray(operands, operators, "-");
//             break;

//         // 타입 3: - > + > *
//         case 3:
//             [operands, operators] = calcArray(operands, operators, "-");
//             [operands, operators] = calcArray(operands, operators, "+");
//             [operands, operators] = calcArray(operands, operators, "*");
//             break;

//         // 타입 4: - > * > +
//         case 4:
//             [operands, operators] = calcArray(operands, operators, "-");
//             [operands, operators] = calcArray(operands, operators, "*");
//             [operands, operators] = calcArray(operands, operators, "+");
//             break;

//         // 타입 5: * > + > -
//         case 5:
//             [operands, operators] = calcArray(operands, operators, "*");
//             [operands, operators] = calcArray(operands, operators, "+");
//             [operands, operators] = calcArray(operands, operators, "-");
//             break;

//         // 타입 6: * > - > +
//         case 6:
//             [operands, operators] = calcArray(operands, operators, "*");
//             [operands, operators] = calcArray(operands, operators, "-");
//             [operands, operators] = calcArray(operands, operators, "+");
//             break;
//     }


//     // 결과값은 operands의 유일한 원소에 있다
//     return Math.abs(operands[0]);
// }