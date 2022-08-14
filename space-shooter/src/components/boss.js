/***********************************************
boss.js : Boss component
***********************************************/

// Boss component definition
Crafty.c('Boss', {
	
	// required components automatically included
	required: 'Enemy',
	
	// boss has different activity than enemy
	doBossActivity: function(startMs){
		this.delay(function(){
			var startX = this.x;
			var startY = this.y;
			// handle each projectile separately
			for(var j = 0; j < this.projectiles.length; j++){
				this.doBossHandleFire(this.projectiles[j]);
			}
			// move randomly within a radius
			this.moveRandomly(startX, startY);
			this.delay(function(){
				this.moveRandomly(startX, startY);
			}, this.msMovementSpeed, -1);		
			
		}, startMs);
		return this;
	},
	
	// fire one projectile type continuously
	doBossHandleFire: function(projectile){
		this.doBossFire(projectile);
		this.delay(function(){
			this.doBossFire(projectile);
		}, projectile.msFireSpeed, -1);
	},
	
	// do fire : create the projectiles stored in this.projectiles
	// a projectile can be 'multi' : several same projectiles fired at once
	// a boss projectile can be enabled/disabled
	doBossFire: function(projectile){
		if(!this.isKilled && !this.stopFire && projectile.enabled){
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
	},
	
	// set properties for boss one
	setBossOne: function(){
		this.bossNumber = 1;
		this.addComponent('SpriteBoss1');
		// position of his jewel, from the center of his sprite
		this.jewelX = 0;
		this.jewelY = -8;
		// common properties
		this.life = (this.isStandard ? 5250 : 5750);
		this.msMovementSpeed = 1750;
		this.movementRange = 30;
		// no need for msFireSpeed : each boss projectile has its own msFireSpeed
		// handicap : if game difficulty is standard, boss fires slowly
		this.msFireSpeedHandicap = (this.isStandard ? 1000 : 0);
		// set the collision hitbox for the entity
		// add WiredHitBox component to see the hitbox
		this.collision([0, 35, 0, 65, 65, 100, 85, 100, 150, 65, 150, 35]);
		// explosion animation : when the boss dies
		// animation time in ms
		this.explosionAnimTime = 4000;
		// positions of the explosion frames in the boss sprite		
		this.explosionFrames = [
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]
		];
		this.reel('explosionAnimation', this.explosionAnimTime, this.explosionFrames);
		
		// boss projectiles
		// start with only the enabled
		// projectiles will be enabled/disabled during the level
		this.projectiles.push({
			w: 8, h: 8, x: 57, y: 95, type: 'enemyProjectile-2', enabled: true, xSpeed: 0, ySpeed: 2, msFireSpeed: 1750 + this.msFireSpeedHandicap,
			isMulti: true, multi: { number: 2, spaceX: 28, spaceY: 0 }
		},{
			w: 8, h: 8, x: 2, y: 70, type: 'enemyProjectile-2', enabled: true, xSpeed: 0, ySpeed: 2, msFireSpeed: 2500 + this.msFireSpeedHandicap,
			isMulti: true, multi: { number: 2, spaceX: 138, spaceY: 0 }
		},{
			w: 14, h: 14, x: 38, y: 78, type: 'enemyProjectile-3', enabled: false, xSpeed: 0, ySpeed: 1.5, msFireSpeed: 3000 + this.msFireSpeedHandicap,
			isMulti: true, multi: { number: 2, spaceX: 60, spaceY: 0 }
		},{
			w: 4, h: 8, x: 61, y: 75, type: 'enemyProjectile-1', enabled: false, xSpeed: 1, ySpeed: 3, msFireSpeed: 1750 + (this.msFireSpeedHandicap * 1.5),
			isMulti: true, multi: { number: 3, spaceX: 12, spaceY: 0 }
		},{
			w: 4, h: 8, x: 61, y: 75, type: 'enemyProjectile-1', enabled: false, xSpeed: -1, ySpeed: 3, msFireSpeed: 1750 + (this.msFireSpeedHandicap * 1.5),
			isMulti: true, multi: { number: 3, spaceX: 12, spaceY: 0 }
		});
		
		// common projectile properties
		for(var i = 0; i < this.projectiles.length; i++){
			this.projectiles[i].parentX = this.x;
			this.projectiles[i].parentY = this.y;
			this.projectiles[i].parentW = this.w;
			this.projectiles[i].parentH = this.h;
			this.projectiles[i].components = ['EnemyProjectile'];
			this.projectiles[i].direction = 'bottom';
		}
		
		return this;
	},
	
	// set properties for boss two
	setBossTwo: function(){
		this.bossNumber = 2;
		this.addComponent('SpriteBoss2');
		// can't be hit by Asteroids
		this.ignoreHits('Asteroid');
		// position of his jewel, from the center of his sprite
		this.jewelX = 0;
		this.jewelY = -8;
		// common properties
		this.life = (this.isStandard ? 20000 : 22000);
		this.msMovementSpeed = 2500;
		this.movementRange = 25;
		// no need for msFireSpeed : each boss projectile has its own msFireSpeed
		// handicap : if game difficulty is standard, boss fires slowly
		this.msFireSpeedHandicap = (this.isStandard ? 1000 : 0);
		// set the collision hitbox for the entity
		// add WiredHitBox component to see the hitbox
		this.collision([0, 35, 0, 80, 90, 100, 110, 100, 200, 80, 200, 35]);
		// explosion animation : when the boss dies
		// animation time in ms
		this.explosionAnimTime = 4000;	
		// positions of the explosion frames in the boss sprite		
		this.explosionFrames = [
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]
		];
		this.reel('explosionAnimation', this.explosionAnimTime, this.explosionFrames);
		
		// boss projectiles
		// start with only the enabled
		// projectiles will be enabled/disabled during the level
		this.projectiles.push({
			w: 8, h: 8, x: 81, y: 95, type: 'enemyProjectile-6', enabled: true, xSpeed: 0, ySpeed: 2, msFireSpeed: 3000 + (this.msFireSpeedHandicap * 1.25),
			isMulti: true, multi: { number: 2, spaceX: 28, spaceY: 0 }
		},{
			w: 8, h: 8, x: 35, y: 70, type: 'enemyProjectile-6', enabled: true, xSpeed: 0, ySpeed: 2, msFireSpeed: 2250 + (this.msFireSpeedHandicap * 1.25),
			isMulti: true, multi: { number: 2, spaceX: 122, spaceY: 0 }
		},{
			w: 14, h: 14, x: 62, y: 78, type: 'enemyProjectile-7', enabled: true, xSpeed: 0, ySpeed: 1.5, msFireSpeed: 4750 + (this.msFireSpeedHandicap * 1.25),
			isMulti: true, multi: { number: 2, spaceX: 60, spaceY: 0 }
		},{
			w: 14, h: 14, x: 0, y: 78, type: 'enemyProjectile-7', enabled: true, xSpeed: 0, ySpeed: 1, msFireSpeed: 3500 + (this.msFireSpeedHandicap * 1.25),
			isMulti: true, multi: { number: 2, spaceX: 186, spaceY: 0 }
		},{
			w: 4, h: 8, x: 85, y: 75, type: 'enemyProjectile-4', enabled: true, xSpeed: 1, ySpeed: 3, msFireSpeed: 2000 + (this.msFireSpeedHandicap * 1),
			isMulti: true, multi: { number: 3, spaceX: 12, spaceY: 0 }
		},{
			w: 4, h: 8, x: 85, y: 75, type: 'enemyProjectile-4', enabled: true, xSpeed: -1, ySpeed: 3, msFireSpeed: 2000 + (this.msFireSpeedHandicap * 1),
			isMulti: true, multi: { number: 3, spaceX: 12, spaceY: 0 }
		},{
			w: 14, h: 14, x: 0, y: 78, type: 'enemyProjectile-7', enabled: false, xSpeed: 0, ySpeed: 2, msFireSpeed: 750 + (this.msFireSpeedHandicap / 4),
			isMulti: true, multi: { number: 2, spaceX: 186, spaceY: 0 }
		},{
			w: 14, h: 14, x: 62, y: 78, type: 'enemyProjectile-7', enabled: false, xSpeed: 0, ySpeed: 2, msFireSpeed: 750 + (this.msFireSpeedHandicap / 4),
			isMulti: true, multi: { number: 2, spaceX: 60, spaceY: 0 }
		},{
			w: 4, h: 8, x: 45, y: 40, type: 'enemyProjectile-4', enabled: false, xSpeed: 0, ySpeed: 3, msFireSpeed: 150 + (this.msFireSpeedHandicap / 20),
			isMulti: true, multi: { number: 3, spaceX: 9, spaceY: 0 }
		},{
			w: 4, h: 8, x: 133, y: 40, type: 'enemyProjectile-4', enabled: false, xSpeed: 0, ySpeed: 3, msFireSpeed: 150 + (this.msFireSpeedHandicap / 20),
			isMulti: true, multi: { number: 3, spaceX: 9, spaceY: 0 }
		},{
			w: 4, h: 8, x: 45, y: 40, type: 'enemyProjectile-4', enabled: false, xSpeed: 1, ySpeed: 3, msFireSpeed: 150 + (this.msFireSpeedHandicap / 20),
			isMulti: true, multi: { number: 3, spaceX: 9, spaceY: 0 }
		},{
			w: 4, h: 8, x: 133, y: 40, type: 'enemyProjectile-4', enabled: false, xSpeed: 1, ySpeed: 3, msFireSpeed: 150 + (this.msFireSpeedHandicap / 20),
			isMulti: true, multi: { number: 3, spaceX: 9, spaceY: 0 }
		},{
			w: 4, h: 8, x: 45, y: 40, type: 'enemyProjectile-4', enabled: false, xSpeed: -1, ySpeed: 3, msFireSpeed: 150 + (this.msFireSpeedHandicap / 20),
			isMulti: true, multi: { number: 3, spaceX: 9, spaceY: 0 }
		},{
			w: 4, h: 8, x: 133, y: 40, type: 'enemyProjectile-4', enabled: false, xSpeed: -1, ySpeed: 3, msFireSpeed: 150 + (this.msFireSpeedHandicap / 20),
			isMulti: true, multi: { number: 3, spaceX: 9, spaceY: 0 }
		});
		
		// common projectile properties
		for(var i = 0; i < this.projectiles.length; i++){
			this.projectiles[i].parentX = this.x;
			this.projectiles[i].parentY = this.y;
			this.projectiles[i].parentW = this.w;
			this.projectiles[i].parentH = this.h;
			this.projectiles[i].components = ['EnemyProjectile'];
			this.projectiles[i].direction = 'bottom';
		}
		
		return this;
	},
	
	// set properties for boss three
	setBossThree: function(){
		this.bossNumber = 3;
		this.addComponent('Boss, SpriteBoss3');
		// common properties
		this.life = (this.isStandard ? 90000 : 100000);
		this.msMovementSpeed = 2750;
		this.movementRange = 15;
		// this.movementRange = 15;
		// no need for msFireSpeed : each boss projectile has its own msFireSpeed
		// handicap : if game difficulty is standard, boss fires slowly
		this.msFireSpeedHandicap = (this.isStandard ? 1000 : 0);
		// set the collision hitbox for the entity
		// add WiredHitBox component to see the hitbox
		this.collision([0, 0, 0, 75, 130, 115, 170, 115, 300, 75, 300, 0]);
		// explosion animation : when the boss dies
		// animation time in ms
		this.explosionAnimTime = 4000;	
		// positions of the explosion frames in the boss sprite		
		this.explosionFrames = [
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
			[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
			[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3]
		];
		this.reel('explosionAnimation', this.explosionAnimTime, this.explosionFrames);
		// boss projectiles
		// projectiles will be enabled/disabled during the level
		this.projectiles.push(
		
			// index 0 : double small
			{ w: 4, h: 8, x: 134, y: 125, type: 'enemyProjectile-8', xSpeed: 0, ySpeed: 3, msFireSpeed: 1500 + (this.msFireSpeedHandicap / 2), 
			isMulti: true, multi: { number: 2, spaceX: 28, spaceY: 0 }},
			// index 1 : double medium
			{ w: 8, h: 8, x: 87, y: 95, type: 'enemyProjectile-9', xSpeed: 0, ySpeed: 2, msFireSpeed: 2250 + (this.msFireSpeedHandicap / 2), 
			isMulti: true, multi: { number: 2, spaceX: 118, spaceY: 0 }},
			
			// index 2 : single big outer left
			{ w: 14, h: 14, x: 7, y: 75, type: 'enemyProjectile-10', xSpeed: -0.15, ySpeed: 1.5, msFireSpeed: 400 + (this.msFireSpeedHandicap / 20), isMulti: false },
			// index 3 : single big outer right
			{ w: 14, h: 14, x: 279, y: 75, type: 'enemyProjectile-10', xSpeed: 0.15, ySpeed: 1.5, msFireSpeed: 400 + (this.msFireSpeedHandicap / 20), isMulti: false },
			// index 4 : double big inner
			{ w: 14, h: 14, x: 39, y: 80, type: 'enemyProjectile-10', xSpeed: 0, ySpeed: 1.75, msFireSpeed: 4000 + (this.msFireSpeedHandicap / 1), 
			isMulti: true, multi: { number: 2, spaceX: 208, spaceY: 0 }},
			// index 5 : single big middle
			{ w: 14, h: 14, x: 143, y: 77, type: 'enemyProjectile-10', xSpeed: 0, ySpeed: 0.5, msFireSpeed: 500 + (this.msFireSpeedHandicap / 20), isMulti: false },
			
			// index 6,7,8 : triple medium left
			{ w: 8, h: 8, x: 102, y: 38, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 2, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 102, y: 38, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 102, y: 38, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: -2, ySpeed: 4, isMulti: false },
			// index 9,10,11 : triple medium right
			{ w: 8, h: 8, x: 190, y: 38, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 2, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 190, y: 38, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 190, y: 38, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: -2, ySpeed: 4, isMulti: false },
			// index 12,13,14 : triple medium middle
			{ w: 8, h: 8, x: 145, y: 95, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 2, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 145, y: 95, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 145, y: 95, type: 'enemyProjectile-9', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: -2, ySpeed: 4, isMulti: false },
			
			// index 15,16,17 : faster triple medium left
			{ w: 8, h: 8, x: 102, y: 38, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: 2, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 102, y: 38, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: 0, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 102, y: 38, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: -2, ySpeed: 4, isMulti: false },
			// index 18,19,20 : faster triple medium right
			{ w: 8, h: 8, x: 190, y: 38, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: 2, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 190, y: 38, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: 0, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 190, y: 38, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: -2, ySpeed: 4, isMulti: false },
			// index 21,22,23 : faster triple medium middle
			{ w: 8, h: 8, x: 145, y: 95, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: 2, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 145, y: 95, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: 0, ySpeed: 4, isMulti: false },
			{ w: 8, h: 8, x: 145, y: 95, type: 'enemyProjectile-9', msFireSpeed: 150 + (this.msFireSpeedHandicap / 20), xSpeed: -2, ySpeed: 4, isMulti: false },
			
			// index 24 : another triple left
			{ w: 4, h: 8, x: 94, y: 38, type: 'enemyProjectile-8', msFireSpeed: 5000 + (this.msFireSpeedHandicap / 1), xSpeed: -0.5, ySpeed: 3, 
			isMulti: true, multi: { number: 3, spaceX: 10, spaceY: 0 }},
			// index 25 : another triple right
			{ w: 4, h: 8, x: 182, y: 38, type: 'enemyProjectile-8', msFireSpeed: 5000 + (this.msFireSpeedHandicap / 1), xSpeed: 0.5, ySpeed: 3,
			isMulti: true, multi: { number: 3, spaceX: 10, spaceY: 0 }},
			
			// index 26 : another triple left
			{ w: 4, h: 8, x: 94, y: 38, type: 'enemyProjectile-8', msFireSpeed: 200 + (this.msFireSpeedHandicap / 20), xSpeed: -0.5, ySpeed: 3, 
			isMulti: true, multi: { number: 3, spaceX: 10, spaceY: 0 }},
			// index 27 : another triple right
			{ w: 4, h: 8, x: 182, y: 38, type: 'enemyProjectile-8', msFireSpeed: 200 + (this.msFireSpeedHandicap / 20), xSpeed: 0.5, ySpeed: 3, 
			isMulti: true, multi: { number: 3, spaceX: 10, spaceY: 0 }},
			
			// index 28,..,46 : single small from the middle row
			{ w: 4, h: 8, x: 57, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 67, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 77, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 87, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 97, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 107, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 117, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 127, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 137, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 147, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 157, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 167, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 177, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 187, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 197, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 207, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 217, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 227, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false },
			{ w: 4, h: 8, x: 237, y: 58, type: 'enemyProjectile-8', msFireSpeed: 2000 + (this.msFireSpeedHandicap / 2), xSpeed: 0, ySpeed: 3, isMulti: false }
		);
		
		// common projectile properties
		for(var i = 0; i < this.projectiles.length; i++){
			this.projectiles[i].parentX = this.x;
			this.projectiles[i].parentY = this.y;
			this.projectiles[i].parentW = this.w;
			this.projectiles[i].parentH = this.h;
			this.projectiles[i].components = ['EnemyProjectile'];
			this.projectiles[i].direction = 'bottom';
			this.projectiles[i].enabled = false;
		}
		
		return this;
	}
	
});