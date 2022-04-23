/* 
[1단계] 폰켓몬
(찾아라 프로그래밍 마에스터)
*/

// const nums = [3, 3, 3, 2, 2, 4];
// console.log(solution(nums));

function solution(nums) {
    var answer = 0;
    const len = nums.length;
    let i = 0;

    // 중복되지 않도록 폰켓몬을 넣으면서 센다
    var phoneketmons = [];
    while (i < len && answer < len / 2) {
        // 인덱스 i의 폰켓몬이 중복이 아니라면, 넣어주며 카운트해준다
        if (!phoneketmons.includes(nums[i])) {
            phoneketmons.push(nums[i]);
            answer++;
        }
        // 다음 인덱스 받아오기
        i++;
    }

    return answer;
}