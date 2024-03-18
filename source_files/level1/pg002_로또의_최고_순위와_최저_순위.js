/* 
[1단계] 로또의 최고 순위와 최저 순위
(2021 Dev-Matching) 
*/

function solution(lottos, win_nums) {
    var answer = [];
    let coincide = 0, maxCoincide = 0;

    lottos.forEach(function (param) {
        // 번호가 win_nums에 있다면
        if (win_nums.includes(param)) {
            coincide++;
            maxCoincide++;
        }
        // 번호를 알아볼 수 없다면
        else if (param == 0) {
            // 최고 순위를 알아보려면, 그 번호가 맞았다고 가정한다
            maxCoincide++;
        }
    })

    // 최고 등수 매기기: 0이 모두 맞은 것이라고 가정한 것
    answer.push(getRank(maxCoincide));
    // 최저 등수 매기기: 0이 모두 틀린 것이라고 가정한 것
    answer.push(getRank(coincide));

    return answer;
}

function getRank(coincide) {
    // n개 번호가 일치하면, (7-n)등으로 매겨진다(n은 6 이하의 자연수)
    if (coincide > 0) {
        return (7 - coincide);
    }
    // 0개 번호가 일치하면, 6등으로 매겨진다
    else {
        return 6;
    }
}