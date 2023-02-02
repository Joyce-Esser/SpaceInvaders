export default class Enemy {

    //set constructor
    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        //set image width & height by size of image
        this.width = 32;
        this.height = 44;

        this.image = new Image()
        //get image dynamical
        this.image.src = `images/enemy${imageNumber}.png`
    }

    //implemnt draw enemy
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.height, this.width)
    }

    move(xVelocity, yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
    }
}