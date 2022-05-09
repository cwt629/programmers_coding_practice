/* 
[2단계] 큰 수 만들기
(연습문제: 탐욕법(Greedy))
*/

function solution(number, k) {
    var answer = '';
    // 탐색해야할 문자열의 시작 인덱스
    var start = 0;

    // 잘라내기 시작
    while (k > 0) {
        // 만약 남은 문자가 딱 k개면, 남은 문자열 모두 제거
        if (number.length - start === k) {
            start = number.length;
            break;
        }

        // 판별할 문자열의 앞에서부터 (k+1)개만큼을 보고, 숫자가 가장 큰 인덱스를 찾는다
        var maxIndex = start;
        for (let i = start + 1; i <= start + k; i++) {
            // 시간 단축을 위해, 갱신된 최대값이 9인 경우 무조건 최대이므로 break한다
            if (number.charAt(maxIndex) === "9") break;

            // 어차피 한자리 숫자이므로, 문자의 아스키코드 채로 비교해도 된다
            if (number.charAt(maxIndex) < number.charAt(i)) {
                // 최대 인덱스 갱신
                maxIndex = i;
            }

        }
        // 구한 인덱스의 숫자를 정답에 추가하고, 그 이전 값들은 모두 제거
        answer = answer.concat(number.charAt(maxIndex));
        // 제거한 만큼 k 감소
        k -= (maxIndex - start);
        // 해당 인덱스의 다음부터 탐색 재시작
        start = maxIndex + 1;

    }

    // 모두 자르고 남은 number는 뒤에 붙여준다
    answer = answer.concat(number.substring(start));

    return answer;
}