/*
[3단계] 봉인된 주문
(2025 프로그래머스 코드챌린지 2차 예선)
*/

const MAX_SPELL_SIZE = 11; // 최대 11글자의 주문
const TOTAL_ALPHABETS_NUMBER = 26;

class TreeNode {
  constructor(alphabet = "") {
    this.letter = alphabet;
    this.connected = new LinkedList(); // 연결된 알파벳들을 순서대로 링크드리스트로 저장
    this.next = null; // 다음 알파벳 노드(같은 레벨)
  }

  getConnectedAlphabet(alphabet) {
    return this.connected.getNode(alphabet);
  }

  connectAlphabet(alphabet) {
    const newNode = new TreeNode(alphabet);
    this.connected.connect(newNode);
    return newNode;
  }

  getTotalNodes() {
    if (this.connected.isEmpty()) {
      return 1;
    }
    let count = 0;

    for (let current = this.connected.head; current; current = current.next) {
      count += current.getTotalNodes();
    }

    return count;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  connect(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = this.tail.next;
  }

  getNode(alphabet) {
    for (let current = this.head; current; current = current.next) {
      if (current.letter === alphabet) return current;
    }
    return null;
  }

  isEmpty() {
    return !this.head;
  }
}

function solution(n, bans) {
  const asciiA = "a".charCodeAt(0);
  let answer = "";
  // bans를 주문처럼 정렬
  bans.sort((a, b) => {
    if (a.length < b.length) return -1;
    if (a.length > b.length) return 1;
    return a < b ? -1 : 1;
  });

  let bannedSizes = Array.from({ length: MAX_SPELL_SIZE }, () => 0);
  bans.forEach((ban) => {
    bannedSizes[ban.length - 1]++;
  });

  let count = BigInt(n),
    totalSize = BigInt(TOTAL_ALPHABETS_NUMBER);
  let size = 1;
  while (size < MAX_SPELL_SIZE) {
    if (count + BigInt(bannedSizes[size - 1]) <= totalSize) {
      break;
    }
    count -= totalSize - BigInt(bannedSizes[size - 1]);
    size++;
    totalSize *= BigInt(TOTAL_ALPHABETS_NUMBER);
  }

  // 현재 구해진 size의 제거된 주문들을 트리 형태로 구조화
  const root = new TreeNode();
  for (let i = 0; i < bans.length && bans[i].length <= size; i++) {
    if (bans[i].length < size) continue;

    let current = root;
    for (let charIndex = 0; charIndex < bans[i].length; charIndex++) {
      const currentAlphabet = bans[i].charAt(charIndex);
      let next = current.getConnectedAlphabet(currentAlphabet);
      if (!next) {
        current = current.connectAlphabet(currentAlphabet);
      } else {
        current = next;
      }
    }
  }

  // 한글자씩 붙여간다
  let ableSize = totalSize / BigInt(TOTAL_ALPHABETS_NUMBER);
  let ascii = asciiA;
  let current = root;
  while (answer.length < size) {
    const currentAlphabet = String.fromCharCode(ascii);
    const nextNode = current?.getConnectedAlphabet(currentAlphabet);
    const unableSpells = nextNode ? nextNode.getTotalNodes() : 0;

    // 가능한 주문 수
    const ableSpells = ableSize - BigInt(unableSpells);
    if (ableSpells < count) {
      // 다음 문자로 넘어가야 한다
      count -= ableSpells;
      ascii++;
    } else {
      // 현재 탐색중인 문자 내에 들어가고, 다음 자리수로 넘어간다
      answer += currentAlphabet;
      ascii = asciiA;
      ableSize /= BigInt(TOTAL_ALPHABETS_NUMBER);
      current = nextNode;
    }
  }

  return answer;
}
