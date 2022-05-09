/* 
[2단계] 모음사전
(위클리 챌린지)
*/

function solution(word) {
    var answer = 0;
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    // 총 개수를 구한다
    const totalWords = Math.pow(5, 1) + Math.pow(5, 2) + Math.pow(5, 3) + Math.pow(5, 4) + Math.pow(5, 5) // 총 3905개

    // word의 앞에서부터 보면서 판별
    for (let i = 0; i < word.length; i++) {
        // 각 자리에 도달할때 한칸씩 전진
        answer++;
        answer += vowelWords(4 - i) * vowels.indexOf(word.charAt(i));
    }

    return answer;
}

// 일부를 고정했을 때, 나머지 글자수의 모음 단어를 총 몇개 만들수 있는지 반환하는 함수(고정된 것만 있는 경우도 포함)
function vowelWords(num) {
    var result = 0;
    for (let i = 0; i <= num; i++)
        result += Math.pow(5, i);

    return result;
}