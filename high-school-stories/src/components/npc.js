/***********************************************
npc.js : Npc component
***********************************************/

// Npc entities are Non-player characters. They
// don't have any particuliar behaviour, but
// they inherit from their required components.

// Npc component definition
Crafty.c('Npc', {
	
	// required components automatically included
	required: 'Character, Obstacle, Interactive',

	// executed once at creation
    init: function() {
		
    },
	
});