/***********************************************
enemy-type.js : EnemyType component
***********************************************/

// EnemyType component definition
Crafty.c('EnemyType', {
	
	// executed once at creation
    init: function() {
		// enemy type
		this.type = 0;
    },
	
	// set enemy properties according to the type
	setEnemyType: function(type){
		this.type = type;
		this.addComponent('SpriteEnemy' + this.type);
		
		// set properties for enemy type 1
		if(this.type == 1){
			
			this.life = 10;
			this.msMovementSpeed = 600;
			this.movementRange = 15;
			this.msFireSpeed = 1750 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-1', xSpeed: 0, ySpeed: 2, isMulti: false 
			});
			
		}
		
		// set properties for enemy type 2
		if(this.type == 2){
			
			this.life = 10;
			this.msMovementSpeed = 400;
			this.movementRange = 25;
			this.msFireSpeed = 1250 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-1', xSpeed: 0, ySpeed: 2, isMulti: false 
			});
			
		}
		
		// set properties for enemy type 3
		if(this.type == 3){
			
			this.life = 30;
			this.msMovementSpeed = 900;
			this.movementRange = 20;
			this.msFireSpeed = 1500 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 0, y: 20, type: 'enemyProjectile-1', xSpeed: 0, ySpeed: 2, isMulti: true,
				multi: { number: 2, spaceX: 16, spaceY: 0 }
			});
			
		}
		
		// set properties for enemy type 4
		if(this.type == 4){
			
			this.life = 180;
			this.msMovementSpeed = 1500;
			this.movementRange = 30;
			this.msFireSpeed = 1000 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 8, h: 8, x: 2,y: 40, type: 'enemyProjectile-2', xSpeed: 0, ySpeed: 2, isMulti: true,
				multi: { number: 2, spaceX: 28, spaceY: 0 }
			});
			
		}
		
		// set properties for enemy type 5
		if(this.type == 5){
			
			this.life = 30;
			this.msMovementSpeed = 600;
			this.movementRange = 15;
			this.msFireSpeed = 1500 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-4', xSpeed: 0, ySpeed: 2, isMulti: false 
			});
			
		}
		
		// set properties for enemy type 6
		if(this.type == 6){
			
			this.life = 40;
			this.msMovementSpeed = 400;
			this.movementRange = 25;
			this.msFireSpeed = 1150 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-4', xSpeed: 0, ySpeed: 3, isMulti: false 
			});
			
		}
		
		// set properties for enemy type 7
		if(this.type == 7){
			
			this.life = 450;
			this.msMovementSpeed = 1000;
			this.movementRange = 50;
			this.msFireSpeed = 1250 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 6, h: 10, x: 4, y: 40, type: 'enemyProjectile-5', xSpeed: 0, ySpeed: 2.5, isMulti: true,
				multi: { number: 2, spaceX: 30, spaceY: 0 }
			});
			
		}
		
		// set properties for enemy type 8
		if(this.type == 8){
			
			this.life = 100;
			this.msMovementSpeed = 900;
			this.movementRange = 20;
			this.msFireSpeed = 1000 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 0, y: 20, type: 'enemyProjectile-4', xSpeed: 0, ySpeed: 3, isMulti: true,
				multi: { number: 2, spaceX: 16, spaceY: 0 }
			});
			
		}
		
		// set properties for enemy type 9
		if(this.type == 9){
			
			this.life = 1500;
			this.msMovementSpeed = 1250;
			this.movementRange = 30;
			this.msFireSpeed = 1500 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 8, h: 8, x: 3, y: 35, type: 'enemyProjectile-6', xSpeed: 0, ySpeed: 2, isMulti: true,
				multi: { number: 2, spaceX: 66, spaceY: 0 }
			},{
				w: 4, h: 8, x: 25, y: 45, type: 'enemyProjectile-4', xSpeed: 0, ySpeed: 3, isMulti: true,
				multi: { number: 2, spaceX: 26, spaceY: 0 }
			});
			
		}
		
		// set properties for enemy type 10
		if(this.type == 10){
			
			this.life = 80;
			this.msMovementSpeed = 600;
			this.movementRange = 15;
			this.msFireSpeed = 1500 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-8', xSpeed: 0, ySpeed: 2, isMulti: false
			});
			
		}
		
		// set properties for enemy type 11
		if(this.type == 11){
			
			this.life = 100;
			this.msMovementSpeed = 400;
			this.movementRange = 25;
			this.msFireSpeed = 1150 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 4, h: 8, x: 0, y: 20, type: 'enemyProjectile-8', xSpeed: 0, ySpeed: 2, isMulti: true,
				multi: { number: 2, spaceX: 16, spaceY: 0 }
			});
			
		}
		
		// set properties for enemy type 12
		if(this.type == 12){
			
			this.life = 900;
			this.msMovementSpeed = 1000;
			this.movementRange = 20;
			this.msFireSpeed = 1000 + this.msFireSpeedHandicap/2;
		
			this.projectiles.push({
				w: 8, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-9', xSpeed: 2, ySpeed: 4, isMulti: false
			},{
				w: 8, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-9', xSpeed: 0, ySpeed: 4, isMulti: false
			},{
				w: 8, h: 8, x: 'center', y: 'max', type: 'enemyProjectile-9', xSpeed: -2, ySpeed: 4, isMulti: false
			});
			
		}
		
		// set properties for enemy type 13
		if(this.type == 13){
			
			this.life = 7000;
			this.msMovementSpeed = 1250;
			this.movementRange = 30;
			this.msFireSpeed = 1500 + this.msFireSpeedHandicap;
			
			this.projectiles.push({
				w: 8, h: 8, x: 3, y: 35, type: 'enemyProjectile-9', xSpeed: 0, ySpeed: 2, isMulti: true,
				multi: { number: 2, spaceX: 66, spaceY: 0 }
			},{
				w: 4, h: 8, x: 25, y: 45, type: 'enemyProjectile-8', xSpeed: 0, ySpeed: 3, isMulti: true,
				multi: { number: 2, spaceX: 26, spaceY: 0 }
			},{
				w: 4, h: 8, x: 25, y: 35, type: 'enemyProjectile-8', xSpeed: 1, ySpeed: 3, isMulti: true,
				multi: { number: 3, spaceX: 12, spaceY: 0 }
			},{
				w: 4, h: 8, x: 25, y: 35, type: 'enemyProjectile-8', xSpeed: -1, ySpeed: 3, isMulti: true,
				multi: { number: 3, spaceX: 12, spaceY: 0 }
			});
			
		}
		
		// common enemy projectile properties
		for(var i = 0; i < this.projectiles.length; i++){
			this.projectiles[i].parentX = this.x;
			this.projectiles[i].parentY = this.y;
			this.projectiles[i].parentW = this.w;
			this.projectiles[i].parentH = this.h;
			this.projectiles[i].components = ['EnemyProjectile'];
			this.projectiles[i].direction = 'bottom';
		}
		
		return this;
	}
		
});