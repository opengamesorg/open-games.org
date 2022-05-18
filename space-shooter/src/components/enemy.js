/***********************************************
enemy.js : Enemy component
***********************************************/

// Enemy component definition
Crafty.c('Enemy', {
	
	// required components automatically included
	required: '2D, Canvas, Tween, Collision, SpriteAnimation, Delay, EnemyType', 

	// executed once at creation
    init: function() {
		// difficulty
		this.isStandard = (Game.difficulty == 'standard');
		
		// real-time collision detection with a list of components
		// for each collision, the HitOn event is triggered
		this.checkHits('Projectile, Asteroid');
		// ignore collision with these components
		this.ignoreHits('EnemyProjectile');
		
		// get hit animation : when the enemy gets hit
		// animation time in ms
		this.getHitAnimTime = 100;
		// positions of the frames in the enemy sprite
		this.getHitFrames = [[1, 0], [0, 0]];
		this.reel('getHitAnimation', this.getHitAnimTime, this.getHitFrames);
		
		// explosion animation : when the enemy dies
		// animation time in ms
		this.explosionAnimTime = 500;	
		// positions of the frames in the enemy sprite		
		this.explosionFrames = [[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0]];
		this.reel('explosionAnimation', this.explosionAnimTime, this.explosionFrames);
		
		// fire speed handicap if standard difficulty
		this.msFireSpeedHandicap = (this.isStandard ? 1250 : 0);
		this.stopFire = false;
		this.projectiles = [];
		
		// can drop a bonus when it dies
		this.isDrop = false;
		this.dropType = '';
		
		// can be invincible
		this.invicibleBlinkTime = 3000;
		this.isInvincible = false;
		
		this.isKilled = false;
		
    },
	
	events: {
		'HitOn': 'getHit'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// enemy activity : move and attack continuously
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
			this.doFire();
			this.delay(function(){
				this.doFire();
			}, this.msFireSpeed, -1);
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
	
	// do fire : create the projectiles stored in this.projectiles
	// a projectile can be 'multi' : several same projectiles fired at once
	doFire: function(){
		if(!this.isKilled){
			for(var j = 0; j < this.projectiles.length; j++){
				var projectile = this.projectiles[j];
				projectile.parentX = this.x;
				projectile.parentY = this.y ;
				
				if(projectile.isMulti){
					for(var i = 0; i < projectile.multi.number; i++){
						var x = this.x + projectile.x + (projectile.multi.spaceX * i);
						var y = this.y + projectile.y + (projectile.multi.spaceY * i);
						Crafty.e('Projectile').setProperties(projectile).create().place(x,y);
					}
				} else Crafty.e('Projectile').setProperties(projectile).create();
			}
		}
	},
	
	// get hit : called when the enemy collides with
	// an entity having a component listed in this.checkHits() 
	getHit: function(hitDatas){
		if(!this.isKilled && !this.isInvincible){
			// avoid some projectiles to sometimes skip the hit
			this.resetHitChecks('Projectile');
			// for each colliding entity
			for(var i = 0; i < hitDatas.length; i++){
				// get the colliding entity and act accordingly
				var hitData = hitDatas[i];
				var hittingProjectile = hitData.obj;
				if(hittingProjectile.has('PlayerProjectile') || hittingProjectile.has('Asteroid')){
					if(hittingProjectile.has('PlayerProjectile')) hittingProjectile.destroy();
					this.life -= hittingProjectile.properties.damage;
					this.animate('getHitAnimation');
					if(this.life <= 0){
						this.getKilled(); 
					}
				}
			}
			
		}
	},
	
	// kill the enemy
	getKilled: function(){
		if(!this.isKilled){
			// drop a bonus if any
			if(this.isDrop){
				var drop = Crafty.e('BonusDrop').place(this.x + this.w/2, this.y + this.h).setType(this.dropType);
			}
		}
		this.isKilled = true;
		this.unbind('HitOn');
		// stop moving
		this.pauseTweens();
		this.removeComponent('Enemy');
		// explode
		this.animate('explosionAnimation');
		// special boss behaviour
		if(this.has('Boss')){
			// the jewel is placed at the perfect position to match the sprite
			var jewel = Crafty.e('Jewel').setJewel(this.bossNumber);
			var x = this.x + this.w / 2 - jewel.w / 2 + this.jewelX; 
			var y = this.y + this.h / 2 - jewel.h / 2 + this.jewelY; 
			jewel.place(x, y);
		}
		this.delay(function(){ 
			this.destroy(); 
		},this.explosionAnimTime,0);
	},
	
	// set bonus to be dropped when killed
	setDrop: function(dropType){
		this.isDrop = true;
		this.dropType = dropType;
	},
	
	// true : set invincible and blink
	// false : blink and remove invincibility
	invincibleBlink: function(bool){
		this.alpha = 0.6;
		this.isInvincible = true;
		// blink
		this.delay(function(){
			if(this.alpha != 1){
				if(this.alpha == 0.6){
					this.alpha = 0.8;
				} else this.alpha = 0.6;
			}
		},this.invicibleBlinkTime/16, 15);
		// add or remove invincibility
		this.delay(function(){
			this.alpha = (bool ? 0.8 : 1);
			this.isInvincible = bool;
			// avoid some projectiles to sometimes skip the hit
			this.resetHitChecks('Projectile');
		},this.invicibleBlinkTime);
	}
	
});