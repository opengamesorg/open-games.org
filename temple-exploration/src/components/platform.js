/***********************************************
platform.js : Platform component
***********************************************/

// Platform component definition
Crafty.c('Platform', {
	
	// required components automatically included
	// Color is used for debugging the placement
	required: '2D, Canvas, Image, Color',

	// executed once at creation
    init: function(){
		// this.color('red');
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
	
	// set the image of the entity
	setImage: function(image){
		this.image('assets/images/platform/'+image+'.png','repeat');
		return this;
	},
	
	// move the platform
	doMove: function(props, time){
		if(!this.has('Tween')){
			this.addComponent('Tween');
		}
		this.tween(props, time);
		return this;
	},
	
	// stop movement
	stopMoving: function(){
		this.pauseTweens();
		return this;
	},
	
	// resume movement
	resumeMoving: function(){
		this.resumeTweens();
		return this;
	}
	
});