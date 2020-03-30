import Head from "/src/head.js";
import InputHandler from "/src/input.js";
import Food from "/src/food.js";
import Matrix from "/src/matrix.js";
import NeuralNetwork from "/src/neuralnet.js";

export default class Game {

	constructor(gameWidth, gameHeight, nn){
		this.nn = nn;
		this.gameWidth = gameWidth;
		this.gameHeight = gameHeight;
		this.score = 0;
		this.foodObjects = [];
		this.OUTPUT_THRESHOLD = 0.2;

		this.head = new Head(this);
		new InputHandler(this.head, this);
	}

	start(){
		this.food = new Food(this);
		this.foodObjects = [this.food];

	}

	update(deltaTime){	

		// neural net activity: 
		// predict: 
		var x = this.head.position.x + this.head.width / 2;
		
		var y = this.head.position.y + this.head.height / 2;
		
		var fx = this.foodObjects[0].position.x + this.foodObjects[0].width / 2;
		
		var fy = this.foodObjects[0].position.y + this.foodObjects[0].height / 2;
		

		let outputs = this.nn.feedForward(this.normalize([x,y,fx,fy])).data;
		//console.log("outputs: " + outputs);
		//console.log("output 0: " + outputs[0][0]);
		//console.log("output 1: " + outputs[0][1]);

		// move head based on nn output: 
		if(outputs[0][0] <= 0.2){
			this.head.moveLeft();
			//console.log("the left case!");
		} else if(outputs[0][0] >= (1 - 0.2)){
			this.head.moveRight();
			//console.log("the right case!");
		} else {
			// 
			//console.log("hit the else case for output 0");
		}

		if(outputs[0][1] <= 0.2){
			this.head.moveUp();
			//console.log("the up case!");
		} else if (outputs[0][1] >= (1 - 0.2)){
			this.head.moveDown();
			//console.log("the down case!");
		} else {
			//
			//console.log("hit the else case for output 1");
		}

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

	normalize(inputs){
		var x = inputs[0]; 
		var y = inputs[1]; 
		var fx = inputs[2]; 
		var fy = inputs[3]; 


		var xnorm = x / this.gameWidth;
		var ynorm = y / this.gameHeight;
		var fxnorm = fx / this.gameWidth;
		var fynorm = fy / this.gameHeight;


		return [xnorm, ynorm, fxnorm, fynorm];
	}
}