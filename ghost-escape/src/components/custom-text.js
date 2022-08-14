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
		this.defaultMobileSubtitle = 'TAP&nbsp;&nbsp;&nbsp;&nbsp;ANYWHERE';
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
	
	// menu title
	setMenuTitle: function() {
		this.addComponent('Tween');
		this.h = 40;
		this.x = 0; 
		this.textFont({size: '50px'});
		return this;
	},
	
	// title message
	setTitle: function() {
		this.w = Game.width;
		this.h = 30;
		this.x = 0; 
		this.y = 160;
		if(this.has('HUD')){
			this.x += Game.mobileGap;
			this.y += Game.mobileGap;
		}
		this.textFont({size: '40px'});
		return this;
	},
	
	// subtitle message
	setSubtitle: function() {
		this.w = Game.width;
		this.h = 20;
		this.x = 0; 
		this.y = (Game.mobile ? 210 : (userBrowser.isFirefox ? 215 : 212));
		if(this.has('HUD')){
			this.x += Game.mobileGap;
			this.y += Game.mobileGap;
		}
		this.textFont({size: '20px'});
		if(Game.mobile){
			this.text(this.defaultMobileSubtitle);
		} else {
			this.text(this.defaultSubtitle);
		}
		return this;
	},
	
	// message for mobile version
	setMobileMessage: function() {
		this.h = 20;
		this.textFont({size: '16px'});
		return this;
	},
	
	// make the text blink by toggling its opacity
	blink: function() {
		this.addComponent('Delay, Renderable');
		this.alpha = 1;
		this.delay(function(){
			this.alpha = (this.alpha == 0 ? 1 : 0);
		}, 500, -1);
		return this;
	}
	
});