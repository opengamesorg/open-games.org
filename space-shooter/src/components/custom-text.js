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
		this.h = 30;
		this.x = 0; 
		this.y = 250;
		this.textFont({size: '40px'});
		return this;
	},
	
	// subtitle message
	setSubtitle: function() {
		this.addComponent('Image');
		this.h = 20;
		this.x = 0; 
		this.y = 300;
		this.textFont({size: '20px'});
		return this;
	},
	
	// difficulty choice in the menu
	setDifficultyChoice: function() {
		this.css({'background-position': '140px '+(userBrowser.isFirefox?8:4)+'px'});
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
	
	// asteroid warning message
	setWarning: function() {
		this.w = 80;
        this.h = 40;
		this.x = Game.width/2 - this.w/2; // center
		this.y = 10;
		this.textFont({size: '16px'});
		this.css({'padding-top': (userBrowser.isFirefox?5:8)+'px'});
		// make it blink
		this.visibility = 'hidden';
		this.addComponent('Delay');
		this.delay(function(){
			this.css({'visibility': this.visibility});
			if(this.visibility == 'visible'){ 
				this.visibility = 'hidden';
			} else this.visibility = 'visible';
		},350,6,function(){
			// gets destroyed after blinking
			this.destroy();
		});
		// set type : Left, Right or Top
		this.setType = function(type){
			if(type.indexOf('Left') != -1){
				this.css({'background': 'url(assets/images/warning/warning'+type+'.png) no-repeat left top'});
			} else if(type.indexOf('Right') != -1){
				this.css({'background': 'url(assets/images/warning/warning'+type+'.png) no-repeat right top'});
			} else this.css({'background': 'url(assets/images/warning/warning'+type+'.png) no-repeat center top'});
			return this;
		};
		return this;
	}
	
});