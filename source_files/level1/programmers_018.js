/* 
[1단계] 약수의 개수와 덧셈
(월간 코드 챌린지 시즌2)
*/

function solution(left, right) {
    var answer = 0;

    // 자연수의 2제곱수들 <=> 약수의 개수가 홀수!
    for (let i = left; i <= right; i++) {
        answer += toAddOrSub(i) * i;
    }

    return answer;
}

function toAddOrSub(num) {
    // 자연수의 2제곱수인지를 판별하여, 더할지 뺄지를 +1이나 -1로 결정하여 반환한다
    const rootNum = Math.sqrt(num);
    // 자연수의 2제곱수이면, 빼준다
    if (rootNum === Math.floor(rootNum)) {
        return -1;
    }
    // 그렇지 않으면, 더해준다
    return 1;
}