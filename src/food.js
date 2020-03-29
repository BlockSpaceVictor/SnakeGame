export default class Food {


	constructor(game){
		this.width = 10;
		this.height = 10;
		this.gameWidth = game.gameWidth;
		this.gameHeight = game.gameHeight;
		this.position = {
			x: this.getRandomInt(0, this.gameWidth - this.width),
			y: this.getRandomInt(0, this.gameHeight - this.height)
		};
		this.markedForDeletion = false;
	}

	update(){
		
	}

	draw(ctx){
		ctx.fillStyle = "#ff0000"; 
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
	}

	getRandomInt(min, max) {
  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

}