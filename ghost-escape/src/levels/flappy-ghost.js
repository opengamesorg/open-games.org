/***********************************************
flappy-ghost.js : Flappy Ghost level
***********************************************/

// Flappy Ghost level
Crafty.scene('flappyGhost', function() {
	
	// player
	var playerX = 100;
	var playerY = (Game.mobile ? 203 : 193);
	var player = Crafty.e('Player').place(playerX, playerY);
	
	// player score, will be increased by the obstacles when passing by player
	player.displayScore();
	
	// walls surrounding player
	// preventing him from moving
	Crafty.e('Wall').place(player.x-10, 0).size(10, Game.height).color('',0);
	Crafty.e('Wall').place(player.x+player.w, 0).size(10, Game.height).color('',0);
	
	// enemy (just here to scare you)
	var enemy = Crafty.e('Enemy');
	var enemyX = -100+Game.mobileGap;
	var enemyY = Game.stageHeight/2-enemy.h/2;
	enemy.place(enemyX, enemyY).setDirection('right');
	
	// killing ground and ceiling
	// player dies when going out of the frame
	Crafty.e('Obstacle').size(Game.width, 10).place(0, Game.height+20);
	Crafty.e('Obstacle').size(Game.width, 10).place(0, -30);
	
	// obstacle properties
	var obstacleW = 10;
	var obstacleH = Game.height;
	var obstacleX = Game.width+50;
	var obstacleY = [-250-(Game.mobileGap), 250-(Game.mobileGap)];
	var obstacleRangeY = [-325+(Game.mobileGap), -125+(Game.mobileGap)];
	var obstacleGapY = 100;
	var obstacleSpeed = 4000;
	
	// killing obstacles generation
	function obstaclesGeneration(){
		for(var i = 0; i < 2; i++){
			Crafty.e('Obstacle').setDirection('left').setIncreasePlayerScoreTrigger(5)
			.size(obstacleW, obstacleH).place(obstacleX, obstacleY[i])
			.tween({x: -50, y: obstacleY[i]}, obstacleSpeed)
			.delay(function(){ 
				this.destroy(); 
			}, obstacleSpeed);
		}
	}
	
	// when the level is truly started
	player.bind('StartLevel', function(){
		// first jump
		this.jump();
		// continuous obstacles generation
		obstaclesGeneration();
		var generationDelay = this.delay(function(){
			obstacleY[0] = Crafty.math.randomInt(obstacleRangeY[0], obstacleRangeY[1]);
			obstacleY[1] = obstacleY[0] + obstacleH + obstacleGapY;
			obstaclesGeneration();
		}, 1500, -1);
		// game gets harder and harder
		this.delay(function(){
			obstacleSpeed -= 200;
			generationDelay.delaySpeed += 0.075;
			obstacleGapY -= 5;
		}, 20000, 4);
		// the enemy shows up sometimes
		this.delay(function(){
			if(Crafty.math.randomInt(0, 2) == 1){
				enemy.show();
				enemy.delay(function(){
					if(player && !player.isKilled){
						enemy.hide();
					}
				},2000);
			}
		}, 15000, -1);
		// the enemy shows up when player gets killed
		player.bind('PlayerGotKilled', function(){
			enemy.show();
		});
	});
	
	// starting message : press start when ready
	// player disabled
	player.disableControl();
	Crafty.e('CustomText, HUD, StartLevelMessage').setTitle().text('FLAPPY&nbsp;&nbsp;&nbsp;GHOST');
	Crafty.e('CustomText, HUD, StartLevelMessage').setSubtitle().blink().bind('KeyUp', function(e) {
		// when player hits his action key
		if(!Crafty.isPaused()){
			if(Player.keys.keyAction.indexOf(e.key) != -1) {
				// start the level
				start();
			}
		}
	});
	
	// if player is on mobile
	if(Game.mobile){
		// mobile version setup
		Game.mobileVersion();
		// if the player taps anywhere on the screen
		Crafty.e('CustomTouchControl').bind('CustomTouch', function() {
			if(!Crafty.isPaused()){
				// start the level
				start();
				this.destroy();
			}
		});
	}
	
	// start level function
	function start(){
		// player enabled
		player.setFlappyMode();
		player.enableControl();
		// starting message disappears
		Crafty('StartLevelMessage').each(function(){
			this.destroy();
		});
		// start the level
		Crafty.trigger('StartLevel');
	}
});