/***********************************************
ghost-jump.js : Ghost Jump level
***********************************************/

// Ghost Jump level
Crafty.scene('ghostJump', function() {
	
	// player
	var player = Crafty.e('Player');
	var playerX = Game.stageWidth/2-player.w/2;
	var playerY = Game.stageHeight-100;
	if(Game.mobile){
		playerX = Game.stageWidth/2+player.w/2;
	}
	player.place(playerX, playerY);
	
	// player score
	player.displayScore();
	
	// camera follows the player
	Crafty.viewport.follow(player, 0, 50);
	
	// enemy (just here to scare you)
	var enemy = Crafty.e('Enemy');
	var enemyX = Game.stageWidth/2-enemy.w/2;
	var enemyY = Game.stageHeight-Game.mobileGap;
	enemy.place(enemyX, enemyY).setDirection('up');
	
	// platform properties
	var platformW = 40;
	var platformH = 10;
	var platformY = Game.stageHeight-50;
	var platformX = Game.stageWidth/2-platformW/2;
	if(Game.mobile){
		platformX = Game.stageWidth/2-5;
	}
	var destroyedPlatformY = 0;
	
	// starting platform
	Crafty.e('Platform').place(platformX, platformY).size(platformW, platformH);
	
	// generating platforms
	var generation = 0;
	var platformNumber = 50;
	var deltaY = 25;
	var deltaX = 50;
	function platformsGeneration(){
		var megaJumpChance = Crafty.math.randomInt(0, 1) == 1;
		for(var i = 0; i < platformNumber; i++){
			platformY -= deltaY;
			platformX = Crafty.math.randomInt(deltaX, Game.stageWidth-platformW-deltaX);
			var platform = Crafty.e('Platform').place(platformX, platformY).size(platformW, platformH);
			if(generation > 0 && i == 0){
				if(megaJumpChance){
					platform.addComponent('MegaJump');
					platform.css({'border-top':'2px solid yellow'});
					platform.h = platform.h-2;
				}
			}
		}
		// the generated platforms are placed 
		// more and more far away from each other
		generation++;
		if(generation%3 == 0){
			if(deltaY < 40)
				deltaY += 2;
			if(deltaX > 20)
				deltaX -= 3;
		}
	}
	
	// first platform generation
	platformsGeneration();
	
	// stuff happening in real-time
	player.bind('UpdateFrame', function(eventData) {
		// the player score is calculated
		var score = Math.round(Crafty.viewport.y/(Game.mobile ? 15 : 10));
		if(score >= this.score){
			// score has to start at 0
			if(Game.mobile){
				if(score != 5){
					this.score = score;
				}
			} else if(score != 4){
				this.score = score;
			}
		}
		// when the player arrives a bit before top
		if(platformY >= (Game.mobile ? (this.y-500)/Game.mobileScale : this.y-500)){
			// the platforms are generated
			platformsGeneration();
			// the enemy shows up sometimes
			if(Crafty.math.randomInt(0, 1) == 1){
				enemy.show();
				enemy.delay(function(){
					if(player && !player.isKilled){
						enemy.hide();
					}
				},2000);
			}
		}
		// the platforms are destroyed when they get out of the frame
		Crafty('Platform').each(function(){
			var limit = player.y + 180;
			var position = this.y;
			if(limit < position){
				destroyedPlatformY = position;
				this.destroy();
			}
		});
		// the player dies when he falls out of the frame
		if(destroyedPlatformY - player.y < (Game.mobile ? -250 : -350)){
			this.delay(function(){
				enemy.show();
				this.getKilled();
			}, 250);
		}
	});
	
	// starting message : press start when ready
	// player disabled
	player.disableControl();
	var title = Crafty.e('CustomText, HUD, StartLevelMessage').setTitle().text('GHOST&nbsp;&nbsp;&nbsp;JUMP');
	var subtitle = Crafty.e('CustomText, HUD, StartLevelMessage').setSubtitle().blink();
	subtitle.bind('KeyUp', function(e) {
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
		Crafty.e('CustomTouchControl').bind('CustomTouch', function(){
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
		player.setJumpMode();
		player.enableControl();
		// starting message disappears
		Crafty('StartLevelMessage').each(function(){
			this.destroy();
		});
	}
});