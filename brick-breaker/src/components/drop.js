/***********************************************
drop.js : Drop component
***********************************************/

// Drop component definition
Crafty.c('Drop', {
	
	// required components automatically included
	required: '2D, DOM, Collision, Renderable, Delay',

	// executed once at creation
    init: function() {
		// dimension and style
		this.w = 15;
        this.h = 15;
		this.css({
			'boxShadow': 'black 0px 0px 5px 0px',
			'background': 'rgb(34,193,195)',
			'background': 'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)',
			'border': '1px solid black',
			'borderRadius': '100%'
		});
		// fade in when created
		this.alpha = 0;
		this.delay(function(){
			if(this.alpha+0.05 >= 1){
				this.alpha = 1;
			} else {
				this.alpha += 0.05;
			}
		}, 8, 20);
		// motion
		this.ySpeed = 1.5;
		// type
		this.type = null;
		// collision
		this.gotHit = false;
		this.checkHits('Player');
    },
	
	// each event has a function bound to it
	events: {
		'UpdateFrame': 'doMotion',
		'HitOn': 'getHit'
	},
	
	// set the drop type
	setType: function(type){
		this.type = type;
		return this;
	},
	
	// position in the middle of an entity
	placeOn: function(entity){
		this.x = entity.x + entity.w/2 - this.w/2;
		this.y = entity.y + entity.h/2;
		return this;
	},
	
	// do entity motion
	doMotion: function(){
		this.rotation = this.rotation + 1.5;
		this.y += this.ySpeed;
		if(this.y >= Game.height + 5){
			this.destroy();
		}
	},
	
	// what to do when a drop collides with player
	// according to the drop type
	// Fire_Ball : the balls become fireballs
	// Fast_Ball : the balls move faster
	// Slow_Ball : the balls move slower
	// New_Ball : a new ball is created
	// Sticky_Bar : the player bar becomes sticky
	// Small_Bar : the player bar becomes smaller
	// Large_Bar : the player bar becomes bigger
	// Reverse_Bar : the player controls are reversed
	// Laser_Bar : the player bar shoots laser projectiles
	getHit: function(){
		if(!this.gotHit){
			this.gotHit = true;
			var player = Crafty('Player');
			if(player.levelDone == true) return;
			
			for(var i = 0; i < player.balls.length; i++){
				if(this.type == 'Fire_Ball'){
					player.balls[i].addFireBallState();
				}
				if(this.type == 'Slow_Ball'){
					player.balls[i].addSlowBallState();
				}
				if(this.type == 'Fast_Ball'){
					player.balls[i].addFastBallState();
				}
			}
			if(this.type == 'New_Ball'){
				player.balls[player.balls.length-1].addNewBallState();
			}
			if(this.type == 'Sticky_Bar'){
				player.addStickyBarState();
			}
			if(this.type == 'Small_Bar'){
				player.addSmallBarState();
			}
			if(this.type == 'Large_Bar'){
				player.addLargeBarState();
			}
			if(this.type == 'Reverse_Bar'){
				player.addReverseBarState();
			}
			if(this.type == 'Laser_Bar'){
				player.addLaserBarState();
			}
			
			var message = this.type.replaceAll('_', '&nbsp;&nbsp;&nbsp;');
			player.displayDropMessage(message);
			// sound
			if(!iOS){
				Crafty.audio.play('drop-hits-player', 1, 0.4);
			}
			// fade out
			this.delay(function(){
				if(this.alpha-0.05 <= 0){
					this.alpha = 0;
				} else {
					this.alpha -= 0.05;
				}
			}, 8, 20, function(){
				this.destroy();
			});
		}
	},
	
});