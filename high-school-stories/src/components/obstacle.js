/***********************************************
obstacle.js : Obstacle component
***********************************************/

// Obstacle entities are invisible rectangles,
// of various dimensions, which prevent the
// player from moving forward.
// Their placement is made, in relation to the 
// background image and the added decor, in 
// such a way that the player movement will be 
// blocked by walls or any piece of furniture.

// Obstacle component definition
Crafty.c('Obstacle', {
	
	// required components automatically included
	required: '2D, DOM, Collision',

	// executed once at creation
    init: function(){
		// above everything except CustomText and Dialogue
		// useful when highlighted
		this.z = 998;
		// set a color so it becomes visible
		// used for placement and debug
		// this.highlight('red');
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
	
	// set a color so it becomes visible
	// used for placement and debug
	highlight: function(color){
		this.addComponent('Color');
		this.color(color);
		return this;
	},
	
});