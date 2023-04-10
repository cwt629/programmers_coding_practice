/* 
[2단계] 숫자 카드 나누기
(연습문제)
*/

function solution(arrayA, arrayB) {
    let answer = 0;

    // 각 array의 최대공약수를 구한다
    let gcdA = gcd(arrayA[0], arrayA[1]), gcdB = gcd(arrayB[0], arrayB[1]);
    for (let i = 2; i < arrayA.length; i++) {
        gcdA = gcd(gcdA, arrayA[i]);
        gcdB = gcd(gcdB, arrayB[i]); // 어차피 길이가 같으므로 같이 구해준다
    }

    // 각자의 최대공약수로 상대의 모든 array를 나눠본다
    let Apossible = true, Bpossible = true;
    for (let i = 0; i < arrayB.length; i++) {
        if (arrayB[i] % gcdA == 0) {
            Apossible = false;
            break;
        }
    }
    if (Apossible) {
        answer = gcdA;
        // gcdB보다 얘가 더 크거나 같으면, 더 할 필요 없음
        if (gcdA >= gcdB) return answer;
    }

    for (let i = 0; i < arrayA.length; i++) {
        if (arrayA[i] % gcdB == 0) {
            Bpossible = false;
            break;
        }
    }
    if (Bpossible) {
        answer = (answer < gcdB) ? gcdB : answer; // 갱신
    }

    return answer;
}

// 최대공약수 구하기
function gcd(a, b = 0) {
    if (b == 0) return a;
    // 순서는 a > b가 되도록 하자
    if (a < b) [a, b] = [b, a];

    let r = a % b;
    return gcd(b, r);
}