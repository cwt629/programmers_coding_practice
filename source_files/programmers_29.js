/* 
[1단계] 두 개 뽑아서 더하기
(월간 코드 챌린지 시즌1)
*/

const numbers = [2, 1, 3, 4, 1];
console.log(solution(numbers));

function solution(numbers) {
    var answer = [];
    const len = numbers.length;

    // 2개씩 뽑아 더해주기
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            const sum = numbers[i] + numbers[j];
            // 포함되어 있지 않다면, 저장해주기
            if (!answer.includes(sum))
                answer.push(sum);
        }
    }

    // 오름차순 정렬
    answer.sort(function (a, b) {
        return a - b;
    })

    return answer;
}