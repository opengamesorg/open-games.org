/***********************************************
projectile.js : Projectile component
***********************************************/

// Projectile component definition
Crafty.c('Projectile', {
	
	// required components automatically included
	required: '2D, Canvas, Image, Collision',

	// executed once at creation
    init: function() {
		this.properties = {};
    },
	
	events: {
		// continuous execution of doMotion()
		'UpdateFrame': 'doMotion'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the properties of the entity
	setProperties: function(properties){
		this.properties = properties;
		return this;
	},
	
	// create the projectile
	create: function(){
		this.image('assets/images/projectile/'+this.properties.type+'.png');
		
		for(var i = 0; i < this.properties.components.length; i++){
			this.addComponent(this.properties.components[i]);
		}
		
		this.w = this.properties.w;
		this.h = this.properties.h;
		
		if(this.properties.x == 'center'){
			this.x = this.properties.parentX + this.properties.parentW/2 - this.w/2;
		} else this.x = this.properties.parentX + this.properties.x;
		
		if(this.properties.y == 'max'){
			this.y = this.properties.parentY + this.properties.parentH;
		} else this.y = this.properties.parentY + this.properties.y;
		
		if(this.has('PlayerProjectile')){
			this.y = this.properties.parentY;
		}
	
		this.direction = this.properties.direction;
		return this;
	},
	
	// do entity motion
	doMotion: function(){
		// depending on the direction
		if(this.direction == 'top'){
			this.y -= this.properties.ySpeed;
		} else if(this.direction == 'bottom'){
			this.y += this.properties.ySpeed;
		}
		this.x += this.properties.xSpeed;
		
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
	}
	
});