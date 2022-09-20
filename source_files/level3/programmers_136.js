/* 
[3단계] 베스트앨범
(연습문제: 해시)
*/

const genres = ["classic", "pop", "classic", "classic", "pop"];
const plays = [500, 600, 150, 800, 2500];

console.log(solution(genres, plays));

function solution(genres, plays) {
    let answer = [];
    let dict = {};

    for (let i = 0; i < genres.length; i++) {
        // dict에 해당 장르가 없으면 추가해준다
        if (!Object.keys(dict).includes(genres[i]))
            dict[genres[i]] = {
                songs: [],
                sum: 0
            };

        // dict에 데이터 저장
        dict[genres[i]] = {
            songs: [...dict[genres[i]].songs, i],
            sum: dict[genres[i]].sum + plays[i]
        };
    }

    // 장르를 재생 횟수에 대해 내림차순 정렬
    let bestGenres = [...Object.keys(dict)];
    bestGenres.sort((a, b) => (dict[b].sum - dict[a].sum));

    // 장르 순서대로 맨앞 2개 받아옴
    for (let gen of bestGenres) {
        // 각 곡들 정렬
        dict[gen].songs.sort((a, b) => {
            // 재생 횟수가 같은 경우
            if (plays[a] === plays[b]) return a - b;
            // 재생 횟수에 대해 내림차순
            return plays[b] - plays[a];
        })

        // 맨 앞의 2개를 받아온다
        answer.push(dict[gen].songs[0]);
        if (dict[gen].songs.length > 1) answer.push(dict[gen].songs[1]);
    }

    return answer;
}