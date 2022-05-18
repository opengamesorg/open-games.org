/***********************************************
player.js : Player component
***********************************************/

// Player component definition
Crafty.c('Player', {
	
	// required components automatically included
	required: '2D, Canvas, Multiway, Collision, SpriteAnimation, Keyboard, Tween, Delay, Renderable, Persist',

	// executed once at creation
    init: function() {
		// dimensions
        this.w = 30;
        this.h = 30;
		// start position
		this.initX = Game.width / 2 - this.w / 2; 
		this.initY = Game.height - 60;
		this.x = this.initX;
		this.y = this.initY;
		
		// real-time collision detection with a list of components
		// for each collision, the HitOn event is triggered
		this.checkHits('Projectile, Enemy, Asteroid, Electricity, BonusDrop');
		// ignore collision with these components
		this.ignoreHits('PlayerProjectile');
		// set the collision hitbox for the entity
		// add WiredHitBox component to see the hitbox
		this.collision([0, 15, 0, 30, 30, 30, 30, 15, 15, 0]);
		
		// movement in all directions
		this.movementSpeed = 130;
		this.multiway(this.movementSpeed, Player.keys.multiway);
		
		// set the player sprite
		this.addComponent('SpritePlayer');
		
		// explosion animation : when the player dies
		// animation time in ms
		this.explosionAnimTime = 500;
		// positions of the explosion frames in the player sprite
		this.explosionFrames = [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]];
		this.reel('explosionAnimation', this.explosionAnimTime, this.explosionFrames);
		
		// bonus animation : when the player gets a bonus
		// animation time in ms
		this.bonusAnimTime = 350;
		// positions of the bonus frames in the player sprite
		this.bonusFrames = [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1]];
		this.reel('bonusAnimation', this.bonusAnimTime, this.bonusFrames);
		
		// firing properties : when the player shoots
		this.fireSpeed = 400;
		this.isFiring = false;
		this.fireKey = Player.keys.keyAction;
		
		// player projectile properties
		// start with only the first projectile
		// the other projectiles will be added with setBonus('upgradeProjectileBonus')
		this.projectileProperties = [
			{
				w: 4,
				h: 8,
				x: 6,
				y: 0,
				type: 'playerProjectile-1',
				xSpeed: 0,
				ySpeed: 10,
				damage: 10,
				isMulti: true,
				multi: { number: 2, spaceX: 14, spaceY: 0 }
			},{
				w: 6,
				h: 12,
				x: 6,
				y: 0,
				type: 'playerProjectile-2',
				xSpeed: 0,
				ySpeed: 14,
				damage: 15,
				isMulti: true,
				multi: { number: 2, spaceX: 12, spaceY: 0 }
			},{
				w: 10,
				h: 10,
				x: 'center',
				y: 0,
				type: 'playerProjectile-3',
				xSpeed: 0,
				ySpeed: 12,
				damage: 20,
				isMulti: false
			},{
				w: 5,
				h: 13,
				x: 0,
				y: 0,
				type: 'playerProjectile-4',
				xSpeed: 0,
				ySpeed: 8,
				damage: 30,
				isMulti: true,
				multi: { number: 2, spaceX: 25, spaceY: 0 }
			},{
				w: 14,
				h: 14,
				x: 'center',
				y: 0,
				type: 'playerProjectile-5',
				xSpeed: 0,
				ySpeed: 6,
				damage: 50,
				isMulti: false
			},
			{
				w: 8,
				h: 8,
				x: 'center',
				y: 0,
				type: 'playerProjectile-6',
				xSpeed: 0,
				ySpeed: 11,
				damage: 25,
				isMulti: false
			}
		];
		
		// common projectile properties
		for(var i = 0; i < this.projectileProperties.length; i++){
			this.projectileProperties[i].parentX = this.x;
			this.projectileProperties[i].parentY = this.y;
			this.projectileProperties[i].parentW = this.w;
			this.projectileProperties[i].parentH = this.h;
			this.projectileProperties[i].components = ['PlayerProjectile'];
			this.projectileProperties[i].direction = 'top';
		}
		
		// current in-use projectiles
		// start with only the first one
		this.currentProjectilePropertiesIndex = 0;
		this.projectiles = [this.projectileProperties[this.currentProjectilePropertiesIndex]];
		
		// death and revive properties
		// when the player dies, it is revived and stays invincible for a moment
		// the deathCount isn't stored here, but in the Player global variable (src/init.js)
		this.reviveTime = 1000;
		this.reviveInvicibleTime = 2000;
		this.isInvincible = false;
		this.isKilled = false;
    },
	
	// each event has a function bound to it
	events: {
		'Move': 'doMotion',
		'KeyDown': 'handleFire',
		'HitOn': 'getHit'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// do entity motion
	doMotion: function(){
		// if the entity goes out of the frame, it is stopped
		if(this.x <= 0){
			this.x = 0;
		}
		if(this.x + this.w >= Game.width){
			this.x = Game.width - this.w;
		}
		if(this.y <= 0){
			this.y = 0;
		}
		if(this.y + this.h >= Game.height){
			this.y = Game.height - this.h;
		}
	},
	
	// move to initial position
	// used at the end of every level
	moveToInitialPosition: function(ms){
		this.tween({x: this.initX, y: this.initY},ms);
	},
	
	// handle fire : start or stop firing
	handleFire: function(e){
		if(!Crafty.isPaused() && this.fireKey.indexOf(e.key) != -1){
			this.isFiring = !this.isFiring;
			if(this.isFiring){
				this.startFire();
			} else this.stopFire();
		}
	},
	
	// start firing continuously
	startFire: function(){
		this.doFire();
		this.delay(this.doFire, this.fireSpeed, -1);
	},
	
	// stop continuous firing
	stopFire: function(){
		this.cancelDelay(this.doFire);
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
				} else {
					Crafty.e('Projectile').setProperties(projectile).create();
				}
			}
		}
	},
	
	// get hit : called when the player collides with
	// an entity having a component listed in this.checkHits() 
	getHit: function(hitDatas){
		// get the colliding entity and act accordingly
		var hitData = hitDatas[0];
		var hittingEntity = hitData.obj;
		if(hittingEntity.has('EnemyProjectile')){
			if(this.isInvincible){
				return;
			} else {
				hittingEntity.destroy();
				this.getKilled();
				return;
			}
		}
		if(hittingEntity.has('Enemy') || hittingEntity.has('Asteroid') || hittingEntity.has('Electricity')){
			if(this.isInvincible){
				return;
			} else {
				this.getKilled();
				return;
			}
		}
		if(hittingEntity.has('BonusDrop')){ 
			this.setBonus(hittingEntity.getType());
			hittingEntity.destroy();
			return;
		}
	},
	
	// grant bonus to player
	// called when player gets hit by a bonusDrop
	setBonus: function(bonusType){
		// bonus animation
		this.animate('bonusAnimation');
		// the granted bonus is different depending on the bonusType
		if(bonusType == 'upgradeProjectileBonus'){
			// upgradeProjectileBonus : add a new projectile
			this.currentProjectilePropertiesIndex++;
			this.projectiles.push(this.projectileProperties[this.currentProjectilePropertiesIndex]);
			// special behaviour for projectile 3
			if(this.currentProjectilePropertiesIndex == 2){
				this.projectiles.push(Crafty.clone(this.projectileProperties[this.currentProjectilePropertiesIndex]));
				this.projectiles[2].xSpeed = 1;
				this.projectiles[3].xSpeed = -1;
			}
			// special behaviour for projectile 6
			if(this.currentProjectilePropertiesIndex == 5){
				this.projectiles.push(Crafty.clone(this.projectileProperties[this.currentProjectilePropertiesIndex]));
				this.projectiles.push(Crafty.clone(this.projectileProperties[this.currentProjectilePropertiesIndex]));
				this.projectiles.push(Crafty.clone(this.projectileProperties[this.currentProjectilePropertiesIndex]));
				this.projectiles.push(Crafty.clone(this.projectileProperties[this.currentProjectilePropertiesIndex]));
				this.projectiles[6].xSpeed = -2;
				this.projectiles[7].xSpeed = -1;
				this.projectiles[8].xSpeed = 0;
				this.projectiles[9].xSpeed = 1;
				this.projectiles[10].xSpeed = 2;
			}
			// fire speed reduction
			this.fireSpeed += 35;
		} else if(bonusType == 'speedUpBonus'){
			// speedUpBonus : fire and movement speed increase
			this.movementSpeed += 15;
			this.speed({x: this.movementSpeed, y: this.movementSpeed});
			this.fireSpeed -= 50;
		}
		// take into account the fireSpeed modification if already firing
		if(this.isFiring){
			this.cancelDelay(this.doFire);
			this.startFire();
		}
	},
	
	// kill the player
	getKilled: function(){
		this.isKilled = true;
		Player.deathCount++;
		this.unbind('HitOn');
		// disable moving
		this.disableControl();
		this.resetMotion();
		// explosion animation
		this.animate('explosionAnimation');
		// when the animation is done
		this.delay(function(){ 
			// save the player properties
			var playerProperties = {
				movementSpeed: this.movementSpeed,
				fireSpeed: this.fireSpeed,
				isFiring: this.isFiring,
				projectiles: this.projectiles,
				currentProjectilePropertiesIndex: this.currentProjectilePropertiesIndex
			};
			// create a new Player with the saved properties
			Crafty.e('Delay').delay(function(){ 
				Crafty.e('Player').revive(playerProperties);
			},this.reviveTime);
			// destroy the killed player
			this.destroy();
		},this.explosionAnimTime);
	},
	
	// revive the killed player
	revive: function(properties){
		// recover the saved properties
		this.movementSpeed = properties.movementSpeed;
		this.fireSpeed = properties.fireSpeed;
		this.projectiles = properties.projectiles;
		this.currentProjectilePropertiesIndex = properties.currentProjectilePropertiesIndex;
		this.isFiring = properties.isFiring;
		// restart shooting
		if(this.isFiring) this.startFire();
		// reset player speed
		this.speed({x: this.movementSpeed, y: this.movementSpeed});
		// make the player invincible for a moment
		this.isInvincible = true;
		// make the player blink while invincible
		this.alpha = 0.8;
		this.delay(function(){
			if(this.alpha != 1){
				if(this.alpha == 0.8){
					this.alpha = 0.6;
				} else this.alpha = 0.8;
			}
		},this.reviveInvicibleTime/16, 15);
		// when it's done, remove invincibility
		this.delay(function(){
			this.alpha = 1;
			this.isInvincible = false;
		},this.reviveInvicibleTime);
	},
	
	// set end level state for player
	// called at the end of each level
	setEndLevelState: function(){
		this.disableControl();
		this.stopFire();
		this.resetMotion();
		this.unbind('KeyDown');
	},
	
	// set start level state for player
	// called at the beginning of each level
	setStartLevelState: function(){
		this.enableControl();
		this.bind('KeyDown', this.handleFire);
		this.isInvincible = false;
	}
	
});