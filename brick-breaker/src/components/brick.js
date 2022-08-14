/***********************************************
brick.js : Brick component
***********************************************/

// Brick component definition
Crafty.c('Brick', {
	
	// required components automatically included
	required: '2D, DOM, Color, Collision, Delay, Renderable, Object',

	// executed once at creation
    init: function() {
		// dimension and style
		this.w = 30;
        this.h = 10;
		this.css('boxShadow', 'black 0px 0px 3px 0px inset');
		this.setRandomColor();
		// breakable
		this.addComponent('Breakable');
		// drop
		this.hasDrop = false;
		this.dropType = null;
		// collision
		this.checkHits('Ball, Laser');
    },
	
	// each event has a function bound to it
	events: {
		'HitOn': 'getHit'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the size of the entity
	size: function(w, h){
		this.w = w;
		this.h = h;
		return this;
	},
	
	// set a random background color to the brick
	setRandomColor: function(){
		var colors = ['red','yellow','green','chartreuse','blue','cyan','fuchsia','pink'];
		var color = colors[Math.floor(Math.random()*colors.length)];
		this.color(color);
		return this;
	},
	
	// make the brick unbreakable
	setUnbreakable: function(){
		this.removeComponent('Breakable', false);
		this.color('gray');
		return this;
	},
	
	// make the brick drop a bonus/malus when destroyed
	setDrop: function(drop){
		this.hasDrop = true;
		this.dropType = drop;
		return this;
	},
	
	// what to do when a ball or laser collides with the brick
	getHit: function(){
		if(this.has('Breakable')){
			if(this.hasDrop){
				this.drop();
			}
			this.removeFromStage();
		}
	},
	
	// drop a bonus/malus
	drop: function(){
		Crafty.e('Drop').setType(this.dropType).placeOn(this);
		return this;
	},
	
	// remove the brick from the stage
	removeFromStage: function(){
		this.destroy();
		var brickNumber = Crafty('Brick Breakable').length;
		var player = Crafty('Player');
		if(brickNumber == 0){
			if(player.length != 0 && !player.levelDone){
				player.nextLevel();
			}
		} else if(brickNumber == 1){
			Crafty('Brick Breakable').delay(function(){
				if(!player.levelDone){
					this.blinkAndRemove();
				}
			}, 10000);
		}
	},
	
	// the brick blinks before being removed
	blinkAndRemove: function(){
		this.alpha = 0.25;
		this.delay(function(){
			if(this.alpha == 0.25){
				this.alpha = 1;
			} else this.alpha = 0.25;
		}, 225, 13, function(){
			this.removeFromStage();
			// sound
			if(!iOS){
				Crafty.audio.play('ball-hits-brick');
			}
		});
	},
	
});