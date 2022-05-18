/***********************************************
action-box.js : ActionBox component
***********************************************/

// ActionBox component definition
Crafty.c('ActionBox', {
	
	// required components automatically included
	required: 'Loot, DOM',

	// executed once at creation
    init: function() {
		this.css({'box-shadow':'0 0 5px white'});
		this.image('assets/images/loot/action-box.png');
		this.message = 'ACTION';
    }
	
});