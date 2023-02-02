import EnemyController from "./EnemyController.js";

//set the canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

//create enemyController
const enemyController = new EnemyController(canvas);

//create background
const background = new Image();
background.src = 'images/space.png'

//set up gameloop 
function game() {
    //draw the background in the canvas
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    //set enemy movement
    enemyController.draw(ctx);
}

setInterval(game, 1000 / 60)
