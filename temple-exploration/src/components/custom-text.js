/***********************************************
custom-text.js : CustomText component
***********************************************/

// CustomText component definition
Crafty.c('CustomText', {
    
	// required components automatically included
	required: '2D, DOM, Text',

	// executed once at creation
    init: function() {
        this.w = Game.width;
		this.textColor('white');
		this.textAlign('center');
		this.textFont({family: 'arcade'});
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
		this.addComponent('Renderable, Delay');
		this.h = 30;
		this.alpha = 0;
		this.textFont({size: '40px'});
		this.appear = function() {
			this.delay(function(){
				this.alpha += 0.1;
			}, 30, 10);
			return this;
		};
		return this;
	},
	
	// subtitle message
	setSubtitle: function() {
		this.addComponent('Image, Renderable, Delay');
		this.h = 20;
		this.alpha = 0;
		this.isChosen = false;
		this.textFont({size: '20px'});
		this.css({'background-position': 'center '+(userBrowser.isFirefox?5:1)+'px'});
		this.appear = function() {
			this.delay(function(){
				this.alpha += 0.2;
			}, 20, 5);
			return this;
		};
		// when chosen/unchosen in the menu
		this.choose = function() {
			this.isChosen = true;
			this.image('assets/images/menu/choose.png');
			return this;
		};
		this.unchoose = function() {
			this.isChosen = false;
			this.image('assets/images/menu/unchoose.png');
			return this;
		};
		return this;
	},
	
	// room to select in the menu
	setRoom: function() {
		this.addComponent('Image');
		this.h = 32;
		this.w = 32;
		this.textFont({size: '20px'});
		this.css({
			'padding-top': (userBrowser.isFirefox?3:7)+'px',
			'box-sizing': 'border-box'
		});
		this.image('assets/images/menu/room.png');
		this.choose = function() {
			this.isChosen = true;
			this.css({'box-shadow':'0 0 10px white'});
			return this;
		};
		this.unchoose = function() {
			this.isChosen = false;
			this.css({'box-shadow':'none'});
			return this;
		};
		return this;
	},
	
});