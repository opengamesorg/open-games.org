/***********************************************
trigger-zone.js : TriggerZone component
***********************************************/

// TriggerZone entity is simply a rectangle that 
// can be placed anywhere, but it will trigger 
// an action (like starting a dialogue) when the 
// player intersects the zone.

// TriggerZone component definition
Crafty.c('TriggerZone', {
	
	// required components automatically included
	required: '2D, DOM',

	// executed once at creation
    init: function() {
		// default action : begin dialogue
		this.action = 'beginDialogue';
		// set a color so it becomes visible
		// used for placement and debug
		// this.highlight('yellow');
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
	
	// set a color so it becomes visible
	// used for placement and debug
	highlight: function(color){
		this.addComponent('Color');
		this.color(color);
		return this;
	},

	// set the action function to be triggered
	setAction: function(action){
		this.action = action;
		return this;
	},
	
	// call the action function 
	// triggered when player intersects the zone
	triggerAction: function(){
		if(this.action){
			if(typeof this.action === 'function'){
				this.action();
			} else {
				if(this.action == 'beginDialogue'){
					if(this.has('Interactive')){
						this.beginDialogue();
					}
				}
			}
		}
		return this;
	},
});