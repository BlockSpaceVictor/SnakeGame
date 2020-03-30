import Game from "./game.js";
import Matrix from "./matrix.js";
import NeuralNetwork from "./neuralnet.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

//constants:
const GAME_WIDTH = 300;
const GMAME_HEIGHT = 300;

//neural net paramaters:
const AUTOMATION_ON = true;  // enable the neural network and let it take over the game
const NUM_INPUTS = 4;
const NUM_HIDDEN = 20;
const NUM_OUTPUTS = 2;
const NUM_SAMPLES = 100000;
const OUTPUT_THRESHOLD = 0.05;


//set up neural network
let nn;

if(AUTOMATION_ON){
	nn = new NeuralNetwork(NUM_INPUTS, NUM_HIDDEN, NUM_OUTPUTS);

	//train network:
	for(let i = 0; i < NUM_SAMPLES; i++){
		
		/* 
		x = head.x (center)
		y = head.y
		fx = food.x
		fy = food.y
		*/

		let x = Math.floor(Math.random()* GAME_WIDTH);
		let y = Math.floor(Math.random()* GMAME_HEIGHT);
		let fx = Math.floor(Math.random()* GAME_WIDTH);
		let fy = Math.floor(Math.random()* GMAME_HEIGHT);

		var output;

		if(fx > x && fy > y){
			output = [1,1]; //right down
		} else if (fx > x && fy < y){
			output = [1,0]; //right up
		} else if (fx < x && fy > y){
			output = [0,1]; // left
		} else if (fx < x && fy <y){
			output = [0,0]; //left up
		} else if (fx == x && fy > y){
			output = [0.5,1];
		} else if (fx == x && fy < y){
			output = [0.5,0];
		} else if (fx > x && fy == y){
			output = [1, 0.5];
		} else {
			output = [0,0.5];
		}

		nn.train(normalize([x,y,fx,fy]), output);
	}

	//test network: 
	console.log("Neural Network Stats:");
	console.log("Input Layer: " + NUM_INPUTS);
	console.log("Hidden Layers: " + NUM_HIDDEN);
	console.log("Number of training iterations: " + NUM_SAMPLES);
	console.log("Testing Network Performance on random samples: ");
	console.log(" fx > x && fy > y expected result: [1,1]: " + nn.feedForward(normalize([20 ,50, 50, 100])).data);
	console.log(" fx > x && fy < y expected result: [1,0]: " + nn.feedForward(normalize([20 ,200, 50, 80])).data);
	console.log(" fx < x && fy > y expected result: [0,1]: " + nn.feedForward(normalize([300 ,150, 130, 350])).data);
	console.log(" fx < x && fy < y expected result: [0,0]: " + nn.feedForward(normalize([400 ,200, 50, 50])).data);

	console.log(" fx == x && fy > y expected result: [0.5,1]: " + nn.feedForward(normalize([50 ,50, 50, 100])).data);
	console.log(" fx == x && fy < y expected result: [0.5,0]: " + nn.feedForward(normalize([100 ,200, 100, 80])).data);
	console.log(" fx > x && fy == y expected result: [1,0.5]: " + nn.feedForward(normalize([70 ,150, 300, 150])).data);
	console.log(" fx < x && fy == y expected result: [0,0.5]: " + nn.feedForward(normalize([400 ,200, 50, 200])).data);
}

function normalize(inputs){
	var x = inputs[0]; 
	var y = inputs[1]; 
	var fx = inputs[2]; 
	var fy = inputs[3]; 

	var xnorm = x / GAME_WIDTH;
	var ynorm = y / GMAME_HEIGHT;
	var fxnorm = fx / GAME_WIDTH;
	var fynorm = fy / GMAME_HEIGHT;


	return [xnorm, ynorm, fxnorm, fynorm];
}

let game = new Game(GAME_WIDTH, GMAME_HEIGHT, nn);

let lastTime = 0;
game.start();

function gameLoop(timestamp) {

	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
  	
  	ctx.clearRect(0, 0, GAME_WIDTH, GMAME_HEIGHT);

	game.update(deltaTime);
    game.draw(ctx);
    
    requestAnimationFrame(gameLoop);
	
}

requestAnimationFrame(gameLoop);