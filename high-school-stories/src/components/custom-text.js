/***********************************************
custom-text.js : CustomText component
***********************************************/

// CustomText component definition
Crafty.c('CustomText', {
    
	// required components automatically included
	required: '2D, DOM, Text',

	// executed once at creation
    init: function() {
		this.textColor('white');
		this.textAlign('center');
		this.textFont({family: 'arcade'});
		this.defaultSubtitle = 'PRESS&nbsp;&nbsp;&nbsp;&nbsp;ENTER';
		// above everything
		this.z = 1000;
    },
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the size of the entity
	size: function(w, h){
		this.h = h;
		this.w = w;
		return this;
	},
	
	// loading message
	setLoading: function() {
		this.h = 20;
		this.x = 2;
		this.w = Game.stageWidth;
		this.y = Game.stageHeight/2 - this.h/2;
		this.text('Loading...');
		this.textFont({size: '16px'});
		return this;
	},
	
	// title message
	setTitle: function() {
		this.w = Game.width;
		this.h = 30;
		this.x = 0; 
		this.y = Game.height/2 - this.h;
		this.textFont({size: '40px'});
		this.css({'textShadow': 'black 2px 2px'});
		return this;
	},
	
	// subtitle message
	setSubtitle: function() {
		this.w = Game.width;
		this.h = 20;
		this.x = 0; 
		this.y = Game.height/2 + 20;
		this.textFont({size: '20px'});
		this.css({'textShadow': 'black 1px 1px'});
		this.text(this.defaultSubtitle);
		return this;
	},

	// make the text blink by toggling its opacity
	blink: function() {
		this.addComponent('Delay');
		this.alpha = 1;
		this.blinkDelay = function(){
			this.alpha = (this.alpha == 1 ? 0 : 1);
		};
		this.delay(this.blinkDelay, 750, -1);
		return this;
	},
	
});