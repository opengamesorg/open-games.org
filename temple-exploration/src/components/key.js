/***********************************************
key.js : Key component
***********************************************/

// Key component definition
Crafty.c('Key', {
	
	// required components automatically included
	required: 'Loot',
	
	// executed once at creation
    init: function() {
		this.image('assets/images/loot/key.png');
    },
	
	// key number : associated with a door number
	setNumber: function(number){
		this.number = number;
		this.message = number;
		return this;
	},
	
	// open the door associated with the key
	openDoor: function(){
		var keyNumber = this.number;
		Crafty('Door').each(function() {
			if(this.number == keyNumber){
				this.open();
				return;
			}
		});
	}
	
});