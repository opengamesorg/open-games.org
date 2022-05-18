/***********************************************
trap.js : Trap component
***********************************************/

// Trap component definition
Crafty.c('Trap', {
	
	// required components automatically included
	// Color is used for debugging the placement
	required: '2D, Canvas, Image, Color',

	// executed once at creation
    init: function(){
		this.projectileSpeed = 5;
    },
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the size of the entity
	size: function(w, h){
		this.w = w;
		this.h = h;
		return this;
	},
	
	// set the image of the entity
	setImage: function(image){
		this.image('assets/images/trap/'+image+'.png','repeat');
		return this;
	},
	
	// move the entity
	doMove: function(props, time){
		if(!this.has('Tween')){
			this.addComponent('Tween');
		}
		this.tween(props, time);
		return this;
	},
	
	// stop movement
	stopMoving: function(){
		this.pauseTweens();
		return this;
	},
	
	// resume movement
	resumeMoving: function(){
		this.resumeTweens();
		return this;
	},
	
	// start shooting projectiles in a direction
	// at specified rate and after waiting a few ms
	startShooting: function(direction, rate, wait){
		this.addComponent('Delay');
		// create a moving projectile
		this.shoot = function(){
			var projectile = Crafty.e('Killing, Trap').image('assets/images/trap/projectile-'+direction+'.png');
			var xSpeed = 0, ySpeed = 0, xPos = 0, yPos = 0;
			switch(direction){
				case 'top': 
					ySpeed = -this.projectileSpeed;
					xPos = this.x+3;
					yPos = this.y;
					break;
				case 'down': 
					ySpeed = this.projectileSpeed;
					xPos = this.x+3;
					yPos = this.y+16
					break;
				case 'left': 
					xSpeed = -this.projectileSpeed;
					xPos = this.x-12;
					yPos = this.y+3;
					break;
				case 'right': 
					xSpeed = this.projectileSpeed;
					xPos = this.x+16;
					yPos = this.y+3;
					break;
				default: return;
			}
			projectile.place(xPos, yPos);
			this.delay(function(){
				projectile.y += ySpeed;
				projectile.x += xSpeed;
				if(projectile.y >= Game.height || projectile.y <= 0 ||
				   projectile.x >= Game.width || projectile.x <= 0){
					projectile.destroy();
				}
			}, 10, -1);	
		};
		// shoot once at start
		// and continue shooting
		this.delay(function(){
			this.shoot();
			this.delay(function(){
				this.shoot();
			}, rate, -1);
		}, wait);
	}
	
});