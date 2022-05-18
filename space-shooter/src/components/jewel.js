/***********************************************
jewel.js : Jewel component
***********************************************/

// Jewel component definition
Crafty.c('Jewel', {
	
	// required components automatically included
	required: '2D, DOM, Image, Tween',

	// executed once at creation
	init: function(){
		this.w = 16;
		this.h = 19;
		// must be superior to JewelContainer's z
		this.z = 1;
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the number of the entity
	// depending on the boss who drops this jewel
	setJewel: function(number){
		this.number = number;
		this.image('assets/images/jewel/jewel-'+number+'.png');
		return this;
	},
	
	// move the jewel to its socket in the JewelContainer
	moveToContainer: function(ms){
		var x = 0; var y = 210;
		switch(this.number){
			case 1: 
				x = 170;
				break;
			case 2: 
				x = 214;
				break;
		}
		this.tween({x: x, y: y},ms);
	}
	
});