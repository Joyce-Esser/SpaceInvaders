export default class Enemy {

    //set constructor
    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        //set image width & height by size of image
        this.width = 44;
        this.height = 32;

        this.image = new Image()
        //get image dynamical
        this.image.src = `images/enemy${imageNumber}.png`
    }

    //implemnt draw enemy
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xVelocity, yVelocity){
        this.x += xVelocity;
        this.y += yVelocity;
    }
}