/***********************************************
bonus-drop.js : BonusDrop component
***********************************************/

// BonusDrop component definition
Crafty.c('BonusDrop', {
	
	// required components automatically included
	required: '2D, Canvas, Image',

	// executed once at creation
	init: function(){
		// vertical speed
		this.speed = 1;
	},
	
	events: {
		// continuous execution of doMotion()
		'UpdateFrame': 'doMotion'
	},
	
	// set the position of the entity
	place: function(x, y){
		if(x == 'center'){
			x = Game.width/2 - this.w/2;
		}
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the type of the entity
	setType: function(bonusType){
		this.type = bonusType;
		this.image('assets/images/bonus/'+bonusType+'.png');
		return this;
	},
	
	// get the type of the entity
	getType: function(){
		return this.type;
	},
	
	// do entity motion
	doMotion: function(){
		// the entity stops moving when arriving at the bottom
		if(this.y >= Game.height-55){
			return;
		}
		// vertical motion
		this.y += this.speed;
	}
	
});