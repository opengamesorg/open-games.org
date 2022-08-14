/***********************************************
jewel-container.js : JewelContainer component
***********************************************/

// JewelContainer component definition
Crafty.c('JewelContainer', {
    
	// required components automatically included
	required: '2D, DOM, Image',

	// executed once at creation
    init: function() {
        this.w = Game.width;
        this.h = 60;
		this.x = 0;
		this.y = 190;
		this.z = 0; // must be inferior to Jewel's z
    },
	
	// change its image
	setJewelContainer: function(type){
		this.image('assets/images/jewel/jewelContainer-'+type+'.png');
	}
	
});