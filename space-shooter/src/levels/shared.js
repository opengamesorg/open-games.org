/***********************************************
shared.js : shared functions used by levels
***********************************************/

// create an enemy wave
var enemyWave = function (handler, properties) { 
	// if any bonus drop
	if(properties.setDrop){
		// will be dropped by a single random enemy in the wave
		var enemyIndex = 0;
		var bonusDropIndex = Crafty.math.randomInt(enemyIndex, properties.enemyNumber-1);
	}
	// create each enemy at wave speed
	handler.delay(function(){
		// distantiate each enemy with a gap
		properties.xTo += properties.xGap; 
		// special vertical distantiation
		if(properties.ySpecialGap){
			if(properties.enemyNumber%2 == 0) {
				properties.yTo -= properties.yGap;
			} else {
				properties.yTo += properties.yGap;
			}
		} else {
			// normal vertical distantiation
			properties.yTo += properties.yGap;
		}
		// enemmy creation
		var enemy = Crafty.e("Enemy");
		// set enemy type
		enemy.setEnemyType(properties.enemyType);
		// set bonus drop randomly
		if(properties.setDrop){
			if(enemyIndex++ == bonusDropIndex){ 
				enemy.setDrop(properties.setDrop);
			}
		}
		// enemy start position, destination and activity
		enemy.place(properties.xFrom,properties.yFrom)
		.tween({x: properties.xTo, y: properties.yTo}, properties.tweenSpeed)
		.doActivity(properties.activitySpeed);
	}, properties.waveSpeed, --properties.enemyNumber, function(){
		// at then end of the wave, optionally change level step
		if(properties.changeStep){
			Crafty.trigger("changeStep");
		}
	});
};

// create an asteroid wave
var asteroidWave = function (handler, origin, number, ms){
	// blinking warning message
	Crafty.e("CustomText").setWarning().setType(origin).text("WARNING");
	// start wave when warning message is over
	handler.delay(function(){ 
		// min and max start position
		var xMax = Game.width-30; var xMin = 0;
		var yMax = -30; var yMin = -100;
		// number of asteroids for the wave, bigger in hardcore difficulty
		var asteroidNumber = (Game.difficulty == "hardcore" ? number+10 : number); --asteroidNumber;
		// create each asteroid at wave speed
		handler.delay(function(){ 
			// random start position
			var x = Crafty.math.randomInt(xMin, xMax);
			var y = Crafty.math.randomInt(yMin, yMax);
			// create asteroid
			var asteroid = Crafty.e("Asteroid").place(x,y);
			// optional diagonal direction
			if(origin == "TopRight"){
				asteroid.attr({xSpeed: -1});
			} else if(origin == "TopLeft"){
				asteroid.attr({xSpeed: 1});
			}
			// rotate normally
			asteroid.origin("center");
		},ms, asteroidNumber, function(){
			// at then end of the wave, change level step
			Crafty.trigger("changeStep");
		});
	},3000);
};

// create an electricFence wave
var electricFenceWave = function (handler, openings, ms){
	// blinking warning message
	Crafty.e("CustomText").setWarning().setType("top").text("WARNING");
	// start wave when warning message is over
	var startMs = 2000;
	// faster wave if hardcore
	if(Game.difficulty == "hardcore") ms -= 175;
	handler.delay(function(){ 
		var number = openings.length-1;
		var index = 0;
		handler.delay(function(){ 
			// create a moving electric fence 
			var electricFence = Crafty.e("ElectricFence").place(0,-80);
			if(openings[index] == "random"){
				electricFence.openRandomly();
			} else electricFence.open(openings[index]);
			index++;
		},ms, number, function(){
			// at then end of the wave, change level step
			Crafty.trigger("changeStep");
		});
	},startMs);
};

// force player to be invincible
// used in terminateLevel()
var forceInvicibility = function(){
	var player = Crafty("Player");
	player.each(function(){
		this.isInvincible = true;
	});
};

// terminate level : called when the boss dies
// set end level state for player and show messages
var terminateLevel = function(level, handler, bossExplosionAnimTime){
	// forced invincibility on player when the boss dies
	// the boss has just died but some projectile may still exist
	handler.delay(forceInvicibility,200,-1);
	// when the explosion is over, set end level state for player
	handler.delay(function(){
		handler.cancelDelay(forceInvicibility);
		Crafty("Player").each(function(){
			this.setEndLevelState();
		});
	},bossExplosionAnimTime);
	// show end level message
	handler.delay(function(){
		// level complete
		Crafty.e("CustomText").setTitle().text("LEVEL&nbsp;&nbsp;"+level+"&nbsp;&nbsp;&nbsp;COMPLETE");
		// player deathCount
		var deathCountSubtitle = Crafty.e("CustomText").setSubtitle()
		.text("DEATH&nbsp;&nbsp;&nbsp;COUNT&nbsp;=&nbsp;&nbsp;&nbsp;" + Player.deathCount);
		// reward if 0 death : a crown
		if(Player.deathCount == 0){
			deathCountSubtitle.css({"background-position": "285px 6px"}).image("assets/images/menu/crown.png");
		}
		// when dying, the boss generated a jewel
		// the jewel moves to its socket in the jewelContainer
		Crafty.e("JewelContainer").setJewelContainer(level);
		Crafty("Jewel").each(function(){
			this.moveToContainer(1500);
		});
		// player moves to initial position
		Crafty("Player").each(function(){
			this.moveToInitialPosition(1500);
		});
	},bossExplosionAnimTime+1000);
	// press A to continue
	handler.delay(function(){
		var subtitle = Crafty.e("CustomText").setSubtitle();
		subtitle.text("PRESS [ENTER] &nbsp;OR&nbsp; [SPACE] &nbsp;TO &nbsp;&nbsp;CONTINUE");
		subtitle.y += 30;
		subtitle.bind('KeyUp', function(e) {
			if(Player.keys.keyAction.indexOf(e.key) != -1) {
				// next level
				// after level-3, the game ends
				var nextLevel = "";
				if(level == 3){
					nextLevel = "end";
				} else nextLevel = "level-" + (++level);
				Crafty.scene(nextLevel);
			}
		});
	},bossExplosionAnimTime+4000);
};