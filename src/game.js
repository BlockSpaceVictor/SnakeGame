import Head from "/src/head.js";
import InputHandler from "/src/input.js";
import Food from "/src/food.js";

export default class Game {

	constructor(gameWidth, gameHeight){
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.score = 0;
		this.foodObjects = [];

		this.head = new Head(this);
		new InputHandler(this.head, this);
	}

	start(){
		this.food = new Food(this);
		this.foodObjects = [this.food];

	}

	update(deltaTime){	
		this.head.update(deltaTime);
		this.foodObjects.forEach(object => object.update(deltaTime));
		this.foodObjects = this.foodObjects.filter(object => !object.markedForDeletion);
		if(this.foodObjects.length < 1){
			this.food = new Food(this);
			this.foodObjects = [this.food];
		}
	}

	draw(ctx){
		this.head.draw(ctx);
		this.food.draw(ctx);

		//draw sore: 
		ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      	ctx.fillStyle = "rgba(1,0,0,0.1)";
      	ctx.fill();
		ctx.font = "15px Arial";
      	ctx.fillStyle = "black";
      	ctx.textAlign = "center";
      	ctx.fillText(this.score, 20, 30);
	}
}