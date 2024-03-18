/* 
[2단계] [3차] 파일명 정렬
(2018 KAKAO BLIND RECRUITMENT)
*/

// 정렬을 위해, 각 파일명의 head와 number, tail을 담을 새로운 클래스
class FileName {
    constructor(name, index) {
        this.name = name;
        this.index = index; // head와 number가 같을 때를 위한 파일 순서 인덱스
        this.head = "";
        this.number = "";
        this.tail = "";

        // 초기 갱신
        this.analyzeFileName(name);
    }

    // head와 number, tail을 구하는 함수
    analyzeFileName(name) {
        let index = 0;

        // 숫자를 만나기 전까지가 head
        // 주의: isNaN(" ")의 결과가 false가 나온다. 즉, 스페이스바도 숫자로 인식한다.
        while ((isNaN(name.charAt(index)) || name.charAt(index) === " ") && index < name.length)
            this.head += name.charAt(index++);

        // 숫자부터는 최대 5글자의 숫자 저장
        for (let i = 0; i < 5 && !isNaN(name.charAt(index)) && name.charAt(index) !== " " && index < name.length; i++) {
            this.number += name.charAt(index++);
        }

        // 나머지는 tail에 저장
        while (index < name.length) {
            this.tail += name.charAt(index++);
        }
    }
}

function solution(files) {
    let fileList = [];
    // 각 파일 내용 저장
    files.forEach((file, index) => {
        fileList.push(new FileName(file, index));
    })

    // 정렬
    fileList.sort((f1, f2) => {
        // HEAD 기준 사전 순 정렬
        if (f1.head.toLowerCase() > f2.head.toLowerCase()) {
            return 1;
        }
        if (f1.head.toLowerCase() < f2.head.toLowerCase()) {
            return -1;
        }

        // NUMBER 숫자에 대해 오름차순 정렬
        let [n1, n2] = [parseInt(f1.number), parseInt(f2.number)];
        if (n1 !== n2) {
            return n1 - n2;
        }

        // NUMBER가 같다면, 인덱스 순으로 정렬
        return f1.index - f2.index;
    })

    // 정렬된 이름들 반환
    return fileList.map((file) => (file.name));
}