/* 
[2단계] 튜플
(2019 카카오 개발자 겨울 인턴십)
*/

const s = "{{2},{2,1},{2,1,3},{2,1,3,4}}";
console.log(solution(s));

function solution(s) {
    var answer = [];
    var setElements = [];

    // s의 가장 바깥 중괄호 2개 제거
    s = s.substring(2, s.length - 2);

    // s에 있는 각 집합들을 받아온다(단순 콤마만으로는 자를수 없다!)
    const sets = s.split("},{");

    // 각 집합들의 원소를 setElements에 정리
    sets.forEach(function (param) {
        // 각 원소들을 배열로 받기
        const temp = param.split(",");
        // temp의 각 원소들을 정수로 바꾸어 setElements에 정리
        const toPush = temp.map(function (element) {
            return parseInt(element);
        })
        setElements.push(toPush);
    })

    // 각 집합들을 원소 개수가 적은 순으로 정렬하여, 순서대로 push해주어야 한다.
    setElements.sort(function (a, b) {
        return a.length - b.length;
    })

    // 순서대로 answer에 push해준다
    setElements.forEach(function (set) {
        set.forEach(function (num) {
            if (!answer.includes(num))
                answer.push(num);
        })
    })

    return answer;
}