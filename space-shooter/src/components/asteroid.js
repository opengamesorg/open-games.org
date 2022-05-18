/***********************************************
asteroid.js : Asteroid component
***********************************************/

// Asteroid component definition
Crafty.c('Asteroid', {
	
	// required components automatically included
	required: '2D, Canvas, Image, Collision',

	// executed once at creation
    init: function() {
		this.xSpeed = 0;
		// random vertical speed
		var ySpeedMin = (Game.difficulty == 'standard' ? 1.5 : 2.5);
		var ySpeedMax = (Game.difficulty == 'standard' ? 4 : 6);
		this.ySpeed = Crafty.math.randomInt(ySpeedMin, ySpeedMax);
		// random rotation speed
		this.rotationValue = Crafty.math.randomInt(1, 4);
		this.origin('center');
		// random type : size and image
		this.randomTypeSet = ['medium','big'];
		this.type = this.randomTypeSet[Crafty.math.randomInt(0,this.randomTypeSet.length-1)];
		this.image('assets/images/asteroid/'+this.type+'.png');
		this.properties = {
			damage: 300
		};
    },
	
	events: {
		// continuous execution of doMotion()
		'UpdateFrame': 'doMotion'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// do entity motion and rotation
	doMotion: function(){
		// rotation
		this.rotation += this.rotationValue;
		// vertical motion
		this.y += this.ySpeed;
		// horizontal motion
		this.x += this.xSpeed;
		// if the entity goes out of the frame, it gets destroyed
		if(this.x <= 0 - this.w){
			this.destroy();
		}
		if(this.x >= Game.width){
			this.destroy();
		}
		if(this.y >= Game.height){
			this.destroy();
		}
	}
	
});