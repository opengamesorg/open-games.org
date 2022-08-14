/***********************************************
interactive.js : Interactive component
***********************************************/

// Interactive entities are objects that have an
// event attached. The event, which is fired when
// Player presses an action key while intersecting
// the entity, can be a function or the start of a
// dialogue. The dialogues are linked to their 
// Interactive entities by the interactiveId in
// the global Dialogues variable.

// Interactive component definition
Crafty.c('Interactive', {
	
	// required components automatically included
	required: '2D, DOM',

	// executed once at creation
    init: function() {
		this.interactiveId = null;
		this.dialogueBranchId = 0;
		// direction at which player will look
		// when interacting with this element
		this.direction = null;
		// set a color so it becomes visible
		// used for placement and debug
		// this.highlight('green');
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
		this.z = 998;
		return this;
	},
	
	// set interactive id
	// needed to link with dialogue
    setInteractiveId: function(id){
		this.interactiveId = id;
		return this;
    },
	
	// begin a dialogue
    beginDialogue: function(){
		if(this.has('Npc')){
			this.directionBeforeDialogue = this.direction;
		}
		this.dialogue = Crafty.e('Dialogue');
		this.dialogue.parentId = this.getId();
		this.dialogue.currentBranchId = this.dialogueBranchId;
		for(var i = 0; i < Dialogues.length; i++){
			if(Dialogues[i].interactiveId == this.interactiveId){
				this.dialogue.data = Dialogues[i];
				break;
			}
		}
		this.dialogue.start();
    },
	
});