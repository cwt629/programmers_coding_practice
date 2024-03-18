/* 
[2단계] [3차] 방금그곡
(2018 KAKAO BLIND RECRUITMENT)
*/

class Music {
    constructor(info) {
        // info를 시작시간, 종료시간, 제목, 음정으로 쪼갠다
        const infoArr = info.split(",");
        // 총 몇분 재생했는지 계산
        const playTimes = beginAndGap(infoArr[0], infoArr[1]);
        // 음정을 해당 시간동안만 저장
        var temp = "", pin = 0;
        for (let i = 0; i < playTimes[1]; i++) {
            temp += infoArr[3].charAt(pin);
            pin = (pin + 1) % infoArr[3].length;
            // 다음 위치가 #인 경우, 같이 저장
            if (infoArr[3].charAt(pin) === "#") {
                temp += "#";
                pin = (pin + 1) % infoArr[3].length;
            }
        }

        // 데이터 저장하는 부분
        // 제목은 인덱스 2에 있음
        this.title = infoArr[2];
        // 재생 시작 시간 저장
        this.begintime = playTimes[0];
        // 재생된 길이 저장
        this.playtime = playTimes[1];
        // 저장된 음정을 곡 정보에 저장
        this.notes = temp;
    }
}

function solution(m, musicinfos) {
    var foundMusic;

    // 각 음악 정보를 클래스화하여 정리
    const musics = [];
    for (let i = 0; i < musicinfos.length; i++) {
        musics[i] = new Music(musicinfos[i]);
    }

    // 음악 탐색
    for (let i = 0; i < musics.length; i++) {
        // notes 문자열에 m이 포함되어있는 경우만 고려
        if (includesMelody(m, musics[i].notes)) {
            // 처음 찾은 것이라면 바로 저장
            if (foundMusic === undefined)
                foundMusic = musics[i];
            // 이전에 찾은 것이 있다면, 재생된 시간이 더 긴 것 저장
            else if (foundMusic.playtime < musics[i].playtime)
                foundMusic = musics[i];
            // 재생된 시간이 같다면, 더 일찍 재생된 것 저장
            else if (foundMusic.playtime === musics[i].playtime &&
                foundMusic.begintime > musics[i].begintime)
                foundMusic = musics[i];
        }
    }

    // 탐색 결과
    return (foundMusic !== undefined) ? foundMusic.title : "(None)";
}


// 주어진 두 시간의 분 차이를 반환하는 함수
function beginAndGap(time1, time2) {
    const results = [];
    // 각 시간의 시, 분을 문자열로 정리
    const first = time1.split(":");
    const second = time2.split(":");

    // 첫째 원소에는 시작 시간을 분으로 환산하여 저장
    results.push(parseInt(first[0]) * 60 + parseInt(first[1]));

    // 둘째 원소에는 재생 시간을 분으로 환산하여 저장
    // *** 의문점: 00:00일 때를 고려했더니 4,11번이 틀리고, 고려하지 않았더니 맞았다. 왜?
    results.push((parseInt(second[0]) * 60 + parseInt(second[1])) - results[0]);

    // 결과 반환
    return results;
}

// 주어진 멜로디를 주어진 notes에서 탐색하는 함수(# 때문에 별도로 생성)
function includesMelody(melody, notes) {
    var start = 0;
    // 탐색한 인덱스 결과
    var searchedIndex = notes.indexOf(melody);
    // 인덱스를 좁혀가며 탐색
    while (searchedIndex >= 0) {
        // 탐색한 문자열 바로 뒤에 #이 붙은 경우는 잘못 탐색한 것이므로, 재탐색 필요
        if (searchedIndex + melody.length < notes.length &&
            notes.charAt(searchedIndex + melody.length) === "#") {
            start = searchedIndex + 1;
            searchedIndex = notes.indexOf(melody, start);
        }
        // 그 외의 경우는 정상 탐색
        else return true;
    }
    // 탐색 실패
    return false;
}