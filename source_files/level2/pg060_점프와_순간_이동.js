/* 
[2단계] 점프와 순간 이동
(Summer/Winter Coding(~2018))
*/

function solution(n) {
    var ans = 1;

    // 도착점에서부터, 가능하면 2씩 계속 나눠간다
    while (n > 1) {
        if (n % 2 === 0)
            n /= 2;
        else {
            n--;
            ans++;
        }
    }

    return ans;
}