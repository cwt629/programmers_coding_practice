/* 
[3단계] 풍선 터트리기
(월간 코드 챌린지 시즌1)
*/

function solution(a) {
    let answer = 0;

    // 각 풍선을 기준으로 왼쪽과 오른쪽의 최소값 받아오기
    const [leftmin, rightmin] = [getLeftMin(a), getRightMin(a)];

    a.forEach((balloon, index) => {
        // 양쪽의 최소값보다 해당 풍선값이 크면, 터질 수밖에 없음
        if (!(balloon > leftmin[index] && balloon > rightmin[index]))
            answer++;
    })

    return answer;
}

// 각 풍선의 왼쪽에 있는 최소 풍선 번호를 구하는 함수
function getLeftMin(a) {
    let result = [Infinity]; // 맨왼쪽은 무조건 남길수 있음

    for (let i = 1; i < a.length; i++) {
        result[i] = Math.min(result[i - 1], a[i - 1]); // 전구간 최소값과 전 풍선 값 중 더 작은 값
    }

    return result;
}

// 각 풍선의 오른쪽에 있는 최소 풍선 번호를 구하는 함수
function getRightMin(a) {
    let result = Array.from({ length: a.length }, () => (0));
    result[result.length - 1] = Infinity; // 맨오른쪽은 무조건 남길 수 있음

    for (let i = result.length - 2; i >= 0; i--) {
        result[i] = Math.min(result[i + 1], a[i + 1]);
    }

    return result;
}