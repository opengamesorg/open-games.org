/***********************************************
player.js : Player component
***********************************************/

// Player component definition
Crafty.c('Player', {
	
	// required components automatically included
	required: '2D, DOM, Color, Multiway, Delay, Collision, Renderable, Object',

	// executed once at creation
    init: function() {
		// dimension and style
		this.initW = 50;
		this.initH = 6;
		this.w = this.initW;
        this.h = this.initH;
		this.color('white');
		this.css({'borderRadius': '2px'});
		// start position
		this.initX = Game.width / 2 - this.w / 2; 
		this.initY = Game.height - 60;
		this.x = this.initX;
		this.y = this.initY;
		// movement
		this.movementSpeed = (Game.mode == 'slow' ? 240 : (Game.mode == 'fast' ? 280 : 320));
		this.multiway(this.movementSpeed, {RIGHT_ARROW: 0, LEFT_ARROW: 180});
		// action
		this.canDoAction = false;
		this.action = Player.keys.keyAction;
		// balls
		this.balls = [];
		// when player receives a bonus/malus from a drop,
		// he can change state (stickybar, smallbar...)
		// and can have multiple states at the same time
		this.states = [];
		// a state is lost after some duration
		this.stateDuration = 12000;
		// fractions
		// they determine at which angle a hitting ball will bounce off the bar 
		this.setFractions();
		// collision
		this.checkHits('EnemyLaser');
		// message container for received drop type
		this.dropMessage = Crafty.e('CustomText').setDropMessage();
		this.clearDropMessage = function(){ this.dropMessage.text(''); };
		// when the level is done
		this.levelDone = false;
		// killed
		this.isKilled = false;
    },
	
	// each event has a function bound to it
	events: {
		'Move': 'doMotion',
		'KeyDown': 'doAction',
		'HitOn': 'getHit',
	},
	
	// set the position of the entity
	place: function(x, y){
		this.x = x;
		this.y = y;
		return this;
	},
	
	// set the fractions of the player bar
	// fractions are proportional areas of the bar, based on the bar width
	// they determine at which angle a hitting ball will bounce off the bar 
	setFractions: function(){
		this.fractions = [
			this.w*0.15,	// 0-15  : far left
			this.w*0.50,	// 15-50 : left
			this.w*0.50,	// 50-50 : middle
			this.w*0.85,	// 50-85 : right
			this.w*1		// 85-1  : far right
		];
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
	},
	
	// do entity action
	doAction: function(e){
		if(!Crafty.isPaused() && this.action.indexOf(e.key) != -1){
			// stickybar handling
			for(var i = 0; i < this.balls.length; i++){
				if(this.balls[i].attached){
					this.balls[i].detachFromPlayer();
					if(this.hasState('Sticky_Bar')){
						this.stickyCount--;
						if(this.stickyCount == 0){
							this.removeState('Sticky_Bar');
						}
					}
					break;
				}
			}
		}
	},
	
	// add a ball to the balls list
	addBall: function(ball){
		this.balls.push(ball);
	},
	
	// remove a ball from the balls list
	removeBall: function(ball){
		for(var i = 0; i < this.balls.length; i++){
			if(this.balls[i][0] == ball[0]){
				this.balls.splice(i, 1);
				break;
			}
		}
		if(this.balls.length == 0){
			this.getKilled();
		}
	},
	
	// destroy all the balls
	destroyBalls: function(){
		for(var i = 0; i < this.balls.length; i++){
			this.balls[i].destroy();
		}
		this.balls = [];
	},
	
	// add a state to the player
	addState: function(state){
		this.states.push(state);
		return this;
	},
	
	// remove a state from the player
	removeState: function(state){
		this.states.splice(this.states.indexOf(state), 1)
		return this;
	},
	
	// know if the player has a specific state
	hasState: function(state){
		return this.states.indexOf(state) !== -1;
	},
	
	// add StickyBar state to the player
	addStickyBarState: function(){
		this.addState('Sticky_Bar');
		// number of actions before removing the state
		this.stickyCount = 3;
		return this;
	},
	
	// add SmallBar state to the player
	addSmallBarState: function(){
		if(this.hasState('Large_Bar')){
			this.removeState('Large_Bar');
			this.x += (this.w - this.initW)/2;
			this.w = this.initW;
		}
		this.addState('Small_Bar');
		this.w = this.w/2;
		this.x += (this.initW - this.w)/2;
		this.setFractions();
		this.rightMax = Game.width-this.w;
		this.delay(function(){
			if(this.hasState('Small_Bar')){
				this.removeState('Small_Bar');
				this.x -= (this.initW - this.w)/2;
				this.w = this.initW;
				this.setFractions();
				this.rightMax = Game.width-this.w;
			}
		},this.stateDuration);
		return this;
	},
	
	// add LargeBar state to the player
	addLargeBarState: function(){
		if(this.hasState('Small_Bar')){
			this.removeState('Small_Bar');
			this.x -= (this.initW - this.w)/2;
			this.w = this.initW;
		}
		this.addState('Large_Bar');
		this.w = this.w*1.5;
		this.x -= (this.w - this.initW)/2;
		this.setFractions();
		this.rightMax = Game.width-this.w;
		this.delay(function(){
			if(this.hasState('Large_Bar')){
				this.removeState('Large_Bar');
				this.x += (this.w - this.initW)/2;
				this.w = this.initW;
				this.setFractions();
				this.rightMax = Game.width-this.w;
			}
		},this.stateDuration);
		return this;
	},
	
	// add ReverseBar state to the player
	addReverseBarState: function(){
		this.addState('Reverse_Bar');
		this.multiway(this.movementSpeed, {LEFT_ARROW: 0, RIGHT_ARROW: 180});
		this.delay(function(){
			this.removeState('Reverse_Bar');
			this.multiway(this.movementSpeed, {RIGHT_ARROW: 0, LEFT_ARROW: 180});
		},this.stateDuration);
		return this;
	},
	
	// add LaserBar state to the player
	addLaserBarState: function(){
		this.addState('Laser_Bar');
		this.shootLasers();
		this.delay(function(){
			this.shootLasers();
		},1200, 1, function(){
			this.removeState('Laser_Bar');
		});
		return this;
	},
	
	// shoot laser projectiles from the player bar
	shootLasers: function(){
		this.delay(function(){
			if(!this.isKilled){
				var firstLaser = Crafty.e('Laser').setPlayerLaser();
				var secondLaser = Crafty.e('Laser').setPlayerLaser();
				firstLaser.place(this.x, this.y - this.h);
				secondLaser.place(this.x + this.w - secondLaser.w, this.y - this.h);
				// sound
				if(!iOS){
					Crafty.audio.play('player-shoots-lasers', 1, 0.4);
				}
			}
		}, 300, 1);
	},
	
	// display a message telling which drop the player just received
	displayDropMessage: function(message){
		this.dropMessage.text(message);
		this.cancelDelay(this.clearDropMessage);
		this.delay(this.clearDropMessage,2750);
	},
	
	// get hit by an enemy laser
	getHit: function(){
		this.getKilled();
	},
	
	// get killed
	getKilled: function(){
		if(!this.levelDone){
			this.isKilled = true;
			this.gameOver();
		}
	},
	
	// well done, next level
	nextLevel: function(){
		this.levelDone = true;
		Crafty.trigger('nextLevel');
		if(this.levelDone){
			// play music
			if(!iOS){
				Crafty.audio.stop('main');
				Crafty.audio.stop('boss');
				Crafty.audio.play('level-end');
			}
			Crafty.e("CustomText").setTitle().text("WELL&nbsp;&nbsp;DONE");
			this.delay(function(){
				var subtitle = Crafty.e('CustomText').setSubtitle();
				subtitle.text('CONTINUE').bind('KeyUp', function(e){
					if(!Crafty.isPaused()){
						if(Player.keys.keyAction.indexOf(e.key) != -1) {
							if(!Crafty('Player').lastLevel){
								var nextLevel = Game.currentLevel.substr(Game.currentLevel.indexOf('-')+1, Game.currentLevel.length);
								nextLevel = parseInt(nextLevel)+1;
								Crafty.scene('level-'+nextLevel);
							} else {
								Crafty('Player').finishGame();
							}
						}
					}
				});
				if(Game.mobile){
					// the player has to tap in the middle of the screen
					Crafty.e('CustomTouchControl').place(-35, Game.height/2-50).size(Game.width, 100).bind('TouchStart', function(){ 
						if(!Crafty.isPaused()){
							if(!Crafty('Player').lastLevel){
								var nextLevel = Game.currentLevel.substr(Game.currentLevel.indexOf('-')+1, Game.currentLevel.length);
								nextLevel = parseInt(nextLevel)+1;
								Crafty.scene('level-'+nextLevel);
							} else {
								Crafty('Player').finishGame();
								this.destroy();
							}
						}
					});
				}
			},2000);
		}
	},
	
	// game over, try again
	gameOver: function(){
		this.levelDone = true;
		// play music
		if(!iOS){
			Crafty.audio.stop('main');
			Crafty.audio.stop('boss');
			Crafty.audio.play('game-over');
		}
		Crafty.e("CustomText").setTitle().text("GAME&nbsp;&nbsp;OVER");
		this.delay(function(){
			var subtitle = Crafty.e('CustomText').setSubtitle();
			subtitle.text('TRY&nbsp;&nbsp;&nbsp;&nbsp;AGAIN')
			.bind('KeyUp', function(e){
				if(!Crafty.isPaused()){
					if(Player.keys.keyAction.indexOf(e.key) != -1) {
						Crafty.scene(Game.currentLevel);
					}
				}
			});
			if(Game.mobile){
				// if the player taps anywhere on the screen
				subtitle.bind('CustomTouch', function(){
					if(!Crafty.isPaused()){
						Crafty.scene(Game.currentLevel);
					}
				});
			}
		},2000);
		// player bar fades out
		// sound
		if(!iOS){
			Crafty.audio.play('player-gets-killed');
		}
		this.delay(function(){
			if(this.alpha-0.05 <= 0){
				this.alpha = 0;
			} else {
				this.alpha -= 0.05;
			}
		}, 8, 20, function(){
			this.removeComponent('Player');
			this.removeComponent('Object');
		});
	},
	
	// finish the game after the last level
	finishGame: function(){
		if(!iOS){
			Crafty.audio.play('main', -1, 0.65);
		}
		Crafty('CustomText').each(function(){
			this.destroy();
		});
		Crafty.e("CustomText").setTitle().text("GAME&nbsp;&nbsp;OVER");
		this.delay(function(){
			var subtitle = Crafty.e('CustomText').setSubtitle();
			subtitle.text('THANKS&nbsp;&nbsp;&nbsp;&nbsp;FOR&nbsp;&nbsp;&nbsp;&nbsp;PLAYING')
			.bind('KeyUp', function(e){
				if(!Crafty.isPaused()){
					if(Player.keys.keyAction.indexOf(e.key) != -1) {
						Crafty.scene('startMenu');
					}
				}
			});
			if(Game.mobile){
				// if the player taps anywhere on the screen
				subtitle.bind('CustomTouch', function(){
					if(!Crafty.isPaused()){
						Crafty.scene('startMenu');
					}
				});
			}
		},2000);
	},
	
	// set player behaviour for mobile version 
	// used in mobile version with touch triggers
	setMobileBehaviour: function(){
		// properties for forceMove()
		this.forceMoveDistance = (Game.mode == 'slow' ? 3.5 : (Game.mode == 'fast' ? 4.35 : 5));
		this.forceMoveSpeed = 15;
		this.leftMax = 0;
		this.rightMax = Game.width-this.w;
		// if the player taps on the left side of the screen : player moves left
		// if the player taps on the right side of the screen : player moves right
		// if the player stops tapping : player stops moving
		// if the player taps anywhere : player does action
		this.bind('CustomTouchLeft', function(){
			this.forceMove('left');
		}).bind('CustomTouchRight', function(){
			this.forceMove('right');
		}).bind('CustomTouchStop', function(){
			this.forceMove(false);
		}).bind('CustomTouch', function(){
			if(this.canDoAction){
				this.doAction({key: Player.keys.keyAction[0]});
			}
		});
	},
	
	// force player to move in a direction
	// used in mobile version with touch triggers
	forceMove: function(direction){
		this.cancelDelay(this.forceMoveFunction);
		if(!Crafty.isPaused() && direction){
			this.forceMoveFunction = function(dir = direction){
				var left = 'left';
				var right = 'right';
				if(this.hasState('Reverse_Bar')){
					left = 'right';
					right = 'left';
				}
				if(dir == left){
					if(this.x <= this.leftMax){
						this.x = this.leftMax;
					} else {
						this.x = this.x - this.forceMoveDistance;
					}
				} else if(dir == right){
					if(this.x >= this.rightMax){
						this.x = this.rightMax;
					} else {
						this.x = this.x + this.forceMoveDistance;
					}
				}
			};
			this.delay(this.forceMoveFunction, this.forceMoveSpeed, -1);
		}
		return this;
	},
	
});