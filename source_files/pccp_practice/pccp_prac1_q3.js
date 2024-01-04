/*
[PCCP 모의고사1 > 1회 모의고사 3번]
3번 - 유전법칙
*/

function solution(queries) {    
    return queries.map(([n, p]) => {
        let gene = "Rr"; // 초기 유전자
        let start = 1, end = Math.pow(4, n - 1);
        
        for (let gen = 2; gen <= n; gen++){
            let nextData = getNextData(start, end, gene, p);
            start = nextData.start; end = nextData.end; gene = nextData.gene;
        }
        
        // 마지막으로 결정된 유전자가 정답이다
        return gene;
    })
}

// 두 숫자의 qnum * quarter번째 숫자를 반환하는 함수(4분할의 오른쪽 경계숫자)
function getQuarterEnd(start, end, qnum){
    return ((start - 1) * (4 - qnum) + end * qnum) / 4;
}

// 현재 데이터를 바탕으로 다음 데이터를 반환하는 함수
function getNextData(start, end, gene, p){
    let dict = {};
    
    // 다음 범위를 갱신해준다
    if (p <= getQuarterEnd(start, end, 1)){
        dict["start"] = start;
        dict["end"] = getQuarterEnd(start, end, 1);
        dict["gene"] = (gene === "Rr")? "RR" : gene;
    }
    else if (p <= getQuarterEnd(start, end, 2)){
        dict["start"] = getQuarterEnd(start, end, 1) + 1;
        dict["end"] = getQuarterEnd(start, end, 2);
        dict["gene"] = (gene === "Rr")? "Rr" : gene;
    }
    else if (p <= getQuarterEnd(start, end, 3)){
        dict["start"] = getQuarterEnd(start, end, 2) + 1;
        dict["end"] = getQuarterEnd(start, end, 3);
        dict["gene"] = (gene === "Rr")? "Rr" : gene;
    }
    else {
        dict["start"] = getQuarterEnd(start, end, 3) + 1;
        dict["end"] = end;
        dict["gene"] = (gene === "Rr")? "rr" : gene;
    }
    
    return dict;
}