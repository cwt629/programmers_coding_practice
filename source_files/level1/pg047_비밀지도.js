/* 
[1단계] [1차] 비밀지도
(2018 KAKAO BLIND RECRUITMENT)
*/

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]), solution(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10]));

function solution(n, arr1, arr2) {
    var answer = [];
    const len = arr1.length;

    // 각 배열의 원소들을 이진수로 바꿔가며 지도 채워나가기
    for (let i = 0; i < len; i++) {
        var myMap = "";

        // n번까지 나누며 정리
        for (let j = 0; j < n; j++) {
            // 각 배열의 원소에 대해 수행
            const [res1, res2] = [arr1[i] % 2, arr2[i] % 2];
            // 지도에 들어갈 표시 생성
            var temp = (res1 === 0 && res2 === 0) ? " " : "#";
            // 이진수는 뒤에서부터 구해지므로, 지도의 끝부터 붙여나가야 한다
            myMap = temp.concat(myMap);
            // 각 숫자들을 2로 나눈다
            arr1[i] = Math.floor(arr1[i] / 2);
            arr2[i] = Math.floor(arr2[i] / 2);
        }

        // 결과 정리
        answer.push(myMap);
    }
    return answer;
}