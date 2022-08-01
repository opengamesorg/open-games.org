/***********************************************
decor.js : Decor component
***********************************************/

// Decor entities are static images or animated 
// sprites that are used to compose the stage 
// scenery, in addition to the background. They 
// tend to move, be animated, or disappear : for 
// example, an opening door.
// A decor can be set as "above", which means it 
// will be placed above mostly everything. This 
// is mainly used in interaction with characters 
// to simulate fake 3D.

// Decor component definition
Crafty.c('Decor', {
	
	// required components automatically included
	required: '2D, DOM, Image',

	// executed once at creation
    init: function(){
		// base decor images folder
		this.baseFolder = 'assets/images/decor/';
		// folder for the decor image
		this.folder = '';
		// set a color so it becomes visible
		// used for placement and debug
		// this.highlight('blue');
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
	
	// set the folder in which the decor image resides 
	setFolder: function(folder){
		this.folder = folder;
		return this;
	},
	
	// set the decor as "above" characters
	above: function(number){
		// above everything except CustomText and Obstacle and Dialogue
		this.z = 997;
		this.image(this.baseFolder + this.folder + '/above/' + number + '.png');
		return this;
	},
	
	// set a color so it becomes visible
	// used for placement and debug
	highlight: function(color){
		this.addComponent('Color');
		this.color(color);
		return this;
	},
	
});