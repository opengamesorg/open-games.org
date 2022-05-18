/***********************************************
enemy.js : Enemy component
***********************************************/

// Enemy component definition
Crafty.c('Enemy', {
	
	// required components automatically included
	required: '2D, DOM, Image, Tween, HUD, Delay, Renderable',

	// executed once at creation
    init: function(){
		this.w = 100;
		this.h = 100;
		this.alpha = 0.35;
		this.speed = 500;
		this.image('assets/images/enemy/enemy.gif');
		this.direction = 'right';
    },
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set direction and rotate accordingly
	setDirection: function(direction){
		this.direction = direction;
		this.origin('center');
		if(direction == 'up') this.rotation = -90;
		if(direction == 'left') this.rotation = -180;
		if(direction == 'down') this.rotation = 90;
		return this;
	},

	// the enemy shows up sometimes, from where it's hidden
	show: function(){
		var tweenProps;
		if(this.direction == 'up') 
			tweenProps = {x: this.x, y: (Game.mobile ? Game.stageHeight+(Game.mobileGap/3) : Game.stageHeight-50)};
		if(this.direction == 'left') 
			tweenProps = {x: (Game.mobile ? Game.stageWidth+(Game.mobileGap/3) : Game.stageWidth-50), y: this.y};
		if(this.direction == 'right') 
			tweenProps = {x: (Game.mobile ? -50+Game.mobileGap : -50), y: this.y};
		if(this.direction == 'down') 
			tweenProps = {x: this.x, y: (Game.mobile ? -50+Game.mobileGap : -50)};
		this.tween(tweenProps, this.speed);
		return this;
	},
	
	// the enemy goes back to hide after showing itself
	hide: function(){
		var tweenProps;
		if(this.direction == 'up') 
			tweenProps = {x: this.x, y: Game.stageHeight-Game.mobileGap};
		if(this.direction == 'left') 
			tweenProps = {x: Game.stageWidth-Game.mobileGap, y: this.y};
		if(this.direction == 'right') 
			tweenProps = {x: -100+Game.mobileGap, y: this.y};
		if(this.direction == 'down') 
			tweenProps = {x: this.x, y: -100+Game.mobileGap};
		this.tween(tweenProps, this.speed);
		return this;
	}
	
});