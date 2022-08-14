/***********************************************
electric-fence.js : ElectricFence component
***********************************************/

// ElectricFence component definition
Crafty.c('ElectricFence', {
	
	// required components automatically included
	required: '2D, Canvas, Image, Collision, Tween',

	// executed once at creation
    init: function() {
		// fence closed by default
		this.close();
		// vertical speed
		this.ySpeed = (Game.difficulty == 'standard' ? 3 : 3.5);
		// default auto moving
		this.autoMoving = true;
		// killing parts of the fence
		// modified by open and close functions
		this.firstKillingPart = Crafty.e('2D, Canvas, Electricity').attr({h: this.h/2, w: this.w, y: this.y+this.h/4});
		this.secondKillingPart = Crafty.e('2D, Canvas, Electricity').attr({h: this.h/2, w: this.w, y: this.y+this.h/4});
		this.attach(this.firstKillingPart, this.secondKillingPart);
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
	
	// do entity motion
	doMotion: function(){
		if(this.autoMoving){
			// vertical motion
			this.y += this.ySpeed;
			// if the entity goes out of the frame, it gets destroyed
			if(this.y >= Game.height){
				this.firstKillingPart.destroy();
				this.secondKillingPart.destroy();
				this.destroy();
			}
		}
	},
	
	// open just a part of the fence 
	// the other two parts are closed : they kill the player
	open: function(part){
		this.image('assets/images/electricFence/electricFence-open-'+part+'.png');
		if(this.firstKillingPart && this.secondKillingPart){ 
			if(part == 'middle'){
				this.firstKillingPart.w = this.w/3 + 20;
				this.firstKillingPart.x = this.x;
				this.secondKillingPart.w = this.w/3 + 20;
				this.secondKillingPart.x = this.w - this.secondKillingPart.w;
			}
			if(part == 'left'){
				this.firstKillingPart.w = this.w/3 + 20;
				this.firstKillingPart.x = this.w/3 - 30;
				this.secondKillingPart.w = this.w/3 + 20;
				this.secondKillingPart.x = this.w - this.secondKillingPart.w;
			}
			if(part == 'right'){
				this.firstKillingPart.w = this.w/3 + 20;
				this.firstKillingPart.x = this.x;
				this.secondKillingPart.w = this.w/3 + 20;
				this.secondKillingPart.x = this.firstKillingPart.w - 10;
			}
		}
		this.openPart = part;
		return this;
	},
	
	// close the fence entirely
	close: function(){
		this.image('assets/images/electricFence/electricFence-closed.png');
		if(this.firstKillingPart && this.secondKillingPart){
			this.firstKillingPart.w = this.w;
			this.secondKillingPart.w = this.w;
		}
		return this;
	},
	
	// open a random part of the fence 
	openRandomly: function(){
		this.addComponent('Delay');
		this.ySpeed = 1.75;
		this.delay(function(){
			var parts = ['middle','left','right'];
			if(this.openPart) parts.splice(parts.indexOf(this.openPart),1);
			var index = parseInt(Crafty.math.randomNumber(0, parts.length));
			this.open(parts[index]);
		},1500,-1);
		return this;
	}
	
});