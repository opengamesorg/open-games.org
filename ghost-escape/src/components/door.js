/***********************************************
door.js : Door component
***********************************************/

// Door component definition
Crafty.c('Door', {
	
	// required components automatically included
	required: 'Wall',

	// executed once at creation
    init: function(){
		this.color('black');
		this.exitScene = 'levelChoosing';
    },
	
	// set the door exit scene
	setExitScene: function(scene){
		this.exitScene = scene;
		return this;
	},
	
	// start the door exit scene
	startExitScene: function(){
		Crafty.scene(this.exitScene);
	},
		
	// set the door exit direction
	setDirection: function(direction){
		this.direction = direction;
		// an arrow appears near the door
		var arrow = Crafty.e('2D, Canvas, Image, Motion')
		.image('assets/images/door/'+direction+'-arrow.png');
		// the arrow is placed in front of the door
		// the arrow floats horizontally or vertically
		arrow.velocity = arrow.velocity();
		switch(direction){
			case 'right': 
				arrow.attr({x: this.x-23, y: this.y+20});
				arrow.velocity.x = 7;
				arrow.floatingFunction = function(){
					this.velocity.x = -this.velocity.x;
				};
				break;
			case 'left': 
				arrow.attr({x: this.x+23, y: this.y+20});
				arrow.velocity.x = -7;
				arrow.floatingFunction = function(){
					this.velocity.x = -this.velocity.x;
				};
				break;
			case 'up': 
				arrow.attr({x: this.x+20, y: this.y+23});
				arrow.velocity.y = -7;
				arrow.floatingFunction = function(){
					this.velocity.y = -this.velocity.y;
				};
				break;
			case 'down': 
				arrow.attr({x: this.x+20, y: this.y-23});
				arrow.velocity.y = 7;
				arrow.floatingFunction = function(){
					this.velocity.y = -this.velocity.y;
				};
				break;
			default: return;
		}
		Crafty.e('Delay').delay(function(){
			arrow.floatingFunction();
		}, 500, -1);
		return this;
	}
	
});