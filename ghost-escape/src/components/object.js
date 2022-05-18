/***********************************************
object.js : Object component
***********************************************/

// Object component definition
Crafty.c('Object', {
	
	// required components automatically included
	required: '2D, DOM, Color',

	// executed once at creation
    init: function(){
		this.color('purple');
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
	}
	
});