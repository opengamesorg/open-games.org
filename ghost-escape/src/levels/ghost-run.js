/***********************************************
ghost-run.js : Ghost Run level
***********************************************/

// Ghost Run level
Crafty.scene('ghostRun', function() {
	
	// player
	var playerX = Game.width-100;
	var playerY = 224;
	var player = Crafty.e('Player').place(playerX, playerY);
	player.newDirection({x: -1});
	
	// player score, will be increased by the obstacles when passing by player
	player.displayScore();
	
	// enemy (just here to scare you)
	var enemy = Crafty.e('Enemy');
	var enemyX = Game.stageWidth-Game.mobileGap;
	var enemyY = Game.stageHeight/2-enemy.h/2;
	enemy.place(enemyX, enemyY).setDirection('left');
	
	// ground and obstacles properties
	var groundY = 250;
	var obstacleStartX = -50;
	var obstacleEndX = Game.width+60;
	var obstacleHigherY = 0;
	var obstacleW = 10;
	var obstacleH = [20, 40];
	var obstacleNumber = [1, 1];
	var obstacleDelay = [400, 750];
	var obstacleBaseDelay = 1250;
	var obstacleSpeed = 2000;
	
	// walls surrounding player
	// preventing him from moving
	Crafty.e('Wall').place(player.x-10, 0).size(10, Game.height).color('',0);
	Crafty.e('Wall').place(player.x+player.w, 0).size(10, Game.height).color('',0);
	
	// ground
	Crafty.e('Platform').place(0, groundY).size(Game.width, 20);
	
	// killing obstacles generation
	function obstaclesGeneration(){
		// height and number may vary
		var number = Crafty.math.randomInt(obstacleNumber[0], obstacleNumber[1]);
		var startX = obstacleStartX;
		var endX = obstacleEndX; 
		// they can be placed higher too, for player to pass under
		var higherY = 0;
		if(Crafty.math.randomInt(0, 5) == 1){
			if(obstacleHigherY != 0){
				higherY = Crafty.math.randomElementOfArray(obstacleHigherY);
			}
		}
		// obstacles creation
		for(var i = 0; i < number; i++){
			var height = Crafty.math.randomInt(obstacleH[0], obstacleH[1]);
			Crafty.e('Obstacle').setDirection('right').setIncreasePlayerScoreTrigger(10)
			.size(obstacleW, height).place(startX, groundY-height-higherY)
			.tween({x: endX, y: groundY-height-higherY}, obstacleSpeed)
			.delay(function(){ 
				this.destroy(); 
			}, obstacleSpeed);
			startX = startX-(obstacleW*2);
			endX = endX-(obstacleW*2);
		}
	}
	
	// when the level is truly started
	player.bind('StartLevel', function(){
		// obstacles generation
		this.delay(function(){
			var delay = Crafty.math.randomElementOfArray(obstacleDelay);
			this.delay(function(){
				obstaclesGeneration();
			}, delay);
		}, obstacleBaseDelay, -1);
		// game gets harder and harder
		this.delay(function(){
			obstacleNumber[1]++;
			obstacleDelay[0] -= 20;
			obstacleDelay[1] += 20;
			obstacleHigherY = [player.h+10, player.h-10];
		}, 15000, 3);
		this.delay(function(){
			obstacleSpeed -= 200;
		}, 15000, 5);
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
	Crafty.e('CustomText, HUD, StartLevelMessage').setTitle().text('GHOST&nbsp;&nbsp;&nbsp;RUN');
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
		player.setRunMode();
		player.enableControl();
		// starting message disappears
		Crafty('StartLevelMessage').each(function(){
			this.destroy();
		});
		// start the level
		Crafty.trigger('StartLevel');
	}
});