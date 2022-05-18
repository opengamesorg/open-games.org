/***********************************************
door.js : Door component
***********************************************/

// Door component definition
Crafty.c('Door', {
	
	// required components automatically included
	required: '2D, Canvas, SpriteAnimation, SpriteDoor, Delay',

	// executed once at creation
    init: function() {
		// dimensions
		this.w = 32;
		this.h = 50;
		// open door and close door animations
		this.animationTime = 500;
		this.openAnimationFrames = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]];
		this.closeAnimationFrames = [[12, 0], [11, 0], [10, 0], [9, 0], [8, 0], [7, 0], [6, 0], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0]];
		this.reel('openAnimation', this.animationTime, this.openAnimationFrames);
		this.reel('closeAnimation', this.animationTime, this.closeAnimationFrames);
    },
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// door number : associated with a key number
	setNumber: function(number){
		this.number = number;
		return this;
	},
	
	// the door opens
	open: function(){
		this.isOpen = true;
		// opening animation
		this.animate('openAnimation');
		this.delay(function(){
			
			// an arrow appears near the door
			var arrow = Crafty.e('2D, Canvas, Image, Renderable, Motion')
			.image('assets/images/door/right-arrow.png')
			.attr({x: this.x-23, y: this.y+20, alpha: 0});
			// it fades in
			this.delay(function(){
				arrow.alpha += 0.2;
			}, 20, 5);
			// it floats horizontally
			arrow.velocity = arrow.velocity();
			arrow.velocity.x = 7;
			this.delay(function(){
				arrow.velocity.x = -arrow.velocity.x;
			}, 500, -1);

		},this.animationTime/2);
		return this;
	},
	
	// the door closes
	close: function(){
		this.isOpen = false;
		this.animate('closeAnimation');
		return this;
	},
	
	// launch next level
	// when player hits an open door
	nextLevel: function(){
		Crafty.scene('room-' + (this.number+1));
	},
	
	// the door appears
	// used in menu.js
	appear: function() {
		this.addComponent('Renderable');
		this.alpha = 0;
		this.delay(function(){
			this.alpha += 0.2;
		}, 20, 5);
		return this;
	}
	
});