import EnemyController from "./EnemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

//set the canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 700;

//create Controllers
const playerBulletController = new BulletController(canvas, 13, "red", true);
const enemyBulletController = new BulletController(canvas, 4, "white", false);
const enemyController = new EnemyController(
    canvas,
    enemyBulletController,
    playerBulletController
);
const player = new Player(canvas, 3, playerBulletController);

//create background
const background = new Image();
background.src = 'images/space.png'

let isGameOver = false;
let didWin = false;


//set up gameloop 
function game() {
    checkGameOver();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}

function displayGameOver() {
    if (isGameOver) {
      let text = didWin ? "You Win" : "Game Over";
      let textOffset = didWin ? 2.5 : 3;
  
      ctx.fillStyle = "Yellow";
      ctx.font = "70px Courier";
      ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
  }

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)){
        isGameOver = true;
    }
    if(enemyController.enemyRows.length === 0){
        didWin = true;
        isGameOver = true;
    }
}

setInterval(game, 1000 / 60)
