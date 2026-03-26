/**
 * [1단계] 중요한 단어를 스포 방지
 * (2025 카카오 하반기 1차)
 */

function solution(message, spoiler_ranges) {
  let answer = 0;
  const wordData = [];

  // message의 각 단어와 그 start, end를 기록한다
  let start = 0;
  while (start < message.length) {
    let currentIndex = start,
      currentWord = "";
    while (
      currentIndex < message.length &&
      message.charAt(currentIndex) !== " "
    ) {
      currentWord += message.charAt(currentIndex);
      currentIndex++;
    }

    // 쌓인 데이터를 배열에 추가
    const currentData = {
      word: currentWord,
      start: start,
      end: currentIndex - 1, // 현재 인덱스는 공백이나 마지막 이후에 있음
      isSpoPrevented: false,
    };

    wordData.push(currentData);

    start = currentIndex + 1;
  }

  // 스포 방지 체크
  let wordIndex = 0;
  for (let [spoStart, spoEnd] of spoiler_ranges) {
    // 시작되는 단어 찾기
    while (wordIndex < wordData.length && spoStart > wordData[wordIndex].end) {
      wordIndex++;
    }

    while (
      wordIndex < wordData.length &&
      wordData[wordIndex].end >= spoStart &&
      wordData[wordIndex].start <= spoEnd
    ) {
      wordData[wordIndex].isSpoPrevented = true;
      wordIndex++;
    }
  }

  // 중요한 단어 체크
  const normalWords = wordData
    .filter((data) => !data.isSpoPrevented)
    .map((data) => data.word);
  const spoWords = [];

  for (let word of wordData) {
    // 1. 스포 방지 단어
    if (!word.isSpoPrevented) continue;

    // 2. 이전 공개된 스포 방지 단어와 중복되지 않음
    if (spoWords.includes(word.word)) continue;
    spoWords.push(word.word);

    // 3. 스포 방지가 아닌 구간에 등장한 적 없음
    if (normalWords.includes(word.word)) continue;

    answer++;
  }

  return answer;
}
