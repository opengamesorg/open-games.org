/***********************************************
player.js : Player component
***********************************************/

// Player component definition
Crafty.c('Player', {
	
	// required components automatically included
	required: '2D, DOM, Image, Multiway, Collision, Delay, Renderable',

	// executed once at creation
    init: function() {
		this.w = 15;
        this.h = 26;
		this.z = 10;
		this.score = 0;
		this.image('assets/images/player/player-right.png');
		this.forceMoveLocked = false;
		this.forceMoveDistance = 2.25;
		this.forceMoveSpeed = 15;
		this.movementSpeed = 150;
		this.multiway(this.movementSpeed, Player.keys.multiway);
		this.canChangeDirection = true;
		this.checkHits('Killing');
		this.isKilled = false;
    },
	
	// each event has a function bound to it
	events: {
		'Move': 'doMotion',
		'NewDirection': 'newDirection',
		'HitOn': 'getHit',
		'IncreasePlayerScore': 'increaseScore',
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// do entity motion
	doMotion: function(){
		if(this.has('Collision')){
			var hitDatas, hitData;
			// can't go through a wall
			if(hitDatas = this.hit('Wall')) {
				hitData = hitDatas[0];
				// special behaviour for doors
				if(hitData.obj.has('Door')){
					hitData.obj.startExitScene();
				} else {
					this.x -= hitData.overlap * hitData.nx;
					this.y -= hitData.overlap * hitData.ny;
				}
			}
		}
	},
	
	// do entity landing on ground
	doLanding: function(ground){
		// forbid landing if player's feet are not above ground
		if(this.y + this.h > ground.y + this.dy) {
			this.canLand = false;
		}
	},
	
	// change entity direction
	newDirection: function(direction){
		if(this.canChangeDirection){
			// if moving right
			if(direction.x == 1){
				this.image('assets/images/player/player-right.png');
			// if moving left
			} else if(direction.x == -1){
				this.image('assets/images/player/player-left.png');
			}
		}
	},
	
	// get hit : called when the player collides with
	// an entity having a component listed in this.checkHits() 
	getHit: function(hitDatas){
		// get the colliding entity and act accordingly
		var hitData = hitDatas[0];
		var hittingEntity = hitData.obj;
		if(hittingEntity.has('Killing')){
			this.getKilled();
		}
	},
	
	// create dynamic score display
	displayScore: function(){
		var player = this;
		Crafty.e('CustomText, HUD').setSubtitle()
		.place(5+Game.mobileGap, 0+Game.mobileGap).textAlign('left').text(function(){ 
			return player.score;
		}).dynamicTextGeneration(true);
		return this;
	},
	
	// increase player score
	increaseScore: function(score){
		this.score += score;
	},
	
	// force player to move in a direction
	// used in mobile version with touch triggers
	forceMove: function(direction){
		if(!this.forceMoveLocked){
			this.cancelDelay(this.forceMoveFunction);
			if(direction && !Crafty.isPaused()){
				if(direction == 'left'){
					this.newDirection({x: -1});
				} else if(direction == 'right'){
					this.newDirection({x: 1});
				}
				this.forceMoveFunction = function(dir = direction){
					if(dir == 'left'){
						this.x = this.x - this.forceMoveDistance;
						if(this.leftMax){
							if(this.x <= this.leftMax){
								this.x = this.leftMax;
							}
						}
					} else if(dir == 'right'){
						this.x = this.x + this.forceMoveDistance;
						if(this.rightMax){
							if(this.x >= this.rightMax){
								this.x = this.rightMax;
							}
						}
					} if(dir == 'up'){
						this.y = this.y - this.forceMoveDistance;
					} else if(dir == 'down'){
						this.y = this.y + this.forceMoveDistance;
					}
				};
				this.delay(this.forceMoveFunction, this.forceMoveSpeed, -1);
			}
		}
		return this;
	},
	
	// force player to jump
	// used in mobile version with touch triggers
	forceJump: function(){
		if(!Crafty.isPaused()){
			this.jump();
		}
	},
	
	// set player movement for mobile version 
	// used in mobile version with touch triggers
	setMobileMovement: function(){
		// if the player taps on the left side of the screen : player moves left
		// if the player taps on the right side of the screen : player moves right
		// if the player stops tapping : player stops moving
		this.bind('CustomTouchLeft', function(){
			this.forceMove('left');
		}).bind('CustomTouchRight', function(){
			this.forceMove('right');
		}).bind('CustomTouchStop', function(){
			this.forceMove(false);
		});
	},
	
	// set player jump for mobile version 
	// used in mobile version with touch triggers
	setMobileJump: function(){
		// if the player taps anywhere on the screen : player jumps
		this.bind('CustomTouch', function(){
			this.forceJump();
		});
	},
	
	// change the player mode for Ghost Jump
	setJumpMode: function(){
		// new movement possibilities
		this.removeComponent('Multiway');
		this.addComponent('Twoway, Jumper, Gravity');
		this.twoway(this.movementSpeed);
		// movement on mobile
		if(Game.mobile){
			this.setMobileMovement();
		}
		// gravity and jump properties
		this.gravity('Platform');
		this.gravityConst(1000);
		this.jumpSpeed(450);
		// always jumping
		this.delay(function(){ 
			this.jump(); 
		},25,-1);
		// mega jump
		this.bind('CheckLanding', function(ground){
			this.doLanding(ground);
			if(ground.has('MegaJump')){
				this.jumpSpeed(1200);
				this.delay(function(){ 
					this.jumpSpeed(450);
				},100);
			}
		});
		return this;
	},
	
	// change the player mode for Ghost Run
	setRunMode: function(){
		// new movement possibilities
		this.removeComponent('Multiway');
		this.addComponent('Twoway, Jumper, Gravity');
		this.twoway(this.movementSpeed);
		this.canChangeDirection = false;
		// gravity and jump properties
		this.gravity('Platform');
		this.gravityConst(1750);
		this.jumpSpeed(525);
		this.bind('KeyDown', function(e) {
			if(!Crafty.isPaused()){
				if(Player.keys.keyAction.indexOf(e.key) != -1) {
					this.jump();
				}
			}
		});
		// jumping on mobile
		if(Game.mobile){
			this.setMobileJump();
		}
		return this;
	},
	
	// change the player mode for Flappy Ghost
	setFlappyMode: function(){
		// new movement possibilities
		this.removeComponent('Multiway');
		this.addComponent('Twoway, Jumper, Gravity');
		this.twoway(this.movementSpeed);
		this.canChangeDirection = false;
		// gravity and jump properties
		this.gravity('Platform');
		this.gravityConst(900);
		this.jumpSpeed(300);
		this.bind('KeyDown', function(e) {
			if(!Crafty.isPaused()){
				if(Player.keys.keyAction.indexOf(e.key) != -1) {
					this.jump();
				}
			}
		});
		// can jump even if no ground
		this.bind('CheckJumping', function(ground) {
			this.canJump = true;
		});
		// jumping on mobile
		if(Game.mobile){
			this.setMobileJump();
		}
		return this;
	},
	
	// change the player mode for Falling Ghost
	setFallingMode: function(){
		// new movement possibilities
		this.movementSpeed = 150;
		this.multiway(this.movementSpeed, Player.keys.multiway);
		// movement on mobile
		if(Game.mobile){
			this.setMobileMovement();
		}
		return this;
	},
	
	// kill the player
	getKilled: function(){
		if(!this.isKilled){
			this.isKilled = true;
			Crafty.trigger('PlayerGotKilled');
			// fade out
			this.delay(function(){
				if(this.alpha-0.05 <= 0){
					this.alpha = 0;
				} else {
					this.alpha -= 0.05;
				}
			}, 20, 20, function(){
				// destroy player
				var score = this.score;
				this.destroy();
				Crafty.e('Delay').delay(function(){
					// destroy all HUD entities
					Crafty('HUD').each(function(){
						if(!this.has('Enemy')){
							this.destroy();
						}
					});
					// game over message
					Crafty.e('CustomText, HUD').setTitle().text('YOU&nbsp;&nbsp;&nbsp;&nbsp;DIED');
					Crafty.e('CustomText, HUD').setSubtitle().text('SCORE&nbsp;&nbsp;=&nbsp;&nbsp;'+score);
					this.delay(function(){
						var subTitle = Crafty.e('CustomText, HUD').setSubtitle()
						.place(0+Game.mobileGap, (Game.mobile ? 245 : 250)+Game.mobileGap).blink();
						// if the player presses his action key
						subTitle.bind('KeyUp', function(e) {
							if(!Crafty.isPaused()){
								if(Player.keys.keyAction.indexOf(e.key) != -1) {
									// the level choosing is launched
									Crafty.scene('levelChoosing');
								}
							}
						});
						if(Game.mobile){
							// if the player taps anywhere on the screen
							subTitle.bind('CustomTouch', function() {
								if(!Crafty.isPaused()){
									// the level choosing is launched, destroying the menu scene
									Crafty.scene('levelChoosing');
								}
							});
						}
					},1000);
				},500);
			});
		}
	}
	
});