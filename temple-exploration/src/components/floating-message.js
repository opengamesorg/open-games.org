/***********************************************
floating-message.js : FloatingMessage component
***********************************************/

// FloatingMessage component definition
Crafty.c('FloatingMessage', {
    
	// required components automatically included
	required: '2D, DOM, Text, Delay, Motion, Renderable',

	// executed once at creation
    init: function() {
		this.textColor('white')
		.textFont({size: '20px', family: 'arcade'});
		// float in the air until destroyed
		this.float();
    },
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// float in the air until destroyed
	float: function(){
		this.velocity = this.velocity();
		this.velocity.y = -50;
		this.delay(function(){
			this.delay(function(){
				this.alpha -= 0.2;
			}, 20, 5, function(){
				this.destroy();
			});
		}, 400);
	}
	
});