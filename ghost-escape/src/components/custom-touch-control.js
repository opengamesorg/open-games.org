/***********************************************
custom-touch-control.js : CustomTouchControl component
***********************************************/

// CustomTouchControl component definition
Crafty.c('CustomTouchControl', {
	
	// required components automatically included
	required: '2D, CustomTouchLayer, Touch',

	// executed once at creation
    init: function(){
		
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
	
	// make the control layer cover the entire game screen
	fullScreen: function(){
		this.place(0, 0);
		this.size(Game.width, Game.height);
		return this;
	},
	
	// make the control layer cover half the game screen
	halfScreen: function(side){
		if(side == 'left'){
			this.place(0+Game.mobileGap, 0+Game.mobileGap);
		} else if(side == 'right'){
			this.place(Game.width/2+Game.mobileGap, 0+Game.mobileGap);
		}
		this.size(Game.width/2, Game.height);
		return this;
	}
	
});