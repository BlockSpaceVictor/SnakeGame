import { detectCollision } from "./collisionDetections.js";

export default class Head {


	constructor(game){
		this.game = game;
		this.width = 20;
		this.height = 20;
		this.maxSpeed = 2;
		this.speed =2;
		this.updown = 0;
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.position = {
			x: game.gameWidth / 2 - this.width /2,
			y: game.gameHeight / 2 - this.height/2 
		};
	}

	update(deltaTime){
		this.position.x += this.speed;
		this.position.y += this.updown;
		console.log(this.position.x, this.position.y);

		//edge collisions:
		if (this.position.x < 0) this.position.x = 0;
    	if (this.position.x > this.gameWidth - this.width) {
      		this.position.x = this.gameWidth - this.width;
    	}
    	if (this.position.y < 0) this.position.y = 0;
    	if (this.position.y > this.gameHeight - this.height){
    		this.position.y = this.gameHeight - this.height;
    	}

    	//check collision with food
    	if(detectCollision(this, this.game.food)){
    		this.game.score++;
    		this.game.food.markedForDeletion = true;
    	}

	}

	moveUp(){
		this.speed =  0;
		this.updown = -this.maxSpeed;
	}

	moveDown(){
		this.speed =0;
		this.updown = this.maxSpeed;
	}

	moveLeft(){
		this.updown = 0;
		this.speed = -this.maxSpeed;
	}

	moveRight(){
		this.updown = 0;
		this.speed = this.maxSpeed;
	}

	draw(ctx){
		ctx.fillStyle = "f00";
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}
}