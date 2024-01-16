/*
[PCCP 기출문제 > PCCP 기출 1번]
1번 / 붕대 감기
*/

function solution(bandage, health, attacks) {
    let hp = health,
        healingTime = 0, // 남은 회복 시간
        bandingTime = 0; // 붕대를 감는 시간

    // 알아보기 편하게 따로 상수로 저장
    const [BANDING_MAX_TIME, HEAL_PER_SEC, HEAL_BY_SUCCESS] = bandage;
    const FINAL_ATTACK_TIME = attacks[attacks.length - 1][0];

    // 시뮬레이션 시작
    let attackIndex = 0;
    for (let time = 0; time <= FINAL_ATTACK_TIME; time++) {
        // 공격당한 경우
        if (attacks[attackIndex][0] === time) {
            bandingTime = 0; // 연속 감는 시간 초기화
            hp -= attacks[attackIndex++][1];
            // hp가 0 이하로 떨어진 경우
            if (hp <= 0) {
                hp = -1;
                break;
            }
        }
        else bandingTime++;

        // 연속으로 감고 있던 경우
        if (bandingTime > 0) {
            hp += HEAL_PER_SEC;
            if (hp > health) hp = health;
        }
        // 붕대 풀기 성공한 경우
        if (bandingTime === BANDING_MAX_TIME) {
            hp += HEAL_BY_SUCCESS;
            if (hp > health) hp = health;
            bandingTime = 0;
        }
    }

    return hp;
}