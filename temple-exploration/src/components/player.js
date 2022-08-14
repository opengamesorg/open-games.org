/***********************************************
player.js : Player component
***********************************************/

// Player component definition
Crafty.c('Player', {
	
	// required components automatically included
	required: '2D, Canvas, SpriteAnimation, SpritePlayer, Twoway, Gravity, GroundAttacher, Collision, Renderable, Delay',

	// executed once at creation
    init: function() {
		// dimensions
        this.w = 30;
        this.h = 30;
		// z index : player is above almost everything
		this.z = 10;
		// movement in two directions
		this.movementSpeed = 200; // px
		this.twoway(this.movementSpeed);
		this.direction = 'right';
		// movement animation
		// animation time in ms
		this.motionAnimationTime = 250;
		this.moveRightAnimationFrames = [[1, 0], [2, 0]];
		this.reel('moveRightAnimation', this.motionAnimationTime, this.moveRightAnimationFrames);
		this.moveLeftAnimationFrames = [[1, 1], [2, 1]];
		this.reel('moveLeftAnimation', this.motionAnimationTime, this.moveLeftAnimationFrames);
		// jump
		this.jumper(400, Player.keys.keyJump);
		// gravity : player is supported only by platforms
		this.gravity('Platform');
		this.gravityConst(1000);
		// real-time collision detection with a list of components
		// for each collision, the HitOn event is triggered
		this.checkHits('Loot, Door, Killing');
		this.isKilled = false;
		
		// fades in when created
		this.alpha = 0;
		this.delay(function(){
			if(this.alpha+0.05 >= 1){
				this.alpha = 1;
			} else {
				this.alpha += 0.05;
			}
		}, 20, 20);
		 
    },
	
	// each event has a function bound to it
	events: {
		'Move': 'doMotion',
		'NewDirection': 'doAnimation',
		'CheckLanding': 'doLanding',
		'HitOn': 'getHit'
	},
	
	// set the position of the entity
	place: function(x,y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// do entity motion
	doMotion: function(){
		// if the entity goes out of the frame, it is stopped
		if(this.x <= 16){
			this.x = 16;
		}
		if(this.x + this.w >= Game.width - 16){
			this.x = Game.width - this.w - 16;
		}
		if(this.y <= 16){
			this.y = 16;
			// bumping the ceiling
			this.antigravity();
			this.gravity();
		}
		if(this.y + this.h >= Game.height - 16){
			this.y = Game.height - this.h - 16;
		}
	},
	
	// do entity animation
	doAnimation: function(direction){
		// if not moving, reset animation
		if(!direction.x && !direction.y) {
			this.pauseAnimation();
			if(this.getReel()){
				this.resetAnimation();
			}
		} else {
			// if moving right
			if(direction.x == 1){
				this.animate('moveRightAnimation',-1);
			// if moving left
			} else if(direction.x == -1){
				this.animate('moveLeftAnimation',-1);
			}
		}
	},
	
	// do entity landing on ground
	doLanding: function(ground) {
		// forbid landing if player's feet are not above ground
		if(this.y + this.h > ground.y + this.dy) {
			this.canLand = false;
		}
		// killing ground
		if(ground.has('Killing')){
			this.getKilled();
		}
		// falling ground
		if(ground.has('Falling')){
			ground.addComponent('Gravity');
			ground.gravity('Protection');
		}
	},
	
	// get hit : called when the player collides with
	// an entity having a component listed in this.checkHits() 
	getHit: function(hitDatas){
		// get the colliding entity and act accordingly
		var hitData = hitDatas[0];
		var hittingEntity = hitData.obj;
		
		if(hittingEntity.has('Loot')){
			hittingEntity.disappear();
			hittingEntity.action();
		}
		if(hittingEntity.has('Key')){
			hittingEntity.openDoor();
		}
		if(hittingEntity.has('Door')){
			if(hittingEntity.isOpen){
				hittingEntity.nextLevel();
			}
		}
		if(hittingEntity.has('Killing')){
			this.getKilled();
		}
	},
	
	// kill the player
	getKilled: function(){
		if(!this.isKilled){
			this.isKilled = true;
			// disable moving
			this.disableControl();
			this.resetMotion();
			// fades out
			this.delay(function(){
				if(this.alpha-0.05 <= 0){
					this.alpha = 0;
				} else {
					this.alpha -= 0.05;
				}
			}, 20, 20, function(){
				this.destroy();
				// restart current room
				Crafty.scene(Game.currentRoom);
			});
		}
	}
});