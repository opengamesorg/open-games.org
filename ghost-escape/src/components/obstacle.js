/***********************************************
obstacle.js : Obstacle component
***********************************************/

// Obstacle component definition
Crafty.c('Obstacle', {
	
	// required components automatically included
	required: 'Object, Collision, Tween, Delay, Killing',

	// executed once at creation
    init: function(){
		this.direction = null;
		this.scoreValue = 0;
		this.scoreTriggered = false;
		this.scoreCheck = null;
    },
	
	// set the obstacle direction
	setDirection: function(direction){
		this.direction = direction;
		if(direction == 'top'){
			this.scoreCheck = function(){
				return this.y <= 100;
			};
		} else if(direction == 'left'){
			this.scoreCheck = function(){
				return this.x <= 100;
			};
		} else if(direction == 'right'){
			this.scoreCheck = function(){
				return this.x >= Game.width-100;
			};
		} else if(direction == 'bottom'){
			this.scoreCheck = function(){
				return this.y >= Game.height-100;
			};
		}
		return this;
	},
	
	// set the obstacle trigger and value to increase player score with
	// when an obstacle passes by player, his score is increased
	setIncreasePlayerScoreTrigger: function(value){
		this.scoreValue = value;
		this.bind('UpdateFrame', function(eventData) {
			if(!this.scoreTriggered && this.scoreCheck != null){
				if(this.scoreCheck()){
					this.scoreTriggered = true;
					Crafty.trigger('IncreasePlayerScore', this.scoreValue);
				}
			}
		});
		return this;
	}
	
});