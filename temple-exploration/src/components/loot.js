/***********************************************
loot.js : Loot component
***********************************************/

// Loot component definition
Crafty.c('Loot', {
	
	// required components automatically included
	required: '2D, Canvas, Image, Delay, Renderable, Motion',

	// executed once at creation
    init: function() {
		// creation animation
		this.appear();
		// float in the air continuously
		this.float();
    },
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// message shown when disappearing
	setMessage: function(message){
		this.message = message;
		return this;
	},
	
	// make the entity appear
	appear: function(){
		this.alpha = 0;
		this.delay(function(){
			this.alpha += 0.2;
		}, 20, 5);
		return this;
	},
	
	// make the entity disappear while showing a message
	disappear: function(){
		this.showMessage();
		this.delay(function(){
			this.alpha -= 0.2;
		}, 20, 5, function(){
			this.destroy();
		});
	},
	
	// show a message
	showMessage: function(){
		Crafty.e('FloatingMessage').text(this.message).place(this.x, this.y);
		return this;
	},
	
	// float in the air continuously
	float: function(){
		this.velocity = this.velocity();
		this.velocity.y = 7;
		this.delay(function(){
			this.velocity.y = -this.velocity.y;
		}, 500, -1);
		return this;
	},
	
	// action : a function called when player hits the entity 
	action: function(action){
		this.action = action;
		return this;
	}
	
});