/* 
[2단계] 교점에 별 만들기
(위클리 챌린지)
*/

const line = [[2, -1, 4], [-2, -1, 4], [0, -1, 1], [5, -8, -12], [5, 8, 12]];
console.log(solution(line))

function solution(line) {
    var answer = [];

    // 교점들을 [x, y] 좌표로 저장할 배열
    const starpoints = [];

    // 교점 구하기
    for (let i = 0; i < line.length - 1; i++) {
        for (let j = i + 1; j < line.length; j++) {
            // 두 직선이 평행하여 만날 수 없는 경우는 패스한다
            const determinant = line[j][0] * line[i][1] - line[i][0] * line[j][1];
            if (determinant === 0) continue;

            // 방정식의 해를 일반화하여 구해준다
            const y = (line[i][0] * line[j][2] - line[j][0] * line[i][2]) / determinant;
            // 정수 판별
            if (!Number.isInteger(y)) continue;

            // line[i]의 A값이 0일 경우는, line[j]를 이용하여 x값을 구해준다
            const x = (line[i][0] !== 0) ? -(y * line[i][1] + line[i][2]) / line[i][0] : -(y * line[j][1] + line[j][2]) / line[j][0];
            if (!Number.isInteger(x)) continue;

            // 정수 교점이면, 저장해준다(좌표평면을 행렬로 표현하는 것을 감안하여 y,x 순(행-열) 저장)
            starpoints.push([y, x]);
        }
    }

    // x좌표의 경계를 찾기 위해, x에 대해서 오름차순 정렬
    starpoints.sort((a, b) => (a[1] - b[1]));
    const boundaryX = [starpoints[0][1], starpoints[starpoints.length - 1][1]];

    // 교점들을 y좌표에 대해 내림차순 정렬, 같다면 x좌표에 대해 오름차순 정렬
    starpoints.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return b[0] - a[0];
    })
    // y에 대해 우선으로 정렬된 배열에서 y좌표의 경계를 저장한다
    const boundaryY = [starpoints[starpoints.length - 1][0], starpoints[0][0]];

    // 해당 경계 내에서 문자열 그려나가기
    var pin = 0;
    // 여기서의 y는 행인데, 좌표평면 상에서는 위에 있을수록 y값이 크므로 거꾸로 내려간다
    for (let i = boundaryY[1]; i >= boundaryY[0]; i--) {
        var temp = "";
        for (let j = boundaryX[0]; j <= boundaryX[1]; j++) {
            // 이미 모든 별을 그렸다면, "."만 그리면 된다
            if (pin === starpoints.length) temp += ".";
            // 별을 그려야 하는지 판단(핀은 다음 별이 그려질 위치를 지시)
            else if (starpoints[pin][0] === i && starpoints[pin][1] === j) {
                temp += "*";
                // 같은 교점이 여러번 생길 경우(세 개 이상의 직선이 같은 교점 생성) 대비
                while (pin < starpoints.length && starpoints[pin][0] === i && starpoints[pin][1] === j) pin++;
            }
            else temp += ".";
        }
        // 구해진 문자열 저장해주기
        answer.push(temp);
    }

    return answer;
}