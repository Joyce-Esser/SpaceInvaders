import Enemy from "./Emeny.js";
import MovingDirection from "./MovingDirection.js";

export default class EnemyController {

    //tilemap the enemies
    enemyMap = [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    enemyRows = [];

    //define enemy controller 
    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;

    //declare constructor
    constructor(canvas) {
        this.canvas = canvas;

        //create the enemies
        this.createEnemies();
    }

    updateVelocityAndDirection() {
        for (const enemyRow of this.enemyRows) {
            if (this.currentDirection == MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                //detect end of canvas
                const rightMostEnemy = enemyRow[enemyRow.length - 1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    //change moving direction
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            }
            else if (this.currentDirection === MovingDirection.downLeft) {
                if (this.moveDown(MovingDirection.left)) {
                    break;
                }
            } 
            else if (this.currentDirection === MovingDirection.left){
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostEnemy = enemyRow[0];
                if (leftMostEnemy.x <= 0){
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            }
            else if(this.currentDirection === MovingDirection.downRight){
                if (this.moveDown(MovingDirection.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    //implement draw
    draw(ctx) {
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
    }

    resetMoveDownTimer() {
        if(this.moveDownTimer <= 0){
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer() {
        if (this.currentDirection === MovingDirection.downLeft ||
            this.currentDirection == MovingDirection.downRight) {
            this.moveDownTimer --;
        }
    }

    //define drawEnemies
    drawEnemies(ctx) {
        //flatten the array and loop over enemyRows so the enemy draws itself
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity)
            enemy.draw(ctx);
        })
    }

    createEnemies() {
        //loop over enemies
        this.enemyMap.forEach((row, rowIndex) => {
            this.enemyRows[rowIndex] = [];
            //map row to list of enemy objects
            row.forEach((enemyNumber, enemyIndex) => {
                if (enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(
                        new Enemy(enemyIndex * 50, rowIndex * 35, enemyNumber))
                }
            });
        })
    }
}