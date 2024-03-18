/* 
[2단계] 다음 큰 숫자
(연습문제)
*/

function solution(n) {
    // 주어진 n을 이진수로 변환
    var binString = n.toString(2).split('');

    /* idea: 더 큰수는 뒤의 0의 자리에 무조건 1이 추가되므로, 
    끝에 0이 연속으로 있던 자리가, 숫자가 커짐에 따라 모두 1이 되고
    그 다음 숫자에서 모두 0이 될때부터 고려를 해야 한다. */

    /* 
    문제 발생!!
    문자열의 특정 인덱스만 수정하는 게 작동이 안됨.
    아무래도 배열로 split하고, 배열에서 수정한 뒤 join해야 할 것 같음.
    */

    // 이진수에서 끝에 0이 연속으로 이어지는 게 끝날 때까지 이동
    let pin = binString.length - 1;
    // n은 자연수이므로, 0은 고려하지 않음
    while (binString[pin] === "0") pin--;

    // 해당 위치에서부터, 1이 연속으로 이어지는 게 끝날 때까지 이동하며 1의 개수 세기
    let count = 0;
    while (pin >= 0 && binString[pin] === "1") {
        count++;
        pin--;
    }

    // 현위치에 1 대입(숫자가 1111....100 형태로 진행될 경우는 앞에 새로 붙여줌)
    if (pin >= 0)
        binString[pin] = "1";
    else {
        binString.unshift("1");
        pin++; // 길이가 늘어남에 따라 핀 조절
    }
    // 1을 하나 대입했으므로, 필요한 1의 개수 하나 감소
    count--;

    // 뒤에서부터 남은 1 붙여주고, 나머지 자리에는 0을 붙여준다
    let addingPin = binString.length - 1;
    while (addingPin > pin) {
        // 1 붙이기
        if (count > 0) {
            binString[addingPin] = "1";
            count--;
        }
        // 남은 자리는 0
        else binString[addingPin] = "0";

        // 핀 이동
        addingPin--;
    }

    // 만들어진 새로운 이진수 문자열을 십진수로 변환하여 반환
    return parseInt(binString.join(""), 2);

}