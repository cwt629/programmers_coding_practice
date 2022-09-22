/* 
[2단계] H-Index
(연습문제: 정렬)
*/

function solution(citations) {

    // 논문을 인용 횟수 기준으로 내림차순 정렬
    citations.sort((a, b) => (b - a));

    // 이진 탐색으로 H-index 찾아낸다
    let start = 0, end = citations.length;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        // H-index 조건 확인
        // h번 이상 인용된 논문이 h편 이상이 맞다면, h를 늘려본다
        // (최대값을 찾게 되면, 어차피 나머지 논문이 h번 이하 인용되는 것이 따라옴!)
        if (mid === 0 || citations[mid - 1] >= mid)
            start = mid + 1;

        // 아니라면, 더 작은 값 탐색
        else end = mid - 1;
    }

    // end가 해당 H-index
    return end;
}