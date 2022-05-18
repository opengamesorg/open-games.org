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
		this.z = 999;
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
		this.y = Game.height/2 - this.h + (Game.mobile ? 5 : 0);
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
		if(Game.mobile){
			this.text(this.defaultMobileSubtitle);
		} else {
			this.text(this.defaultSubtitle);
		}
		return this;
	},
	
	// mode choice in the menu
	setModeChoice: function() {
		this.css({'background-position': '110px '+(userBrowser.isFirefox?8:4)+'px'});
		this.addComponent('Image');
		this.choose = function() {
			this.image('assets/images/menu/arrow.png');
			return this;
		};
		this.unchoose = function() {
			this.image('assets/images/menu/no-arrow.png');
			return this;
		};
		return this;
	},
	
	// mode choice in the menu for mobile version
	setMobileModeChoice: function() {
		this.w = 240;
		this.x = Game.width/2 - this.w/2;
		this.css({
			'border': '1px solid white', 
			'padding-top': '14px', 
			'padding-bottom': '12px'
		});
		return this;
	},
	
	// instructions for mobile version
	setMobileInstruction: function() {
		this.h = 20;
		this.textFont({size: '20px'});
		this.css({'textShadow': 'black 1px 1px'});
		return this;
	},
	
	// message for received drop type by player
	setDropMessage: function() {
		this.x = 0;
		this.y = Game.height - (Game.mobile ? 37 : 40);
		this.w = Game.width;
		this.h = 30;
		this.textFont({size: '20px'});
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