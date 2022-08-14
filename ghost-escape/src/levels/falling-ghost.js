/***********************************************
falling-ghost.js : Falling Ghost level
***********************************************/

// Falling Ghost level
Crafty.scene('fallingGhost', function() {
	
	// player
	var playerX = 193;
	var playerY = 100;
	var player = Crafty.e('Player').place(playerX, playerY);
	
	// player score, will be increased by the obstacles when passing by player
	player.displayScore();
	
	// enemy (just here to scare you)
	var enemy = Crafty.e('Enemy');
	var enemyX = Game.stageWidth/2-enemy.w/2;
	var enemyY = -100+Game.mobileGap;
	enemy.place(enemyX, enemyY).setDirection('down');
	
	// walls surrounding player
	// preventing him from moving up and down
	Crafty.e('Wall').place(0, player.y-10).size(Game.width, 10).color('',0);
	Crafty.e('Wall').place(0, player.y+player.h).size(Game.width, 10).color('',0);
	
	// outer walls
	var leftWallX = 95;
	var rightWallX = Game.width-105;
	Crafty.e('Wall').place(leftWallX, 0).size(10, Game.height);
	Crafty.e('Wall').place(rightWallX, 0).size(10, Game.height);
	player.leftMax = leftWallX+10;
	player.rightMax = rightWallX-player.w;
	
	// obstacle properties
	var obstacleH = 10;
	var obstacleW = 190/3+1;
	var obstacleX = [105, 105+obstacleW, 105+(obstacleW*2)];
	var obstacleY = [Game.height+50, -50];
	var obstacleSpeed = 3000;
	var playerSpeed = player.movementSpeed;
	
	// killing obstacles generation
	function obstaclesGeneration(){
		for(var i = 0; i < 2; i++){
			var x = Crafty.math.randomElementOfArray(obstacleX);
			Crafty.e('Obstacle').setDirection('top').setIncreasePlayerScoreTrigger(5)
			.size(obstacleW, obstacleH).place(x, obstacleY[0])
			.tween({x: x, y: obstacleY[1]}, obstacleSpeed)
			.delay(function(){ 
				this.destroy(); 
			}, obstacleSpeed);
		}
	}
	
	// when the level is truly started
	player.bind('StartLevel', function(){
		// obstacles generation
		var generationDelay = this.delay(function(){
			obstaclesGeneration();
		}, 1500, -1);
		// game gets harder and harder
		this.delay(function(){
			obstacleSpeed -= 40;
			generationDelay.delaySpeed += 0.02;
			playerSpeed += 5;
			this.movementSpeed = playerSpeed;
			this.multiway(this.movementSpeed, Player.keys.multiway);
			this.forceMoveDistance += this.forceMoveDistance*0.009;
		}, 4000, 47);
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
	Crafty.e('CustomText, HUD, StartLevelMessage').setTitle().text('FALLING&nbsp;&nbsp;&nbsp;GHOST');
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
		// mobile game instructions
		Crafty.e('CustomText, HUD, StartLevelMessage').setMobileMessage().place((iOS ? 0 : 10), Game.height-100).text('MOVE&nbsp;&nbsp;&nbsp;LEFT');
		Crafty.e('2D, Image, HUD, StartLevelMessage').image('assets/images/ui/mobile-tap.png').attr({x: 28, y: Game.height-130});
		Crafty.e('CustomText, HUD, StartLevelMessage').setMobileMessage().place((iOS ? Game.width-161 : Game.width-151), Game.height-100).text('MOVE&nbsp;&nbsp;&nbsp;RIGHT');
		Crafty.e('2D, Image, HUD, StartLevelMessage').image('assets/images/ui/mobile-tap.png').attr({x: Game.width-130, y: Game.height-130});
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
		player.setFallingMode();
		player.enableControl();
		// starting message disappears
		Crafty('StartLevelMessage').each(function(){
			this.destroy();
		});
		// start the level
		Crafty.trigger('StartLevel');
	}
});