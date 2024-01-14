/* 
[PCCP 모의고사2 > 2회 모의고사 1번]
1번 - 실습용 로봇
*/

class Robot {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.dir = "UP";
    }

    getPosition() {
        return [this.x, this.y];
    }

    rotateLeft() {
        switch (this.dir) {
            case "UP":
                this.dir = "LEFT";
                break;

            case "LEFT":
                this.dir = "DOWN";
                break;

            case "DOWN":
                this.dir = "RIGHT";
                break;

            case "RIGHT":
                this.dir = "UP";
                break;
        }
    }

    rotateRight() {
        switch (this.dir) {
            case "UP":
                this.dir = "RIGHT";
                break;

            case "LEFT":
                this.dir = "UP";
                break;

            case "DOWN":
                this.dir = "LEFT";
                break;

            case "RIGHT":
                this.dir = "DOWN";
                break;
        }
    }

    moveForward() {
        switch (this.dir) {
            case "UP":
                this.y++;
                break;

            case "LEFT":
                this.x--;
                break;

            case "DOWN":
                this.y--;
                break;

            case "RIGHT":
                this.x++;
                break;
        }
    }

    moveBackward() {
        switch (this.dir) {
            case "UP":
                this.y--;
                break;

            case "LEFT":
                this.x++;
                break;

            case "DOWN":
                this.y++;
                break;

            case "RIGHT":
                this.x--;
                break;
        }
    }
}

function solution(command) {
    let robot = new Robot();

    for (let i = 0; i < command.length; i++) {
        // 커맨드에 따라 적용
        switch (command.charAt(i)) {
            case "R":
                robot.rotateRight();
                break;

            case "L":
                robot.rotateLeft();
                break;

            case "G":
                robot.moveForward();
                break;

            case "B":
                robot.moveBackward();
                break;
        }
    }

    return robot.getPosition();
}

