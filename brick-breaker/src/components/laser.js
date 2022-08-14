/***********************************************
laser.js : Laser component
***********************************************/

// Laser component definition
Crafty.c('Laser', {
	
	// required components automatically included
	required: '2D, DOM, Color, Collision, Delay',

	// executed once at creation
    init: function() {
		// dimension and style
		this.w = 3;
        this.h = 6;
		this.color('white');
		this.css('borderRadius', '1px');
		// motion
		this.xSpeed = 0;
		this.ySpeed = 6;
		// moving direction
		this.direction = 'up';
		// collision
		this.checkHits('Object');
    },
	
	// each event has a function bound to it
	events: {
		'UpdateFrame': 'doMotion',
		'HitOn': 'doHit'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the moving direction of the entity
	setDirection: function(direction){
		this.direction = direction;
		return this;
	},
	
	// set laser as coming from the player
	setPlayerLaser: function(){
		this.addComponent('PlayerLaser');
		return this;
	},
	
	// set laser as coming from an enemy
	setEnemyLaser: function(){
		this.addComponent('EnemyLaser');
		this.setDirection('down');
		this.color('yellow');
		this.w = 3;
		this.h = 4;
		this.ySpeed = (Game.mode == 'slow' ? 4 : (Game.mode == 'fast' ? 5 : 6));
		return this;
	},
	
	// set laser as coming from an enemy boss
	setEnemyBossLaser: function(){
		this.addComponent('EnemyLaser');
		this.setDirection('down');
		this.color('yellow');
		this.w = 5;
		this.h = 5;
		this.ySpeed = (Game.mode == 'slow' ? 3 : (Game.mode == 'fast' ? 4 : 5));
		return this;
	},
	
	// do entity motion
	doMotion: function(){
		// depending on the direction
		if(this.direction == 'up'){
			this.y -= this.ySpeed;
		} else if(this.direction == 'down'){
			this.y += this.ySpeed;
		}
		this.x += this.xSpeed;
		
		// if the entity goes out of the frame, it gets destroyed
		if(this.x <= 0 - this.w){
			this.destroy();
		}
		if(this.x >= Game.width){
			this.destroy();
		}
		if(this.y <= 0 - this.h){
			this.destroy();
		}
		if(this.y >= Game.height){
			this.destroy();
		}
	},
	
	// what to do when the laser collides with an Object 
	doHit: function(hitDatas){
		for(var i = 0; i < hitDatas.length; i++){
			// get the colliding entity and act accordingly
			var hitData = hitDatas[i];
			var hittingEntity = hitData.obj;
			if(hittingEntity.has('Brick') || (hittingEntity.has('Enemy') && !this.has('EnemyLaser')) || (hittingEntity.has('Player') && !this.has('PlayerLaser'))){
				this.delay(function(){
					this.destroy();
				}, 10);
			}
		}
	},
	
});