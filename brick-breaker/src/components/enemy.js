/***********************************************
enemy.js : Enemy component
***********************************************/

// Enemy component definition
Crafty.c('Enemy', {
	
	// required components automatically included
	required: '2D, Canvas, SpriteAnimation, Tween, Object, Collision, Delay',

	// executed once at creation
    init: function() {
		// dimension and style
		this.addComponent('SpriteEnemy');
		// animation : when the enemy gets hit
		this.getHitAnimTime = 250;
		this.getHitFrames = [[2, 0], [0, 0]];
		this.reel('getHitAnimation', this.getHitAnimTime, this.getHitFrames);
		// animation : when the enemy shoots lasers
		this.doFireAnimTime = 300;
		this.doFireFrames = [[1, 0], [0, 0]];
		this.reel('doFireAnimation', this.doFireAnimTime, this.doFireFrames);
		// animation : when the enemy dies
		this.deathAnimTime = 300;
		this.deathFrames = [[3, 0], [4, 0], [5, 0]];
		this.reel('deathAnimation', this.deathAnimTime, this.deathFrames);
		// motion
		this.msMovementSpeed = (Game.mode == 'slow' ? 900 : (Game.mode == 'fast' ? 700 : 500));
		this.movementRange = 10;
		// fire
		this.msFireSpeed = (Game.mode == 'slow' ? 7000 : (Game.mode == 'fast' ? 5000 : 3000));
		this.msFireStart = Crafty.math.randomElementOfArray([1000, 1500, 2000, 2500, 3000, 3500, 4000]);
		// collision
		this.checkHits('Ball, PlayerLaser');
		// life
		this.life = 2;
		this.isKilled = false;
		// boss
		this.isBoss = false;
		// drop
		this.hasDrop = false;
		this.dropType = null;
    },
	
	// each event has a function bound to it
	events: {
		'HitOn': 'getHit'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// move and attack continuously
	doActivity: function(startMs){
		this.delay(function(){
			var startX = this.x;
			var startY = this.y;
			// move randomly within a radius
			this.moveRandomly(startX, startY);
			this.delay(function(){
				this.moveRandomly(startX, startY);
			}, this.msMovementSpeed, -1);		
			// fire continuously
			this.delay(function(){
				this.doFire();
				this.delay(function(){
					this.doFire();
				}, this.msFireSpeed, -1);
			}, this.msFireStart);
		}, startMs);
		return this;
	},
	
	// move randomly within a radius
	moveRandomly: function(x, y){
		if(!this.isKilled){
			var randomX = Crafty.math.randomInt(x-this.movementRange, x+this.movementRange);
			var randomY = Crafty.math.randomInt(y-this.movementRange, y+this.movementRange);
			this.tween({x: randomX, y: randomY}, this.msMovementSpeed);
		}
	},
	
	// fire laser projectiles
	doFire: function(){
		if(!this.isKilled){
			this.animate('doFireAnimation');
			// sound
			if(!iOS){
				Crafty.audio.play('enemy-shoots-lasers', 1, 0.4);
			}
			if(!this.isBoss){
				Crafty.e('Laser').setEnemyLaser().place(this.x + this.w/2, this.y + this.h - 5);
			} else {
				Crafty.e('Laser').setEnemyBossLaser().place(this.x + this.w/2 - 2, this.y + this.h - 8).attr({xSpeed: -0.75});
				Crafty.e('Laser').setEnemyBossLaser().place(this.x + this.w/2 - 2, this.y + this.h - 8).attr({xSpeed: 0.75});
			}
		}
	},
	
	// what to do when a ball or laser collides with the enemy
	getHit: function(){
		if(!this.isKilled){
			this.life -= 1;
			this.animate('getHitAnimation');
			if(this.life <= 0){
				this.getKilled(); 
			} else {
				// sound
				if(!iOS){
					Crafty.audio.play('enemy-gets-hit', 1, 0.8);
				}
			}
		}
	},
	
	// kill the enemy
	getKilled: function(){
		this.isKilled = true;
		// sound
		if(!iOS){
			Crafty.audio.play('enemy-gets-killed', 1, 0.8);
		}
		// drop
		if(this.hasDrop){
			this.drop();
		}
		this.unbind('HitOn');
		// stop moving
		this.pauseTweens();
		this.removeComponent('Enemy');
		// die
		this.animate('deathAnimation');
		this.delay(function(){ 
			this.destroy(); 
		},this.deathAnimTime,0,function(){
			if(Crafty('Enemy').length == 0){
				var player = Crafty('Player');
				if(player.length != 0 && !player.levelDone){
					// stop music
					if(!iOS){
						Crafty.audio.stop('boss');
					}
					player.nextLevel();
				}
			}
		});
	},
	
	// set enemy as boss
	setBoss: function(){
		this.isBoss = true;
		this.w *= 2; 
		this.h *= 2;
		this.msMovementSpeed *= 1.5;
		this.movementRange /= 1.5;
		this.msFireSpeed *= 1.5;
		this.life *= 5;
		return this;
	},
	
	// make the enemy drop a bonus/malus when destroyed
	setDrop: function(drop){
		this.hasDrop = true;
		this.dropType = drop;
		return this;
	},
	
	// drop a bonus/malus
	drop: function(){
		Crafty.e('Drop').setType(this.dropType).placeOn(this);
		return this;
	},
	
});