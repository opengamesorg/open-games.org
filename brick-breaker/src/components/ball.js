/***********************************************
ball.js : Ball component
***********************************************/

// Ball component definition
Crafty.c('Ball', {
	
	// required components automatically included
	required: '2D, DOM, Color, Collision, Delay',

	// executed once at creation
    init: function() {
		// dimension and style
		this.initW = 8;
        this.initH = 8;
		this.initColor = 'white';
		this.w = this.initW;
        this.h = this.initH;
		this.color(this.initColor);
		this.css('borderRadius', '100%');
		// link with player
		this.player = Crafty('Player');
		if(this.player.length) 
			this.player.addBall(this);
		this.attached = false;
		// motion
		this.maxSpeed = (Game.mode == 'slow' ? 3.75 : (Game.mode == 'fast' ? 4.75 : 5.75));
		this.xSpeed = 0;
		this.ySpeed = -this.maxSpeed;
		this.canGetOut = true;
		// collision
		this.checkHits('Object');
		// when player receives a bonus/malus from a drop,
		// the ball can change state (fireball, slowball...)
		// a ball can have multiple states at the same time
		this.states = [];
		// a state is lost after some duration
		this.stateDuration = 10000;
		// slowball and fastball speed coefficient
		this.slowSpeedCoeff = 0.70;
		this.fastSpeedCoeff = (Game.mode == 'slow' ? 1.30 : (Game.mode == 'fast' ? 1.25 : 1.20));
		// fireball state animation
		this.particlesOptions = {
			maxParticles: 150,
			size: 15,
			sizeRandom: 4,
			speed: 1,
			speedRandom: 1.2,
			// lifespan in frames
			lifeSpan: 29,
			lifeSpanRandom: 7,
			// angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
			angle: 0,
			angleRandom: 0,
			startColour: [255, 131, 0, 1],
			startColourRandom: [48, 50, 45, 0],
			endColour: [245, 35, 0, 0],
			endColourRandom: [60, 60, 60, 0],
			// only applies when fastMode is off, specifies how sharp the gradients are drawn
			sharpness: 20,
			sharpnessRandom: 10,
			// random spread from origin
			spread: 10,
			// how many frames should this last
			duration: -1,
			// will draw squares instead of circle gradients
			fastMode: false,
			gravity: { x: 0, y: 0 },
			// offset for the origin of the particles
			originOffset: {x: 0, y: 0}
		};
    },
	
	// each event has a function bound to it
	events: {
		'UpdateFrame': 'doMotion',
		'HitOn': 'doHit'
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// place the ball on top of the player (centered)
	// used when the ball is created
	placeOnPlayer: function(){
		this.x = this.player.x + this.player.w/2 - this.w/2;
		this.y = this.player.y - this.h;
		return this;
	},
	
	// attach the ball to the player
	// when the player moves, the ball follows
	attachToPlayer: function(){
		this.player.attach(this);
		this.player.attachedBall = true;
		this.attached = true;
		return this;
	},
	
	// detach the ball from the player
	detachFromPlayer: function(){
		this.player.detach(this);
		this.player.attachedBall = false;
		this.attached = false;
		return this;
	},
	
	// set the speed so the ball goes left up direction
	setLeftUpDirection: function(){
		this.xSpeed = -this.maxSpeed/2;
		this.ySpeed = -this.maxSpeed;
		return this;
	},
	
	// set the speed so the ball goes far left up direction
	setFarLeftUpDirection: function(){
		this.xSpeed = -this.maxSpeed;
		this.ySpeed = -this.maxSpeed/2;
		return this;
	},
	
	// set the speed so the ball goes center up direction
	setCenterUpDirection: function(){
		this.xSpeed = 0;
		this.ySpeed = -this.maxSpeed;
		return this;
	},
	
	// set the speed so the ball goes right up direction
	setRightUpDirection: function(){
		this.xSpeed = this.maxSpeed/2;
		this.ySpeed = -this.maxSpeed;
		return this;
	},
	
	// set the speed so the ball goes far right up direction
	setFarRightUpDirection: function(){
		this.xSpeed = this.maxSpeed;
		this.ySpeed = -this.maxSpeed/2;
		return this;
	},
	
	// do entity motion
	doMotion: function(){
		// the ball moves if not attached
		if(!this.attached){
			this.y += this.ySpeed;
			this.x += this.xSpeed;
		}
		// it bounces against the edges of the stage
		if(this.y >= Game.height - this.h){
			if(this.canGetOut && !this.hasState('New_Ball')){
				// destroyed if touches bottom
				this.delay(function(){
					this.removeFromStage();
				},500);
			} else {
				this.y = Game.height - this.h;
				this.bounce('vertical');
				// sound
				if(!iOS){
					Crafty.audio.play('ball-hits-player');
				}
			}
		}
		if(this.x <= 0){
			this.x = 0;
			this.bounce('horizontal');
			// sound
			if(!this.attached){
				if(!iOS){
					Crafty.audio.play('ball-hits-player');
				}
			}
		}
		if(this.x + this.w >= Game.width){
			this.x = Game.width - this.w;
			this.bounce('horizontal');
			// sound
			if(!this.attached){
				if(!iOS){
					Crafty.audio.play('ball-hits-player');
				}
			}
		}
		if(this.y <= 0){
			this.y = 0;
			this.bounce('vertical');
			// sound
			if(!iOS){
				Crafty.audio.play('ball-hits-player');
			}
		}
	},
	
	// what to do when the ball collides with an Object 
	doHit: function(hitDatas){
		for(var i = 0; i < hitDatas.length; i++){
			// get the colliding entity and act accordingly
			var hitData = hitDatas[i];
			var hittingEntity = hitData.obj;
			if(hittingEntity.has('Player')){
				this.hitPlayer();
			}
			if(hittingEntity.has('Brick') || hittingEntity.has('Enemy')){
				this.hitObject(hittingEntity, hitData.nx, hitData.ny);
			}
		}
	},
	
	// specific behaviour when the ball hits the player
	hitPlayer: function(){
		// sound
		if(!iOS){
			Crafty.audio.play('ball-hits-player');
		}
		// always bounce vertically
		this.bounce('vertical');
		// calculate the delta between player.x and collision point 
		var delta = this.x + this.w/2 - this.player.x;
		// according to this delta, we can determinate at which position on the player bar
		// the collision did occur, thus bounce the ball towards a specific direction
		if(delta <= this.player.fractions[0]){
			this.setFarLeftUpDirection();
		} else if(delta <= this.player.fractions[1]){
			this.setLeftUpDirection();
		} else if(delta <= this.player.fractions[2]){
			this.setCenterUpDirection();
		} else if(delta <= this.player.fractions[3]){
			this.setRightUpDirection();
		} else if(delta <= this.player.fractions[4]){
			this.setFarRightUpDirection();
		}
		if(delta < this.player.w/2){
			this.bounce('left');
		} else this.bounce('right');
		// sticky bar : the ball direction is set but it only will be triggered
		// when player hits action key to detach the ball
		if(this.player.hasState('Sticky_Bar')){
			if(!this.player.attachedBall){
				this.attachToPlayer();
				this.y = this.player.y - this.h;
				// mobile behaviour
				if(Game.mobile){
					var subtitle = Crafty.e('CustomText').setSubtitle();
					subtitle.text("TAP&nbsp;&nbsp;&nbsp;&nbsp;HERE&nbsp;&nbsp;&nbsp;&nbsp;TO&nbsp;&nbsp;&nbsp;&nbsp;DETACH");
					subtitle.y -= 35;
					Crafty.e('Delay').delay(function(){
						subtitle.text('');
					}, 3000);
					this.player.canDoAction = false;
					Crafty.e('CustomTouchControl').place(-35, Game.height/2-50).size(Game.width, 50).bind('TouchStart', function(){
						if(!Crafty.isPaused()){
							subtitle.destroy();
							Crafty('Player').canDoAction = true;
							Crafty.trigger('CustomTouch');
							this.destroy();
						}
					});
				}
			}
		}
	},
	
	// specific behaviour when the ball hits a brick or an enemy
	hitObject: function(object, nx, ny){
		if(object.has('Brick')){
			// sound
			if(!iOS){
				Crafty.audio.play('ball-hits-brick');
			}
			if(object.has('Breakable') && this.hasState('Fire_Ball')){ 
				return;
			}
		}
		// nx and ny : from doc @Crafty Collision
		if(nx == 1){
			if(this.xSpeed >= 0){
				this.bounce('vertical');
			} else {
				this.bounce('horizontal');
			}
		}  else if(nx == -1){
			if(this.xSpeed <= 0){
				this.bounce('vertical');
			} else {
				this.bounce('horizontal');
			}
		}
		if(ny == 1){
			if(this.ySpeed >= 0){
				this.bounce('horizontal');
			} else {
				this.bounce('vertical');
			}
		} else if(ny == -1){
			if(this.ySpeed <= 0){
				this.bounce('horizontal');
			} else {
				this.bounce('vertical');
			}
		}
	},
	
	// make the ball bounce against an obstacle 
	// and move to another direction
	bounce: function(direction){
		// prevent bounce cancelling
		if(this.bouncing == direction){
			return;
		} else {
			this.bouncing = direction;
			this.delay(function(){
				this.bouncing = null;
			},10);
		}
		// prevent symetric block
		var randomCoeff = Crafty.math.randomElementOfArray([1,1.025])
		// specific direction
		if(direction == 'right'){
			this.xSpeed = Math.round(Crafty.math.abs(this.xSpeed)) * randomCoeff;
		} else if(direction == 'left'){
			this.xSpeed = -Math.round(Crafty.math.abs(this.xSpeed)) * randomCoeff;
		}
		// opposite direction
		if(direction == 'vertical'){
			this.ySpeed = -Math.round(this.ySpeed) * randomCoeff;
		} else if(direction == 'horizontal'){
			this.xSpeed = -Math.round(this.xSpeed) * randomCoeff;
		}
	},
	
	// remove the ball from the stage
	removeFromStage: function(){
		this.player.removeBall(this);
		this.destroy();
	},
	
	// add a state to the ball
	addState: function(state){
		this.states.push(state);
		return this;
	},
	
	// remove a state from the ball
	removeState: function(state){
		this.states.splice(this.states.indexOf(state), 1)
		return this;
	},
	
	// know if the ball has a specific state
	hasState: function(state){
		return this.states.indexOf(state) !== -1;
	},
	
	// add FireBall state to the ball
	addFireBallState: function(){
		this.addState('Fire_Ball');
		this.color('red');
		this.attr({w: 12, h: 12});
		if(this.particlesContainer){
			this.particlesContainer.destroy();
		}
		this.particlesContainer = Crafty.e('2D, Canvas, Particles');
		this.particlesContainer.attr({x: this.x-6, y: this.y-6, w: 32, h: 32});
		this.particlesContainer.particles(this.particlesOptions);
		this.attach(this.particlesContainer);
		this.delay(function(){
			this.removeState('Fire_Ball');
			this.color(this.initColor);
			this.attr({w: this.initW, h: this.initH});
			this.particlesContainer.destroy();
		},this.stateDuration);
		return this;
	},
	
	// add SlowBall state to the ball
	addSlowBallState: function(){
		if(this.hasState('Fast_Ball')){
			this.removeState('Fast_Ball');
			this.maxSpeed = this.maxSpeed/this.fastSpeedCoeff;
			this.xSpeed = this.xSpeed/this.fastSpeedCoeff;
			this.ySpeed = this.ySpeed/this.fastSpeedCoeff;
		}
		this.addState('Slow_Ball');
		this.maxSpeed = this.maxSpeed*this.slowSpeedCoeff;
		this.xSpeed = this.xSpeed*this.slowSpeedCoeff;
		this.ySpeed = this.ySpeed*this.slowSpeedCoeff;
		this.delay(function(){
			if(this.hasState('Slow_Ball')){
				this.removeState('Slow_Ball');
				this.maxSpeed = this.maxSpeed/this.slowSpeedCoeff;
				this.xSpeed = this.xSpeed/this.slowSpeedCoeff;
				this.ySpeed = this.ySpeed/this.slowSpeedCoeff;
			}
		},this.stateDuration);
		return this;
	},
	
	// add FastBall state to the ball
	addFastBallState: function(){
		if(this.hasState('Slow_Ball')){
			this.removeState('Slow_Ball');
			this.maxSpeed = this.maxSpeed/this.slowSpeedCoeff;
			this.xSpeed = this.xSpeed/this.slowSpeedCoeff;
			this.ySpeed = this.ySpeed/this.slowSpeedCoeff;
		}
		this.addState('Fast_Ball');
		this.maxSpeed = this.maxSpeed*this.fastSpeedCoeff;
		this.xSpeed = this.xSpeed*this.fastSpeedCoeff;
		this.ySpeed = this.ySpeed*this.fastSpeedCoeff;
		this.delay(function(){
			if(this.hasState('Fast_Ball')){
				this.removeState('Fast_Ball');
				this.maxSpeed = this.maxSpeed/this.fastSpeedCoeff;
				this.xSpeed = this.xSpeed/this.fastSpeedCoeff;
				this.ySpeed = this.ySpeed/this.fastSpeedCoeff;
			}
		},this.stateDuration);
		return this;
	},
	
	// add NewBall state to the ball
	addNewBallState: function(){
		var newBall = Crafty.e('Ball');
		newBall.addState('New_Ball');
		newBall.place(this.x, this.y);
		if(this.xSpeed < 0){
			newBall.setRightUpDirection();
		} else {
			newBall.setLeftUpDirection();
		}
		newBall.delay(function(){
			this.removeState('New_Ball');
		},100);
		return this;
	},
	
});